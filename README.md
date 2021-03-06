# FastFramework
Small (300 lines of code) javascript framework library to provide you with some handfull features in an easy way.  
This proyect is also hosted at Netlify and accesible [here](https://fastframework.ga/ff.js) 

### Updates
###### New Object Cache
New method that allows you to cache and manage cached files.   
Full cached webpages works 100% offline and load faster online.

### Install  
##### ES6 module import.  
Create a html file.  
  Link your main.js file including type="module".  
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

  This is the recommended way.


##### JSON object import  
Create a html file.
  Fetch the json and create the object.
  Use your code from the callback.  

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

      <script>
      function GET(url, callback) {
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

      GET("https://raw.githubusercontent.com/StringManolo/ff/master/json/ff.json", function(resp, ff, ff2, fBody) {
        ff2  = JSON.parse(resp);
        fBody = ff2.match(/function[^{]+\{([\s\S]*)\}$/)[1];
        ff = new Function([], fBody);
        ff = ff();

        /* From here you can use the framework freely. */
        ff.mustache.date = new Date();
        ff.getMustacheSintax();

      });
      </script>
    </body>
  </html>
  ```

  You may want to do this if you have CORS problems or you can't use multiple files in your static site hosting.  
  As an example, you can see this same code working in blogger [here](https://diariodedesarrollador.blogspot.com/2020/09/testing-fastframework-support-into.html). Or a small spa test working too in blogger [here](https://diariodedesarrollador.blogspot.com/2020/09/test-ff-spa-support.html).

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
  Notice the method ```ff.getMustacheSintax();``` being called to replace the mustache sintax from all the document to corresponding values.

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
  This tags will be filled with the content of a file named same as tag and ending by .ff  
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
  
  ### ff.cache.start()  
  Activate the cache. Resources need to be declared before call this method. Example:
  ```
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
  ```
  
  The first parameter is the route to a Service Worker. You can copy and paste next code and name it cache.js in same route as your main.js file calling the method and forget about it. 

  ```
  self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
    if(response)
      return response
    else
      return fetch(e.request)
   }))
  })
  ``` 

  The second parameter 100000 in the previous example is the amount of time (in milliseconds) the files will be into browser cache. This means way faster file loads. When cache expires the browser will download again the files from the server so new ccontent will be cached. The value you should set here depends totally on how often you update content in your web and what files you chosed to cache.  
    
  You can test it live [here](https://bugs.stringmanolo.ga)  

### Files Structure
  
+ [README.md](https://github.com/StringManolo/ff/blob/master/README.md)  
  This file. Documentation writed in markdown.  

+ [blog](https://github.com/StringManolo/ff/tree/master/blog)  
  Example of a simple blog using some features of ff importing from ES6 module. Live [here](https://fastframework.ga/blog/).  
  + [csrf1.ff](https://github.com/StringManolo/ff/blob/master/blog/csrf1.ff)  
    Article about csrf bugs. ```<csrf-1>``` tag in the html.  
  + [index.html](https://github.com/StringManolo/ff/blob/master/blog/index.html)   
    Index html blog file.  
  + [main.css](https://github.com/StringManolo/ff/blob/master/blog/main.css)     
    Main css blog file.  
  + [main.js](https://github.com/StringManolo/ff/blob/master/blog/main.js)  
    Main javascript blog file. Imports the libarary from url using ES6 módule and call some framework methods.   
  + [xss1.ff](https://github.com/StringManolo/ff/blob/master/blog/xss1.ff)  
    Article about xss filter bypass. ```<xss-1>``` tag in the html.  
+ [ff.js](https://github.com/StringManolo/ff/blob/master/ff.js)  
  All the framework code is here. Exported as an object using ES6 modules. This is the file you need, to use the framework. Other files like blog/main.js are here as simple examples of usage.  
+ [index.html](https://github.com/StringManolo/ff/blob/master/index.html)  
  Example of framework usage.  
+ [json](https://github.com/StringManolo/ff/tree/master/json)  
  Json folder.  
  + [ff.json](https://github.com/StringManolo/ff/blob/master/json/ff.json)  
    The ff.js wrapped into a function returning the ff object.  
  + [jsonExporter.html](https://github.com/StringManolo/ff/blob/master/json/jsonExporter.html)  
    This file is a rudimentary way to generate the json from the hardcoded ff.js. Ignore this.  
+ [launcher.html](https://github.com/StringManolo/ff/blob/master/launcher.html)  
  Alternative to use the framework in case you don't want to use ES6 modules, or it's complex for your level among other reasons like you find it more comfortable this way. As an overview, this is just a html file with some js downloading the ff.json and creating the ff object from it, so you can use it inside the GET function callback.  
+ [main.js](https://github.com/StringManolo/ff/blob/master/main.js)  
  Another example of ff.js import from local, and usage.  
+ [mycustom.ff](https://github.com/StringManolo/ff/blob/master/mycustom.ff)  
  Example of a custom tag file.  
+ [netlify.toml](https://github.com/StringManolo/ff/blob/master/netlify.toml)  
  This file is to make netlify servers (where is hosted https://fastframework.ga) include CORS headers, so you can import directly the ff.js file using the url https://fastframework.ga/ff.js  
+ [oldCode](https://github.com/StringManolo/ff/tree/master/oldCode)  
  Old versions of ff project code. Just for fun or reference.
  + [oldVersion2ForReference.txt](https://github.com/StringManolo/ff/blob/master/oldCode/oldVersion2ForReference.txt)  
    Totally Remaked to use ES6 modules, avoid global scope pollution and way better organiced. Not having support yet to include script tags inside .ff files.  
  + [oldVersionForReference.txt](https://github.com/StringManolo/ff/blob/master/oldCode/oldVersionForReference.txt)  
    First working version of ff.js, be carefull, dangerous code. 
+ [spa](https://github.com/StringManolo/ff/tree/master/spa)  
Example of a simple spa using some features of ff. Live [here](https://fastframework.ga/spa/).  
  + [customdate.ff](https://github.com/StringManolo/ff/blob/master/spa/customdate.ff)  
    Small script showing date.  
  + [customtag.ff](https://github.com/StringManolo/ff/blob/master/spa/customtag.ff)   
    Small text showing a message.  
  + [index.html](https://github.com/StringManolo/ff/blob/master/spa/index.html)  
    Spa html.  
  + [main.js](https://github.com/StringManolo/ff/blob/master/spa/main.js)  
    FastFramework example using the launcher.  
  
4 directories, 20 files.  
  

### Extra
  If you find bugs, issues, bad practices or anything you wwant to ask me, include... Feel free to send me a telegram message @stringmanolo  

