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

/* Url of the json stringified function returning the ff object. */
GET("https://raw.githubusercontent.com/StringManolo/ff/master/json/ff.json", function(resp, ff, ff2, fBody) {
  /* resp is the json response. ff & ff2 & fBody are just void variables. */
  /* Parse the downloaded json */
  ff2  = JSON.parse(resp);

  /* Find the function body from the parsed function as string. */
  fBody = ff2.match(/function[^{]+\{([\s\S]*)\}$/)[1];
  
  /* Create a new function */
  ff = new Function([], fBody);

  /* Call the function & asign the returned object to the ff variable */
  ff = ff();

  
  /* From here you can use the framework freely. */
  ff.activateShortcuts();

  ff.customTags = {
	myMenu:`<section><article id="mainMenu"><a href="#home">HOME</a>
<a href="#overview">OVERVIEW</a>
<a href="#updates">UPDATES</a>
<a href="#about">ABOUT</a></article></section>`
};

var home = `<h1>Welcome!</h1>
Welcome to my page`;

var overview = `<h1>Overview!</h1>
This page is an example of fast framework usage.`;

var updates = `<h1>Updates!</h1>
The last change is this page.`;

var about = `<h1>About!</h1>
This work is made by <a href="#stringmanolo">String Manolo</a>.`;


ff.routes = {
  route1: {
    name: "home",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + home;
    }
  },

  route2: {
    name: "overview",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + overview;
    }
  },

  route3: {
    name: "updates",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + updates;
    }
  },

  route4: {
    name: "about",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu + about;
    }
  },

  route5: {
    name: "stringmanolo",
    action: function() { 
      alert("Github: https://github.com/stringmanolo");
    }
  },

  amount: 5,

  routeDefault: {
    name: "default",
    action: function() {
      $("myViews").innerHTML = ff.customTags.myMenu;
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
});

