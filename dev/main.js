import ff from "./ff_dev.js";

/* import ff from "https://fastframework.ga/ff.js"; */

ff.activateShortcuts();

/* Register service worker cache.js */

navigator.serviceWorker.register('./cache.js', {
  scope: './'
})
.then(function(reg) {
  /* alert(`fetch then: ${reg}`) */
  
  let urlsToCache = [
"./logs/dev/historylogs.ff.js",
"./blogEntries/xss/xss1.ff.js",
"./blogEntries/xss/w3schoolsxss1.ff.js",
"./blogEntries/csrf/w3schoolscsrf1.ff.js",
"./projects/fastframework/fastframework.ff.js",
"./projects/jex/jex.ff.js",
"./ff_dev.js",
"./main.js",
"./main.css",
"./index.html"];

  caches.open('test-cache').then(function(cache) { 
    cache.addAll(urlsToCache)
    .then(function() { 
      
    });
  });

  navigator.serviceWorker.addEventListener('message', function(evento) {
    alert(evento.data.message);
    $("#debugLogs").innerText = evento.data.message
  });

})
.catch(function(err) {
  alert(`fetch catch: ${err}`)
});
/* end register */




  ff.customTags = {
	myMenu:`<section><article id="mainMenu"><a href="#home">HOME</a>
<a href="#writeups">WRITEUPS</a>
<a href="#updates">UPDATES</a>
<a href="#about">ABOUT</a></article></section>`
};

var home = `<h1>Welcome!</h1>
Welcome to my page`;

var writeups = `<div id="writeupsContainer">
<h1>Writeups!</h1>
Enjoy my discovers!
<a class="xssLink" href="#writeups/xss">XSS</a>
<a href="#writeups/csrf">CSRF</a>
</div>`;

var updates = `<h1>Updates!</h1>
Last changes!`;

var about = `<h1>About!</h1>
Know about <a href="#stringmanolo">String Manolo</a>.`;

var menuXss = `<h2>XSS</h2>
<a class="xssLink" href="#writeups/xss/xss1">3 x 1!</a>
<br />
<a class="xssLink" href="#writeups/xss/w3schoolsxss1">Stored XSS - W3schools</a>`;

var menuCsrf = `<h2>CSRF</h2>
<a class="csrfLink" href="#writeups/csrf/w3schoolscsrf1">Logout CSRF - W3schools</a>`;

var four04 = `<h1>404</h1>
The requested url was not found.`;

ff.routes = {
  route1: {
    name: "home",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + home;
      $("#nonCenter").innerHTML = "";
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
      $("#nonCenter").innerHTML = `<history-logs>route="./logs/dev/"</history-logs>`;
      ff.getCustomTags();
    }
  },

  route4: {
    name: "about",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = "";
    }
  },

  route5: {
    name: "stringmanolo",
    action: function() { 
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = `<a href="#projects">Projects</a>
      <a href="//github.com/stringmanolo">Github</a>
      <a href="//twitter.com/xsstringmanolo">Twitter</a>
      <a href="//stringmanolo.ga">Webpage</a>`
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
      $("myViews").innerHTML = `<xss-1>route="./blogEntries/xss/"</xss-1>`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route8: {
    name: "writeups/xss/w3schoolsxss1",
    action: function() {
      $("myViews").innerHTML = `<w3schoolsxss-1>route="./blogEntries/xss/"</w3schoolsxss-1>`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();
    }
  },

  route9: {
    name: "writeups/csrf",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + writeups;
      $("#nonCenter").innerHTML = menuCsrf;
    }
  },

  route10: {
    name: "writeups/csrf/w3schoolscsrf1",
    action: function() {
      $("myViews").innerHTML = `<w3schoolscsrf-1>route="./blogEntries/csrf/"</w3schoolscsrf-1>`;
      $("#nonCenter").innerHTML = "";
      ff.getCustomTags();    
    }
  },

  route11: {
    name: "projects",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = `<div class="aToBlock"><a href="#projects/fastframework">FastFramework</a>
      <a href="#projects/jex">Jex</a></div>
      `;
    }
  },

  route12: {
    name: "projects/fastframework",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = `<fast-framework>route="./projects/fastframework/"</fast-framework>

      Actually this webpage is build using fastframework :)`;
     ff.getCustomTags();
    }
  },

  route13: {
    name: "projects/jex",
    action: function() {
      $("myViews").innerHTML = "";
      $("#nonCenter").innerHTML = `<j-ex>route="./projects/jex/"</j-ex>`;
      ff.getCustomTags();
    }
  },

  amount: 13,

  routeDefault: {
    name: "default",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + four04;
      $("#nonCenter").innerHTML = "";
    }
  }
};

ff.router.start();

ff.mustache.copyright = `<div class="copyright">&copy; ${new Date().getFullYear()}</div>
<style>
.copyright {
  bottom: 10px;
  right: 10px;
  position: fixed;
}
</style>
`;

ff.mustache.date = ""+new Date();

ff.getUnknownTags();
ff.getCustomTags();
ff.getMustacheSintax();
