/* This is the framework code */
(function() {

/*** Shortcuts Code */
(function activateShortcuts() {
  DEFINE=function(constant, value) {
    if(window[constant]===undefined) {
      window[constant] = value
    } else {
      throw new ReferenceError(constant + " is already a property of the global/window Object.\nRedefinition not allowed.");
    }
  }

  wrapQS=function(selector) {
    return d.querySelector(selector)
  }

  wrapQSA=function(selector) {
    return d.querySelectorAll(selector)
  }

  wrapAEL=function(elemnt, event, value) {
    elemnt.addEventListener(event, value);
  }

  DEFINE("d", document);
  DEFINE("$", wrapQS);
  DEFINE("$$", wrapQSA);
  DEFINE("ael", wrapAEL);
})();
/* End Shortcuts Code ***/

/*** Utils Code */
ff.GET = function(url, callback) {
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

/*** Router code */
  window.addEventListener("popstate", function(e) {
    /* alert("location: " + document.location + ", state: " + JSON.stringify(e.state)); */
    changeRoute(e);
  });


  function detectInitialUrl() {
    if(window.location.hash) {
      var route = window.location.hash.substr(1);
      var routeFound = false;
      for(var i = 0; i < ff.routes.amount; ++i) {
        if (route == ff.routes["route"+(i+1)].name) {
	  /* alert("match!"); */
	  routeFound = true;
	  (ff.routes["route"+(i+1)].action)();
	}
      }
      if (!routeFound) {
	(ff.routes.routeDefault.action)();
      }
    }
  }


  function changeRoute(e) {
/*  if (e.newURL !== e.oldURL) { */
    var route = window.location.hash.substr(1);
    var routeFound = false;
    for(var i = 0; i < ff.routes.amount; ++i) {
      if (route == ff.routes["route"+(i+1)].name) {
	/* alert("match!"); */
	routeFound = true;
	(ff.routes["route"+(i+1)].action)();
      }
    }
      if (!routeFound) {
        (ff.routes.routeDefault.action)();
      }
/*  } else {
      alert("same route");
    } */
  }

  /* Already onpopstate 
  function detectUrlChange() {
    window.addEventListener("hashchange", function(e) {
      changeRoute(e);
    });
  } */

  detectInitialUrl();
  /* detectUrlChange(); */
})();
/* End Router Code ***/

	
(function() {
/*** Unknown Tags Code */
  var unknownTags = {};
  (function getUnknownTags() {
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
  /*  alert("User tag = " + userTags[i]); */ 
      for(var j = 0; j < userTemplates.length; ++j) {
        /* alert("User Template = " + userTemplates[j]); */
	if (userTags[i].toUpperCase() == userTemplates[j].toUpperCase()) {
         /* alert("The unknown tag have a defined template"); */
	  var docTags = document.querySelectorAll(userTags[i]);
	  for(var k = 0; k < docTags.length; ++k) {
	    if(/<!--preserveInner-->/.test(ff.customTags[userTemplates[j]])) {
	      /* alert("Found inner inside window.customTags"); */
              var inner = docTags[k].innerHTML;
	      docTags[k].innerHTML = ff.customTags[userTemplates[j]].replace(/<!--preserveInner-->/, inner);
	    } else {
	      /* alert("Not found inner keyword, replacing tag by templste"); */
              docTags[k].innerHTML = ff.customTags[userTemplates[j]];
	    }
	  }
	}
      }
    }

  })();
/* End Unknown Tags Code ***/

/*** Custom Tags Code */
(function() {
  var customTags = {};
  (function getCustomTags() {
    var all = document.querySelectorAll("*");
    for(var i = 0; i < all.length; ++i) {
      if(/object\ htmlelement/gim.test(all[i])) {
        var elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
	if(/\-/.test(elementName)) {
          customTags[elementName+""] = all[i];
	}
      }
    }
  })();
  var userTags = Object.keys(customTags);

  userTags.forEach(function(element) {
    ff.GET("./"+element.replace("-","")+".ff", function(resp) {
      var currentTag = document.querySelectorAll(element);
      for(var i = 0; i < currentTag.length; ++i) {
        currentTag[i].innerHTML = resp;
	getMustacheSintax();
      }
    });
  });

})();


/* End Custom Tags Code ***/


/*** Mustache Sintax Code */
  function getMustacheSintax() {

    function htmlEntities(string) {
      var a = document.createTextNode(string);
      var b = document.createElement('pre');
      b.appendChild(a);
      return b.innerHTML;
    }

    function removeSpaces(text) {
      while(/\ /gim.test(text)) {
	/*
	alert("space removed from " + text);
        */
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
      
      if (ff[aux[1]]) {
	if (aux[0].length > 2) {
	  var tmpReg = new RegExp("{{{\\s*" + aux[1] + "\\s*}}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, ff[aux[1]]);
        
	} else {
          var tmpReg = new RegExp("{{\\s*" + aux[1] + "\\s*}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, htmlEntities(ff[aux[1]]));
	}
      } else {
        /* alert("Mustache not defined"); */
      }
    }
  }

  getMustacheSintax();
/* End Mustache Sintax ***/

})();
