<div id="xss" class="xss"><h1>3 X 1</h1>
<h4>Report i made a year ago to a website where i found 3 bugs.
<a href="#writeups/csrf">CSRF</a>, Predictable Password and <a href="#writeups/xss">Reflected XSS</a>.</h4>
<p>I love this chainable bugs, where you're unable to do much with one of them, but you become a serial killer with 2 or more together. Here is half of the original report a bit edited(original is writed in spanish) in case you want to take a look.</p>
<div class="xssReport" contentEditable="true">
<p>Security report for https://example.com at 27 november, 04:32 (Spain).</p>

<p>Reflected XSS at //www.example.com/register.php HTTP POST method at date1 & date2 parameters.</p>

<p>Predictable user and password at //www.example.com/login.php</p>

<p>CSRF logout/login at //www.example.com/home.php and //www.example.com/app.php HTTP GET method at url.</p>


<p>Three notable security flaws were found in the non-requested manual penetration test carried out between the afternoon of November 27 and the morning of November 28. User-Agent: SM and IP 183.71.717</p>

<p>- Reflected XSS:
  This security failure is caused by not performing the correct validation of the data entered in the application.
  Its exploitation consists of modifying the form with a name:"saveD" in order to be able to enter text, and therefore malicious javascript code in fields destined to numeric values. It is not verified in the PHP code that the user sends dates and not malicious code that can be interpreted by the browser.</p>

<p>  Step replication.
  1) Log in to the page.</p>

<p>  2) Go to https://www.example.com</p>

<p>  3) Enter the following javascript code in the browser's address bar to create a form that allows you to send text in fields that were intended to send only dates and press enter.</p>
  
<p>  j&#97;v&#97;&#115;cr&#105;pt:d&#111;c&#117;m&#101;nt&#46;wr&#105;t&#101;&#40;&#34;&#60;d&#105;v&#32;cl&#97;&#115;&#115;=\&#34;c&#111;nt&#97;&#105;n&#101;r\&#34;&#62;&#32;&#32;&#32;&#60;d&#105;v&#32;cl&#97;&#115;&#115;=\&#34;f&#111;rmT\&#34;&#62;&#32;&#32;&#32;&#60;h2&#62;&#83;&#101;l&#101;ct&#32;&#60;&#115;p&#97;n&#62;D&#97;t&#101;&#115;&#40;&#115;&#101;c&#111;nd&#32;&#115;h&#105;ft&#41;&#60;/&#115;p&#97;n&#62;&#60;/h2&#62;&#32;&#32;&#32;&#60;/d&#105;v&#62;&#32;&#32;&#32;&#60;f&#111;rm&#32;cl&#97;&#115;&#115;=\&#34;f&#111;rmR\&#34;&#32;n&#97;m&#101;=&#34;\&#115;&#97;v&#101;D\&#34;&#32;&#105;d=\&#34;r&#101;g&#105;&#115;t&#101;r\&#34;&#32;m&#101;th&#111;d=\&#34;P&#79;&#83;T\&#34;&#32;&#97;ct&#105;&#111;n=\&#34;r&#101;g&#105;&#115;t&#101;r&#46;php\&#34;&#62;&#32;&#32;&#32;&#60;&#105;np&#117;t&#32;cl&#97;&#115;&#115;=\&#34;&#105;np&#117;t\&#34;&#32;typ&#101;=\&#34;t&#101;xt\&#34;&#32;n&#97;m&#101;=\&#34;d&#97;t&#101;2\&#34;&#62;&#32;&#32;&#32;&#60;d&#105;v&#62;&#32;&#32;&#32;&#60;&#105;np&#117;t&#32;cl&#97;&#115;&#115;=\&#34;btn&#83;\&#34;&#32;typ&#101;=\&#34;&#115;&#117;bm&#105;t\&#34;&#32;v&#97;l&#117;&#101;=\&#34;&#83;t&#111;r&#101;\&#34;&#62;&#32;&#32;&#32;&#60;&#105;np&#117;t&#32;cl&#97;&#115;&#115;=\&#34;btnR\&#34;&#32;typ&#101;=\&#34;r&#101;&#115;&#101;t\&#34;&#32;v&#97;l&#117;&#101;=\&#34;D&#101;l&#101;t&#101;\&#34;&#62;&#32;&#32;&#32;&#60;/d&#105;v&#62;&#60;/d&#105;v&#62;&#60;/f&#111;rm&#62;&#60;/d&#105;v&#62;&#34;&#41;;</p>

<p>  4) Enter the < symbol in the first generated field.
  Enter script>alert("Arbitrary javascript execution");&lt;/script> in the seconde generated field.</p>

<p>  5) Hit the "store" button.</p>

<p>  6) The script is executed in the browser.</p>

<p>  This security flaw allows a malicious user to mirror javascript code in the browser of a legitimate user of the application.</p>

<p>  The attacker can perform potentially dangerous actions such as stealing the session of a legitimate user who is logged into the application / web when the user visits a web page with malicious code prepared to exploit this security flaw. The user only has to visit a malicious / infected page for the session to be stolen.</p>

<p>  Safety recommendation:
It is necessary to validate from the server all the fields and other mechanisms that allow a user to send any type of data to the server.</p>

<p>Use the htmlentities () function to prevent the user's browser from interpreting malicious code. https://www.w3schools.com/php/func_string_htmlentities.asp</p>

<p>  More detailed information about the security breach:
General explanation of XSS security flaws: https://diego.com.es/ataques-xss-cross-site-scripting-en-php</p>

<p>Detailed explanation of the security flaw found:
http://itfreekzone.blogspot.com/2009/12/rompiendo-lo-grande-xss-avanzado.html</p>

<p>This penetration test was carried out randomly with the sole objective of improving your security. AT NO TIME was sensitive information accessed. Security flaws have NOT been used or distributed.</p>
<p>Contact Email: example@gmail.com</p>
</div>

<p>I remember this XSS as if it were yesterday. The main problem is that the value of both fields was reflected together. The filter was good, because I wasn't able to inject anything into a field. Many filters are based on blocking the <character if it accompanies a character other than a space. That is, following this rule, inserting the <b><</b> by itself it's a totally valid approach. But because both fields were reflected together: field1 = "<" field2 = "script>alert()&lt;/script>"; the XSS was sucessfull.</p>

<p>The first bug I found was the predictable username and password.

I don't usually test this bug, but the registry told me that admin was already registered.

So I tried about 12 passwords in total. The password was ${ domainName }administrator123.</p>

<p>I found the CSRF logout by looking at the source code of a redirection with view-source:domain. The site used a url to logout that anyone could request without any token.<p>

<p>CSRF login was pretty much the same. After sucefull login and a couple clicks you were redirected to the internal app. You were able to be a registered user just by typing the url of the hidden main application where i found the XSS</p>

<p>This are low hanging fruit bugs, but the web was big enought to hidde them well.</p>
</div>
