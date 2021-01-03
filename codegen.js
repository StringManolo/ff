import * as std from "std";

let run = args => {
  let aux = `${args}`;
  let prog = std.popen(aux, "r");
  let r, msg = "";
  while ((r = prog.getline()) != null) {
    msg += r + "\n";
  }
  return msg;
}

console.log(`Codegen:

1. ff proyect (index.html, main.js, code.css, cache.js, example.txt)

2. remove ff proyect files
`);

let resp = std.in.getline();

if (resp === "1") {
  let fd = std.open("index.html", "a+");
  fd.puts(`<!DOCTYPE html>
<html lang="en">
  <head prefix="og:http://ogp.me/ns#">
    <meta charset="utf-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <link rel="preload" href="ff.js" as="script" crossorigin>
    <title>Index.html</title>
    <!--
      <meta property="og:type" content="website">
    <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@700&display=swap" rel="stylesheet">
    -->
    <link rel="stylesheet" href="./code.css">
    <meta name="theme-color" content="#fffdfd">
  </head>

  <body>


    <script type="module" src="./main.js"></script>
  </body>
</html>`);
  fd.close();

  fd = std.open("main.js", "a+");
  fd.puts(`import ff from "./ff.js";
//import ff from "https://fastframework.ga/ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);

_("Alert called from main.js file");
`);
  fd.close();

  fd = std.open("ff.js", "a+");
  fd.puts(`var ff = {};

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
      while(/\\ /gim.test(text)) {
        text = text.replace(/\\ /, "");
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
    var tmp = all.innerHTML.match(/{{*\\s*\\w+\\s*}}*/g);

    mustache = (tmp + "").split(",");

    for(var i = 0; i < mustache.length; ++i) {
      var aux = tokenizer(mustache[i]);

      if (ff.mustache[aux[1]]) {
        if (aux[0].length > 2) {
          var tmpReg = new RegExp("{{{\\\\s*" + aux[1] + "\\\s*}}}", "");
          all.innerHTML = all.innerHTML.replace(tmpReg, ff.mustache[aux[1]]);

        } else {
          var tmpReg = new RegExp("{{\\\s*" + aux[1] + "\\\s*}}", "");
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
      if(/object\\ htmlelement/gim.test(all[i])) {
        var elementName = all[i].outerHTML.substr(1, all[i].outerHTML.indexOf(">")-1);
        if(/\\-/.test(elementName)) {
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
    if(tmp.substr(0, 7) == "route=\\"") {
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



export default ff;`);
  fd.close();

  fd = std.open("cache.js", "a+");
  fd.puts(`self.addEventListener('fetch', (e) => {
 e.respondWith(caches.match(e.request).then((response) => {
  if(response)
   return response
  else
   return fetch(e.request)
 }) )
})`);
  fd.close();

  fd = std.open("code.css", "a+");
  fd.puts(`body {
  margin: 0 0 0 0; /* Remove ugly left side border */
  text-size-adjust: none; /* Fix Android Big Text */
  text-rendering: optimizeLegibility; /* Improve text */
}

@media (min-width: 0px) and (orientation:landscape) {
  body {
    font-size: 1.1vw;
  }
}

/*html {
    font-family: 'Oxygen', serif;
  } */

  `);
  fd.close();

  fd = std.open("example.txt", "a+");
  fd.puts(`import ff from "./ff.js";

/* import ff from "https://fastframework.ga/ff.js"; */

ff.activateShortcuts();

  ff.customTags = {
        myMenu:\`<section><article id="mainMenu"><a href="#home">HOME</a>
<a href="#writeups">WRITEUPS</a>
<a href="#updates">UPDATES</a>
<a href="#about">ABOUT</a></article></section>\`
};

var home = \`<h1>General</h1>\`;

var writeups = \`<div id="writeupsContainer">
<h1>Writeups!</h1>
Enjoy my discovers!
<a class="xssLink" href="#writeups/xss">XSS</a>
<a href="#writeups/csrf">CSRF</a>
</div>\`;

var updates = \`<h1>Updates!</h1>
Last changes!\`;

var about = \`<h1>About!</h1>
Know about <a href="#stringmanolo">String Manolo</a>.\`;

var menuXss = \`<h2>XSS</h2>
<a class="xssLink" href="#writeups/xss/xss1">3 x 1!</a>
<br />
<a class="xssLink" href="#writeups/xss/w3schoolsxss1">Stored XSS - W3schools</a>
<br />
<a class="xssLink" href="#writeups/xss/intigriti/november">Clickjacking XSS</a>\`;

var menuCsrf = \`<h2>CSRF</h2>
<a class="csrfLink" href="#writeups/csrf/w3schoolscsrf1">Logout CSRF - W3schools</a>\`;

var four04 = \`<a href="#landing">Landing Page</a>
<a href="javascript:history.go(-1)">Back</a>\`;

var personalInfo = \`<div id="aboutPhoto" class="center"><h6>Web Developer</h6>
<img src="./resources/yo.png" alt="personal photo">
<h4>String Manolo</h4></div>
<p class="halfCenter"><span class="br">I am a self taught Cyber Security Enthusiast and a Software Developer.</span><span class="br">Born in Galicia - Spain.</span><span class="br">Currently focused on personal projects to improve my skills while searching for my first job.</span><span class="br">I love to fix security bugs and make secure and fast performance software,</span><span class="br">My favourite task is analice javascript code and security of small websites.</span></p>\`;

var landingPage = \`<section id="landingPage">
<header></header>
<h1>Learn Security</h1>
<p>Get updates from String Manolo Security Research to help you protect software from new and popular threats.</p>
<ul>
<li>Security Bugs</li>
<li>Research</li>
<li>Pappers</li>
<li>Tutorials</li>
<li>Tools</li>
<li>Development</li>
</ul>
</section>\`;

ff.routes = {
  route1: {
    name: "home",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + home;
      $("#nonCenter").innerHTML = \`<ul><li><a href="#securityBugs">Security Bugs</a></li>
<li><a href="#research">Research</a></li>
<li><a href="#pappers">Pappers</a></li>
<li><a href="#tutorial">Tutorials</a></li>
<li><a href="#tools">Tools</a></li>
<li><a href="#development">Development</a></li>
<li><a href="#fixes">Fixes</a></li></ul>\`;
    }
  },

  route2: {
    name: "writeups",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + writeups;
      $("#nonCenter").innerHTML = "";
    }
  },

  route3: {
    name: "updates",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + updates;
      $("#nonCenter").innerHTML = \`<history-logs>route="./logs/dev/"</history-logs>\`;
      ff.getCustomTags();
    }
  },

  route4: {
    name: "about",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = personalInfo;
    }
  },

  route5: {
    name: "stringmanolo",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = \`<div id="icons"><a href="#projects"><img class="projectsIcon" src="./resources/projects.png" alt="projects icon"></a>
      <a class="githubLink" href="//github.com/stringmanolo"><img class="githubIcon" src="./resources/github.png" alt="github icon"></a>
      <a href="//twitter.com/xsstringmanolo"><img class="twitterIcon" src="./resources/twitter.png" alt="twitter icon"></a>
      <a href="//foro.elhacker.net/profiles/string_manolo-u595084.html"><img class="elhackernetIcon" src="./resources/elhacker.png" alt="icono elhacker.net"></a><a href="//t.me/stringmanolo"><img class="telegramIcon" src="./resources/telegram.png" alt="telegram icon"></a>
      <a href="mailto:manuelvarelacaldas@gmail.com"><img class="emailIcon" src="./resources/email.png" alt="email icon"></a></div>\`+personalInfo;
    }
  },

  route6: {
    name: "writeups/xss",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + writeups;
      /*
      $("#writeupsContainer").innerHTML += menuXss;
      */
      $("#nonCenter").innerHTML = menuXss;
    }
  },

  route7: {
    name: "writeups/xss/xss1",
    action: function() {
      $("myViews").innerHTML = \`<xss-1>route="./blogEntries/xss/"</xss-1>\`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route8: {
    name: "writeups/xss/w3schoolsxss1",
    action: function() {
      $("myViews").innerHTML = \`<w3schoolsxss-1>route="./blogEntries/xss/"</w3schoolsxss-1>\`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route9: {
    name: "writeups/xss/intigriti/november",
    action: function() {
      $("myViews").innerHTML = \`<novembe-r>route="./blogEntries/xss/intigriti/"</novembe-r>\`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route10: {
    name: "writeups/csrf",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + writeups;
      $("#nonCenter").innerHTML = menuCsrf;
    }
  },

  route11: {
    name: "writeups/csrf/w3schoolscsrf1",
    action: function() {
      $("myViews").innerHTML = \`<w3schoolscsrf-1>route="./blogEntries/csrf/"</w3schoolscsrf-1>\`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route12: {
    name: "projects",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = \`<div class="aToBlock"><a href="#projects/fastframework">FastFramework</a>
      <a href="#projects/jex">Jex</a></div>
      \`;
    }
  },

  route13: {
    name: "projects/fastframework",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = \`<fast-framework>route="./projects/fastframework/"</fast-framework>

      Actually this webpage is build using fastframework :)\`;
     ff.getCustomTags();
    }
  },

  route14: {
    name: "projects/jex",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = \`<j-ex>route="./projects/jex/"</j-ex>\`;
      ff.getCustomTags();
    }
  },

  route15: {
    name: "landing",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu;
      $("#nonCenter").innerHTML = landingPage;
    }
  },

 /* route16: {
    name: "securityBugs",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = \`<xss-series>route="./securityBugs/xss/"</xss-series>\`;
      ff.getCustomTags();
    }
  },

  amount: 16, */
  amount: 15,

  routeDefault: {
    name: "default",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = \`<img id="crow" src="./resources/crow.jpg"><div id="four04"><h1>404 PAGE NOT FOUND</h1>The requested resource was not found in this page<div id="crowLinks"><a id="crowLinkLanding" href="#landing">Landing Page</a>
<a id="crowLinkBack" href="javascript:history.go(-1)">Back</a></div>
</div>\`;
    }
  }
};

ff.router.start();

ff.mustache.copyright = \`<div class="copyright">&copy; \${new Date().getFullYear()}</div>
<style>
.copyright {
  bottom: 2%;
  right: 2%;
  position: fixed;
}
</style>
\`;

ff.mustache.date = ""+new Date();

ff.getUnknownTags();
ff.getCustomTags();
ff.getMustacheSintax();

ff.cache.resources = [
"./",
"./logs/dev/historylogs.ff",
"./blogEntries/xss/xss1.ff",
"./blogEntries/xss/w3schoolsxss1.ff",
"./blogEntries/csrf/w3schoolscsrf1.ff",
"./projects/fastframework/fastframework.ff",
"./projects/jex/jex.ff",
"./ff.js",
"./main.js",
"./main.css",
"./index.html",
"./resources/w3schoolspayload.png",
"./resources/w3schoolsxsslanscape.png",
"./resources/w3schoolsxss.png",
"./resources/yo.png",
"./resources/network.jpg",
"./resources/computer.jpg",
"./resources/cybersecurity.jpg",
"./resources/crow.jpg",
"./resources/projects.png",
"./resources/github.png",
"./resources/twitter.png",
"./resources/elhacker.png",
"./resources/telegram.png",
"./resources/email.png"
];
ff.cache.start("./cache.js", 104800000);
/* 604800000 milliseconds equals 1 week */`);
  fd.close();
}

if (resp === "2") {
  run("rm cache.js && rm code.css && rm ff.js && rm index.html && rm main.js && rm example.txt");
}
