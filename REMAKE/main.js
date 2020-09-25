/* Import the ff object from the ffr.js file */
import ff from "./ffr.js";

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
  _($("body").innerHTML);

