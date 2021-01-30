let ff = {};

/*** Shortcuts code */
ff.defineShortcut = (key, value) => {
  let DEFINE = (constant, value) => {
    if(window[constant]===undefined) {
      window[constant] = value
    } else {
      throw new ReferenceError(constant + " already defined");
    }
  }
  DEFINE(key, value);
};

ff.activateShortcuts = () => {
  /* https://github.com/StringManolo/JavascriptShortcuts */
  let w$ = (elem, selec) => selec ? $(elem).querySelector(selec) : document.querySelector(elem);

  let w$$ = (elem, selec) => selec ? $(elem).querySelectorAll(selec) : document.querySelectorAll(elem);

  let w_ = params => alert(params);

  let w__ = params => console.log(params)

  let wmake = (elem, opt) => {
    let el = document.createElement(elem)
    if (opt) {
      for(let [k, v] of Object.entries(opt)) {
        el[k] = v;
      }
    }
    return el;
  }

  let wael = (elem, ev, cb) => {
    cb ? elem.addEventListener(ev, (e) => cb(e)) : elem.addEventListener("click", (e) => ev(e))
    return elem;
  }

  let wadd = (elem, chil) => (elem.appendChild(chil) && chil);

  let wrand = range => ~~(Math.random() * range + 1);

  let wcss = code => add($("head"), make("style", { className: "shortcutStyles", innerText: code }));

  ff.defineShortcut("$", w$);
  ff.defineShortcut("$$", w$$);
  ff.defineShortcut("_", w_);
  ff.defineShortcut("__", w__);
  ff.defineShortcut("make", wmake);
  ff.defineShortcut("ael", wael);
  ff.defineShortcut("add", wadd);
  ff.defineShortcut("rand", wrand);
  ff.defineShortcut("css", wcss);

  ff.activatedShortcuts = true;
  return true;
};
/* End Shortcuts Code ***/



/*** Cache Service Workers Code */
ff.cache = {}
ff.cache.resources = [];

ff.cache.start = (swName, ttl) => {
  let tl = 0;
  tl = localStorage.cacheTTL;
  if (+tl) {
    const now = new Date();
    if (now.getTime() > +localStorage.cacheTTL) {
      localStorage.cacheTTL = 0;
      caches.delete("cachev1").then(() => {
      });
    }
  } else {
    navigator.serviceWorker.register(swName, {
      scope: './'
    })
    .then((reg) => {
      caches.open("cachev1")
      .then(cache => {
        cache.addAll(ff.cache.resources)
        .then(() => {
          localStorage.cacheTTL = +(new Date().getTime()) + +ttl;
        });
      });
    })
    .catch(err => {
    });
  }
};

ff.cache.clean = () => {
  caches.delete("cachev1").then(() => {

  });
};
/* End Cache Service Workers Code ***/



/*** Router code */
ff.router = {};
ff.routes = {};

let detectInitialUrl = () => {
  if(location.hash) {
    let route = location.hash.substr(1);
    let routeFound = false;
    for(let i = 0; i < ff.routes.amount; ++i) {
      if (route == ff.routes["route"+(i+1)].name) {
        routeFound = true;
        (ff.routes["route"+(i+1)].action)();
      }
    }
    if (!routeFound) {
    (ff.routes.routeDefault.action)();
    }
  } else {
    location = location + "#landing";
    detectInitialUrl();
  }
}

let changeRoute = e => {
  let route = location.hash.substr(1);
  let routeFound = false;

  for(let i = 0; i < ff.routes.amount; ++i) {
    if (route == ff.routes["route"+(i+1)].name) {
      routeFound = true;
      (ff.routes["route"+(i+1)].action)();
    }
  }

  if (!routeFound) {
    (ff.routes.routeDefault.action)();
  }
}

ff.router.start = () => {
  detectInitialUrl();
  window.addEventListener("popstate", e => changeRoute(e));
};
/* End Router Code ***/



/*** Mustache Sintax */
ff.mustache = {};
ff.getMustacheSintax = () => {

    let htmlEntities = string => {
      let a = document.createTextNode(string);
      let b = document.createElement('pre');
      b.appendChild(a);
      return b.innerHTML;
    }

    let removeSpaces = text => {
      while(/\ /gim.test(text)) {
        text = text.replace(/\ /, "");
      }
      return text;
    }

    let tokenizer = tag => {
      let tokens = [];
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


    let all = document.querySelector("html");
    let mustache = [];
    let tmp = all.innerHTML.match(/{{*\s*\w+\s*}}*/g);

    mustache = (tmp + "").split(",");

    for(let i = 0; i < mustache.length; ++i) {
      let aux = tokenizer(mustache[i]);

      if (ff.mustache[aux[1]]) {
        if (aux[0].length > 2) {
          let tmpReg = new RegExp("{{{\\s*" + aux[1] + "\\s*}}}", "");
          all.innerHTML = all.innerHTML.replace(tmpReg, ff.mustache[aux[1]]);

        } else {
          let tmpReg = new RegExp("{{\\s*" + aux[1] + "\\s*}}", "");
          all.innerHTML = all.innerHTML.replace(tmpReg, htmlEntities(ff.mustache[aux[1]]));
        }
      }
    }
  }
/* End Mustache Sintax ***/


/*** Unknown Tags Code */
ff.getUnknownTags = () => {
  let unknownTags = {};
  ff._getUnknownTags = () => {
    let all = document.querySelectorAll("*");
    for(let i = 0; i < all.length; ++i) {
      if(/unknown/gim.test(all[i])) {
	let elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
        unknownTags[elementName+""] = all[i];
      }
    }

    let userTemplates = Object.keys(ff.customTags);
    let userTags = Object.keys(unknownTags);
    for(let i = 0; i < userTags.length; ++i) {
      for(let j = 0; j < userTemplates.length; ++j) {
        if (userTags[i].toUpperCase() == userTemplates[j].toUpperCase()) {
          let docTags = document.querySelectorAll(userTags[i]);
          for(let k = 0; k < docTags.length; ++k) {
            if(/<!--preserveInner-->/.test(ff.customTags[userTemplates[j]])) {
              let inner = docTags[k].innerHTML;
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
ff._GET = (url, callback) => {
  let peticion = new XMLHttpRequest();
  peticion.open("GET", url , true);
  peticion.send();
  peticion.onreadystatechange = () => {
    if (peticion.readyState == 4) {
      if (peticion.status == 0 || peticion.status == 200) {
        callback(peticion.responseText);
      }
    }
  }
}
/* End Utils Code ***/



/*** Private Methods. */
ff._insertHTML = (element, attribute, code) => {
  element[attribute] = code;
  let scripts = element.querySelectorAll("script");
  for(let i = 0; i < scripts.length; ++i) {
    eval(scripts[i].text);
  }
}



/*** Custom Tags Code */
ff.getCustomTags = () => {
  let customTags = {};
  ff._getCustomTags = () => {
    let all = document.querySelectorAll("*");
    for(let i = 0; i < all.length; ++i) {
      if(/object\ htmlelement/gim.test(all[i])) {
        let elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
        if(/\-/.test(elementName)) {
          customTags[elementName+""] = all[i];
        }
      }
    }
  }
  ff._getCustomTags();

  let userTags = Object.keys(customTags);
  let route;
  userTags.forEach(element => {
  route = "./";
  let tmp = document.querySelector(element).innerHTML;
  if(tmp) {
    if(tmp.substr(0, 7) == "route=\"") {
      route = tmp.substring(7, tmp.length-1)
    }
  }
    ff._GET(route+element.replace("-","")+".ff", resp => {
      let currentTag = document.querySelectorAll(element);
      for(let i = 0; i < currentTag.length; ++i) {
        ff._insertHTML(currentTag[i], "innerHTML", resp);
      }
    });
  });
}
/* End Custom Tags Code ***/



export default ff;
