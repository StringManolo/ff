var ff = {};

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



export default ff;
