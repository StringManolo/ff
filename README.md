# FastFramework
Small (250 lines of code) javascript framework library to provide you with some handfull features in an easy way.  
This proyect is also hosted at Netlify and accesible here https://fastframework.ga/ff.js

### Files Structure
+ ff.js  
  Framework code.  
+ index.html  
  Test file.
+ main.js  
  Test file/Example of usage.
+ mycustom.ff  
  Code to replace ```<my-custom></my-custom>``` tags.

### Install
Create a html file.  
  Link your main.js file.  
  Import the ff module from your main.js file.  
  
  index.html  
  ```
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
        <title>My WebPage</title>
    </head>
    <body>
  
      {{ date }}

      <script type="module" src="main.js"></script>
    </body>
  </html>
  ```
  
  main.js  
  ```
  import ff from "https://fastframework.ga/ff.js";
  /* Define the mustache value */
  ff.mustache.date = new Date();

  /* replace the mustaches by the values */
  ff.getMustacheSintax();
  ```
  
# Methods 
  ### ff.activateShortcuts();  
  Activate the default shortcut aliases:
  + $(selector);  
  Alias for document.querySelector(selector);  
  Example:  
  ```$("#myDiv");```
  
  + $$(selector);  
  Alias for document.querySelectorAll(selector);  
  Example:  
  ```$$(".myDivs");```  
  
  + ael( element, event, callback );  
  Wraper around addEventListener.
  Example:  
  ```
  ael( $("myDiv"), "click", function() {
     alert("You clicked my div.");
   });
   ```

  *The aliases are window global properties.*

  ### ff.defineShortcut(alias, target);
  Create a new alias.  
  Example:  
  ```
  ff.defineShortcut("_", alert);
  _("Hello");
  ```  
  
  ### ff.router.start();
  Activate the router. Routes need to be declared before call this method. Example:  
  ```
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

ff.router.start();
```  
  Is mandatory to name the ff.routes properties as route1, route2, route3...  

  Is also mandatory to declare the amount property asigning the number of routes (routeDefault not included).  

  ```name``` property indicates the route; home equals to https://example.com/#home  

  ```action``` property is the method called when you navigate to the name route. You can modify innerHTML from elements or anything you want to do.

  routeDefault action property is called when you use a # route not defined as route in the ff.routes object.

  ### ff.mustache
  You declare your properties under the mustache object.  
  Example:  
  ```
  ff.mustache.date = new Date();  
  ff.mustache.myNick = "StringManolo";
  ff.mustache.myHeader = "<h1>FastFramework</h1>"

  /* replace the mustaches by the values */
  ff.getMustacheSintax();
  ```  
  You can use {{ myHeader }} to show as text or {{{ myHeader }}} to show as html.  
  Notice the method ```ff.getMustacheSintax();``` being called to replace the the mustache sintax from all the document to corresponding values.

  ### ff.getUnknownTags();
  Find all the html tags under the pattern ```<tag></tag>``` being ```tag``` a not already existing tag in the parser of your browser. Recomended to prepend ```my``` to make sure the tag does not exist. Example:  
  ```
  ff.customTags = {
	myMenu:`<section><article id="mainMenu"><a href="#home">HOME</a>
<a href="#example">EXAMPLE</a>
<a href="#updates">UPDATES</a>
<a href="#about">ABOUT</a></article></section>`
};

/* replace the unknown tags by the templates */
ff.getUnknownTags();
```

  ### ff.getCustomTags();
  Find all the html tags under the pattern ```<custom-tag></cutom-tag>``` being ```custom-tag``` 2 keywords separated by a guion. The guion is removed, becarefull about that because ```<hellofrom-here>``` and ```<hello-fromhere>``` are referencing the same file after the guion is removed.
  This tags will be filled with the content of a file named sema as tag and ending by .ff  
  Example:  
  index.html
  ```
  ...
  <body>
  <my-text></my-text>
  <script type="module" src="main.js"></script>
  ...
  ```  
  main.js
  ```
  import ff from "https://fastframework.ga/ff";
  ff.getCustomTags();
  ...
  ```
  mytext.ff
  ```
  This text will be included inside index.html.
  This <b>also</b> let me use html.
  ```

### Extra
  If you find bugs, issues, bad practices or anything you wwant to ask me, include... Feel free to send me a telegram message @stringmanolo  

