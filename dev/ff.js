var ff = {};

/*** Shortcuts code */
ff.defineShortcut = function(key, value) {

  var DEFINE = function(constant, value) {
    if(window[constant]===undefined) {
      window[constant] = value
    } else {
      throw new ReferenceError(constant + " already defined");
    }
  }

  DEFINE(key, value);
};

ff.activateShortcuts = function() {
  var wrapQS=function(selector) {
    return document.querySelector(selector)
  }

  var wrapQSA=function(selector) {
    return document.querySelectorAll(selector)
  }

  var wrapAEL=function(elemnt, event, value) {
    elemnt.addEventListener(event, value);
  }

  ff.defineShortcut("$", wrapQS);
  ff.defineShortcut("$$", wrapQSA);
  ff.defineShortcut("ael", wrapAEL);

  ff.activatedShortcuts = true;
  return true;
};
/* End Shortcuts Code ***/



/*** Cache Service Workers Code */
ff.cache = {}
ff.cache.resources = [];

ff.cache.start = function(swName, ttl) {
  let tl = 0; 
  tl = localStorage.cacheTTL;
  if (+tl) {
    const now = new Date();
    if (now.getTime() > +localStorage.cacheTTL) {
      localStorage.cacheTTL = 0;
      caches.delete("cachev1").then(function() {
      });
    } 
  } else {
    navigator.serviceWorker.register(swName, {
      scope: './'
    })
    .then(function(reg) {
      caches.open("cachev1")
      .then(function(cache) { 
        cache.addAll(ff.cache.resources)
        .then(function() {
	  localStorage.cacheTTL = +(new Date().getTime()) + +ttl;
        });
      });
    })
    .catch(function(err) {
    }); 
  } 
};

ff.cache.clean = function() {
  caches.delete("cachev1").then(function() { 

  });
};
/* End Cache Service Workers Code ***/



/*** Router code */
ff.router = {};
ff.routes = {};

function detectInitialUrl() {
  if(window.location.hash) {
    var route = window.location.hash.substr(1);
    var routeFound = false;
    for(var i = 0; i < ff.routes.amount; ++i) {
      if (route == ff.routes["route"+(i+1)].name) {
        routeFound = true;
	(ff.routes["route"+(i+1)].action)();
      }
    }
    if (!routeFound) {
    (ff.routes.routeDefault.action)();
    }
  } else {
    window.location = window.location + "#landing";
    detectInitialUrl();
  }
}

function changeRoute(e) {
  var route = window.location.hash.substr(1);
  var routeFound = false;

  for(var i = 0; i < ff.routes.amount; ++i) {
    if (route == ff.routes["route"+(i+1)].name) {
      routeFound = true;
      (ff.routes["route"+(i+1)].action)();
    }
  }
     
  if (!routeFound) {
    (ff.routes.routeDefault.action)();
  }
}


ff.router.start = function() {
  detectInitialUrl();
  window.addEventListener("popstate", function(e) { 
    changeRoute(e);
  });
};
/* End Router Code ***/



/*** Mustache Sintax */
ff.mustache = {};
ff.getMustacheSintax = function() {

    function htmlEntities(string) {
      var a = document.createTextNode(string);
      var b = document.createElement('pre');
      b.appendChild(a);
      return b.innerHTML;
    }

    function removeSpaces(text) {
      while(/\ /gim.test(text)) {
        text = text.replace(/\ /, "");
      }
      return text;
    }

    function tokenizer(tag) {
      var tokens = [];
      for(var i = 0, tmp = "", tmp2 = "", tmp3 = ""; i < tag.length; ++i) {
	if(tag[i] != " ") {
	  if(tag[i] == "{") {
            tmp += "{";
	  } else if (tag[i] == "}") {
	    tmp3 += "}";
	  } else {
	    tmp2 += tag[i];
	  }
	}
      }
      tokens.push(tmp);
      tokens.push(tmp2);
      tokens.push(tmp3);
      return tokens;
    }
	

    var all = document.querySelector("html");
    var mustache = [];
    var tmp = all.innerHTML.match(/{{*\s*\w+\s*}}*/g);
    
    mustache = (tmp + "").split(",");
     
    for(var i = 0; i < mustache.length; ++i) {
      var aux = tokenizer(mustache[i]);
      
      if (ff.mustache[aux[1]]) {
	if (aux[0].length > 2) {
	  var tmpReg = new RegExp("{{{\\s*" + aux[1] + "\\s*}}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, ff.mustache[aux[1]]);
        
	} else {
          var tmpReg = new RegExp("{{\\s*" + aux[1] + "\\s*}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, htmlEntities(ff.mustache[aux[1]]));
	}
      }
    }
  }

/* End Mustache Sintax ***/



/*** Unknown Tags Code */
ff.getUnknownTags = function() {
  var unknownTags = {};
  ff._getUnknownTags = function() {
    var all = document.querySelectorAll("*");
    for(var i = 0; i < all.length; ++i) {
      if(/unknown/gim.test(all[i])) {
        var elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
        unknownTags[elementName+""] = all[i];
      }
    }

    var userTemplates = Object.keys(ff.customTags);
    var userTags = Object.keys(unknownTags);
    for(var i = 0; i < userTags.length; ++i) { 
      for(var j = 0; j < userTemplates.length; ++j) {
	if (userTags[i].toUpperCase() == userTemplates[j].toUpperCase()) {
	  var docTags = document.querySelectorAll(userTags[i]);
	  for(var k = 0; k < docTags.length; ++k) {
	    if(/<!--preserveInner-->/.test(ff.customTags[userTemplates[j]])) {
              var inner = docTags[k].innerHTML;
	      docTags[k].innerHTML = ff.customTags[userTemplates[j]].replace(/<!--preserveInner-->/, inner);
	    } else {
              docTags[k].innerHTML = ff.customTags[userTemplates[j]];
	    }
	  }
	}
      }
    }
  }
  ff._getUnknownTags();
}
/* End Unknown Tags Code ***/



/*** Utils Code */
ff._GET = function(url, callback) {
  var peticion = new XMLHttpRequest();
  peticion.open("GET", url , true);
  peticion.send();
  peticion.onreadystatechange = function() {
    if (peticion.readyState == 4) {
      if (peticion.status == 0 || peticion.status == 200) {
        callback(peticion.responseText);
      }
    }
  }      
}
/* End Utils Code ***/



/*** Private Methods. */
ff._insertHTML = function(element, attribute, code) {  
  element[attribute] = code;  
  var scripts = element.querySelectorAll("script");   
  for(var i = 0; i < scripts.length; ++i) {  
    eval(scripts[i].text);  
  }
}  



/*** Custom Tags Code */
ff.getCustomTags = function() {

  var customTags = {};
  ff._getCustomTags = function() {
    var all = document.querySelectorAll("*");
    for(var i = 0; i < all.length; ++i) {
      if(/object\ htmlelement/gim.test(all[i])) {
        var elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
	if(/\-/.test(elementName)) {
          customTags[elementName+""] = all[i];
	}
      }
    }
  }
  ff._getCustomTags();

  var userTags = Object.keys(customTags);
  let route;
  userTags.forEach(function(element) {
  route = "./";
  var tmp = document.querySelector(element).innerHTML;
  if(tmp) {
    if(tmp.substr(0, 7) == "route=\"") {
      route = tmp.substring(7, tmp.length-1)
    }
  }
    ff._GET(route+element.replace("-","")+".ff", function(resp) {
      var currentTag = document.querySelectorAll(element);
      for(var i = 0; i < currentTag.length; ++i) {
        ff._insertHTML(currentTag[i], "innerHTML", resp);
      }
    });
  });
}
/* End Custom Tags Code ***/



export default ff;
