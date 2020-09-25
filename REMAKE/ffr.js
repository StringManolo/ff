var ff = {};

/* Shortcuts code */
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
/* End Router Code */





/* Mustache Sintax */
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
      
      if (ff[aux[1]]) {
	if (aux[0].length > 2) {
	  var tmpReg = new RegExp("{{{\\s*" + aux[1] + "\\s*}}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, ff[aux[1]]);
        
	} else {
          var tmpReg = new RegExp("{{\\s*" + aux[1] + "\\s*}}", "");
	  all.innerHTML = all.innerHTML.replace(tmpReg, htmlEntities(ff[aux[1]]));
	}
      }
    }
  }

/* End Mustache Sintax ***/




export default ff;
