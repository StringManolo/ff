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
      alert("Home");
    }
  },

  route2: {
    name: "example",
    action: function() {
      alert("Example");
    }
  },

  amount: 2,

  routeDefault: {
    name: "default",
    action: function() {
      alert("Default");
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
<a href="#example">EXAMPLE</a>
<a href="#updates">UPDATES</a>
<a href="#about">ABOUT</a></article></section>`
};

/* replace the unknown tags by the templates */
ff.getUnknownTags();

/* replace the custom tags by a server .ff file */
ff.getCustomTags();
