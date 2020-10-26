import ff from "./ff.js";

/* import ff from "https://fastframework.ga/ff.js"; */

ff.activateShortcuts();



ff.defineShortcut("_", alert);


/*
  Notification.requestPermission(
  )
  .then(permission => {
  
    if (permission) {
      if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('./serviceworker.js', {
          scope: './'
        })
        .then(function(reg) {
          window.swReg = reg;
          
        var i = 0;
          setInterval(() => {
	    swReg.showNotification(++i + " xD", {
              body: "La fecha es "+new Date(),
	      icon: './notiIcon.png'
	    })
            .then(ev => {

            });
          }, 1000);
        }).catch(function(error) {
        
        });
      }
    }
  })
  .catch(error => {
    
  })
*/












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

var menuXss = `<h2 class="ncIndicator">XSS</h2>
<a class="xssLink" href="#writeups/xss/xss1">3 x 1!</a>
<br />
<a class="xssLink" href="#writeups/xss/w3schoolsxss1">Stored XSS - W3schools</a>`;

var menuCsrf = `<h2 class="ncIndicator">CSRF</h2>
<a class="csrfLink" href="#writeups/csrf/w3schoolscsrf1">Logout CSRF - W3schools</a>`;

var four04 = `<h1>404</h1>
The requested url was not found.`;

var personalInfo = `<div id="aboutPhoto" class="center"><h6>Web Developer</h6>
<img src="./resources/yo.png" alt="personal photo">
<h4>String Manolo</h4></div>
<p class="halfCenter">I am a self taught Cyber Security Enthusiast and a Software Developer. Born in Galicia - Spain.<br /><br />Currently focused on personal projects to improve my skills while searching for my first job.<br /><br />I love to fix security bugs and make secure and fast performance software,<br /><br />My favourite task is analice javascript code and security of small websites.</p>`;

var homeLinks = `<div class="externalLinks">

</div>`;

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
      $("#nonCenter").innerHTML = personalInfo;
    }
  },

  route5: {
    name: "stringmanolo",
    action: function() { 
      $("myViews").innerHTML = ff.customTags.myMenu + about;
      $("#nonCenter").innerHTML = `<a href="#projects">Projects</a>
      <a href="//github.com/stringmanolo">Github</a>
      <a href="//twitter.com/xsstringmanolo">Twitter</a>
      <a href="//stringmanolo.ga">Webpage</a>` + personalInfo;
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

/* Cache is disable because this is a development version.
ff.cache.resources = [
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
"./resources/w3schoolsxss.png"];
ff.cache.start("./cache.js", 100000);
*/
