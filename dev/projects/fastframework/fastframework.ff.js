<h1>FastFramework</h1>
<p>Small (250 lines of code) javascript framework library to provide you with some handfull features in an easy way.<br>
This project is also hosted at Netlify and accesible <a href="https://fastframework.ga/ff.js">here</a></p>
<h3>Install</h3>
<h5>ES6 module import.</h5>
<p>Create a html file.<br>
Link your main.js file including type="module".<br>
Import the ff module from your main.js file.</p>
<p>index.html</p>
<pre><code class="fastframeworkCode">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
      &lt;title&gt;My WebPage&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;

    {{ date }}

    &lt;script type="module" src="main.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>main.js</p>
<pre><code class="fastframeworkCode">import ff from "https://fastframework.ga/ff.js";
/* Define the mustache value */
ff.mustache.date = new Date();

/* replace the mustaches by the values */
ff.getMustacheSintax();
</code></pre>
<p>This is the recommended way.</p>
<h5>JSON object import</h5>
<p>Create a html file.
Fetch the json and create the object.
Use your code from the callback.</p>
<p>index.html</p>
<pre><code class="fastframeworkCode">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;My WebPage&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;

    {{ date }}

    &lt;script&gt;
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

    GET("https://raw.githubusercontent.com" + 
    "/StringManolo/ff/master/json/ff.json",
    function(resp, ff, ff2, fBody) {
      ff2  = JSON.parse(resp);
      fBody = ff2.match(/function[^{]+\{([\s\S]*)\}$/)[1];
      ff = new Function([], fBody);
      ff = ff();

      /* From here you can use the framework freely. */
      ff.mustache.date = new Date();
      ff.getMustacheSintax();

    });
    &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>You may want to do this if you have CORS problems or you can't use multiple files in your static site hosting.<br>
As an example, you can see this same code working in blogger <a href="https://diariodedesarrollador.blogspot.com/2020/09/testing-fastframework-support-into.html">here</a>. Or a small spa test working too in blogger <a href="https://diariodedesarrollador.blogspot.com/2020/09/test-ff-spa-support.html">here</a>.</p>
<h1>Methods</h1>
<h3>ff.activateShortcuts();</h3>
<p>Activate the default shortcut aliases:</p>
<ul>
<li>
<p>$(selector);<br>
Alias for document.querySelector(selector);<br>
Example:<br>
<code class="fastframeworkCode">$("#myDiv");</code></p>
</li>
<li>
<p>$$(selector);<br>
Alias for document.querySelectorAll(selector);<br>
Example:<br>
<code class="fastframeworkCode">$$(".myDivs");</code></p>
</li>
<li>
<p>ael( element, event, callback );<br>
Wraper around addEventListener.
Example:</p>
</li>
</ul>
<pre><code class="fastframeworkCode">ael( $("myDiv"), "click", function() {
   alert("You clicked my div.");
 });
</code></pre>
<p><em>The aliases are window global properties.</em></p>
<h3>ff.defineShortcut(alias, target);</h3>
<p>Create a new alias.<br>
Example:</p>
<pre><code class="fastframeworkCode">ff.defineShortcut("_", alert);
_("Hello");
</code></pre>
<h3>ff.router.start();</h3>
<p>Activate the router. Routes need to be declared before call this method. Example:</p>
<pre><code class="fastframeworkCode">ff.routes = {
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
</code></pre>
<p>Is mandatory to name the ff.routes properties as route1, route2, route3...</p>
<p>Is also mandatory to declare the amount property asigning the number of routes (routeDefault not included).</p>
<p><code class="fastframeworkCode">name</code> property indicates the route; home equals to <a href="https://example.com/#home">https://example.com/#home</a></p>
<p><code class="fastframeworkCode">action</code> property is the method called when you navigate to the name route. You can modify innerHTML from elements or anything you want to do.</p>
<p>routeDefault action property is called when you use a # route not defined as route in the ff.routes object.</p>
<h3>ff.mustache</h3>
<p>You declare your properties under the mustache object.<br>
Example:</p>
<pre><code class="fastframeworkCode">ff.mustache.date = new Date();  
ff.mustache.myNick = "StringManolo";
ff.mustache.myHeader = "&lt;h1&gt;FastFramework&lt;/h1&gt;"

/* replace the mustaches by the values */
ff.getMustacheSintax();
</code></pre>
<p>You can use {{ myHeader }} to show as text or {{{ myHeader }}} to show as html.<br>
Notice the method <code class="fastframeworkCode">ff.getMustacheSintax();</code> being called to replace the mustache sintax from all the document to corresponding values.</p>
<h3>ff.getUnknownTags();</h3>
<p>Find all the html tags under the pattern <code class="fastframeworkCode">&lt;tag&gt;&lt;/tag&gt;</code> being <code>tag</code> a not already existing tag in the parser of your browser. Recomended to prepend <code class="fastframeworkCode">my</code> to make sure the tag does not exist. Example:</p>
<pre><code class="fastframeworkCode">ff.customTags = {
myMenu:`&lt;section&gt;&lt;article id="mainMenu"&gt;&lt;a href="#home"&gt;HOME&lt;/a&gt;
&lt;a href="#example"&gt;EXAMPLE&lt;/a&gt;
&lt;a href="#updates"&gt;UPDATES&lt;/a&gt;
&lt;a href="#about"&gt;ABOUT&lt;/a&gt;&lt;/article&gt;&lt;/section&gt;`
};

/* replace the unknown tags by the templates */
ff.getUnknownTags();
</code></pre>
<h3>ff.getCustomTags();</h3>
<p>Find all the html tags under the pattern <code class="fastframeworkCode">&lt;custom-tag&gt;&lt;/cutom-tag&gt;</code> being <code class="fastframeworkCode">custom-tag</code> 2 keywords separated by a guion. The guion is removed, becarefull about that because <code class="fastframeworkCode">&lt;hellofrom-here&gt;</code> and <code class="fastframeworkCode">&lt;hello-fromhere&gt;</code> are referencing the same file after the guion is removed.
This tags will be filled with the content of a file named same as tag and ending by .ff<br>
Example:<br>
index.html</p>
<pre><code class="fastframeworkCode">...
&lt;body&gt;
&lt;my-text&gt;&lt;/my-text&gt;
&lt;script type="module" src="main.js"&gt;&lt;/script&gt;
...
</code></pre>
<p>main.js</p>
<pre><code class="fastframeworkCode">import ff from "https://fastframework.ga/ff";
ff.getCustomTags();
...
</code></pre>
<p>mytext.ff</p>
<pre><code class="fastframeworkCode">This text will be included inside index.html.
This &lt;b&gt;also&lt;/b&gt; let me use html.
</code></pre>
<h3>Files Structure</h3>
<ul>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/README.md">README.md</a><br>
This file. Documentation writed in markdown.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/tree/master/blog">blog</a><br>
Example of a simple blog using some features of ff importing from ES6 module. Live <a href="https://fastframework.ga/blog/">here</a>.</p>
<ul>
<li><a href="https://github.com/StringManolo/ff/blob/master/blog/csrf1.ff">csrf1.ff</a><br>
Article about csrf bugs. <code>&lt;csrf-1&gt;</code> tag in the html.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/blog/index.html">index.html</a><br>
Index html blog file.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/blog/main.css">main.css</a><br>
Main css blog file.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/blog/main.js">main.js</a><br>
Main javascript blog file. Imports the libarary from url using ES6 módule and call some framework methods.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/blog/xss1.ff">xss1.ff</a><br>
Article about xss filter bypass. <code class="fastframeworkCode">&lt;xss-1&gt;</code> tag in the html.</li>
</ul>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/ff.js">ff.js</a><br>
All the framework code is here. Exported as an object using ES6 modules. This is the file you need, to use the framework. Other files like blog/main.js are here as simple examples of usage.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/index.html">index.html</a><br>
Example of framework usage.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/tree/master/json">json</a><br>
Json folder.</p>
<ul>
<li><a href="https://github.com/StringManolo/ff/blob/master/json/ff.json">ff.json</a><br>
The ff.js wrapped into a function returning the ff object.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/json/jsonExporter.html">jsonExporter.html</a><br>
This file is a rudimentary way to generate the json from the hardcoded ff.js. Ignore this.</li>
</ul>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/launcher.html">launcher.html</a><br>
Alternative to use the framework in case you don't want to use ES6 modules, or it's complex for your level among other reasons like you find it more comfortable this way. As an overview, this is just a html file with some js downloading the ff.json and creating the ff object from it, so you can use it inside the GET function callback.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/main.js">main.js</a><br>
Another example of ff.js import from local, and usage.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/mycustom.ff">mycustom.ff</a><br>
Example of a custom tag file.</p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/blob/master/netlify.toml">netlify.toml</a><br>
This file is to make netlify servers (where is hosted <a href="https://fastframework.ga">https://fastframework.ga</a>) include CORS headers, so you can import directly the ff.js file using the url <a href="https://fastframework.ga/ff.js">https://fastframework.ga/ff.js</a></p>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/tree/master/oldCode">oldCode</a><br>
Old versions of ff project code. Just for fun or reference.</p>
<ul>
<li><a href="https://github.com/StringManolo/ff/blob/master/oldCode/oldVersion2ForReference.txt">oldVersion2ForReference.txt</a><br>
Totally Remaked to use ES6 modules, avoid global scope pollution and way better organiced. Not having support yet to include script tags inside .ff files.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/oldCode/oldVersionForReference.txt">oldVersionForReference.txt</a><br>
First working version of ff.js, be carefull, dangerous code.</li>
</ul>
</li>
<li>
<p><a href="https://github.com/StringManolo/ff/tree/master/spa">spa</a><br>
Example of a simple spa using some features of ff. Live <a href="https://fastframework.ga/spa/">here</a>.</p>
<ul>
<li><a href="https://github.com/StringManolo/ff/blob/master/spa/customdate.ff">customdate.ff</a><br>
Small script showing date.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/spa/customtag.ff">customtag.ff</a><br>
Small text showing a message.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/spa/index.html">index.html</a><br>
Spa html.</li>
<li><a href="https://github.com/StringManolo/ff/blob/master/spa/main.js">main.js</a><br>
FastFramework example using the launcher.</li>
</ul>
</li>
</ul>
<p>4 directories, 20 files.</p>
<h3>Extra</h3>
<p>If you find bugs, issues, bad practices or anything you wwant to ask me, include... Feel free to send me a telegram message @stringmanolo</p>
