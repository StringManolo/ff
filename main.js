/* Import the ff object from the ffr.js file */
import ff from "./ff.js";

/* Activate the default shortcut aliases:
 * $("#myDiv");
 * $$(".myDivs");
 * ael( $("myDiv"), "click", function() {
     alert("You clicked my div.");
 * });
*/
 ff.activateShortcuts();


/* Create a new shortcut */
  ff.defineShortcut("_", alert);

/* Example of usage */
/*  _("This is the body innerHTML:" + $("body").innerHTML);
*/

/* My routes */
ff.routes = {
  route1: {
    name: "home",
    action: function() {
      alert("Welcome to my web!");
    }
  },

  route2: {
    name: "repo",
    action: function() {
      if (confirm("Go to github?") {
        window.location = "//github.com/StringManolo/ff";
      }
    }
  },

  route3: {
    name: "spa",
    action: function() {
      if (confirm("Go to spa?") {
        window.location = "//fastframework.ga/spa/";
      }
    }
  },

  route4: {
    name: "blog",
    action: function() {
      if (confirm("Go to blog?") {
        window.location = "//fastframework.ga/blog/";
      }
    }
  },

  amount: 4,

  routeDefault: {
    name: "default",
    action: function() {
      alert("This route is not defined!\nMaybe add 404 error page?");
    }
  }
};

/* Make router start */
ff.router.start();

/* Define the mustache value */
ff.mustache.date = new Date();

/* replace the mustaches by the values */
ff.getMustacheSintax();

/* Define the <myMenu></myMenu> tag inner content */
ff.customTags = {
	myMenu:`<section><article id="mainMenu"><a href="#home">HOME</a>
<a href="#repo">REPO</a>
<a href="#blog">BLOG</a>
<a href="#spa">SPA</a></article></section>`
};

/* replace the unknown tags by the templates */
ff.getUnknownTags();

/* replace the custom tags by a server .ff file */
ff.getCustomTags();
