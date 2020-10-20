<div class="xss"><h1>XSS - Stored</h1>
<h4>Report made 1 oct, 2020 to mypage.w3schools.com where i found 2 bugs.
<a href="#writeups/csrf">Logout CSRF</a>, and <a href="#writeups/xss">Stored XSS</a>.</h4>

<div class="imagesParent"><img id="w3schoolsImageLandscape" class="images" alt="Alert box prompted from w3schools.com" src="./resources/w3schoolsxsslandscape.png">
<img class="images" id="w3schoolsImagePortrait"  alt="Alert box prompted from w3schools.com" src="./resources/w3schoolsxss.png"></div>

<p>I found this stored XSS bug testing w3schools security. Just made an account following the login link in the main domain. Here is the original report in case you want to take a look.</p>

<div class="xssReport" contentEditable="true">
<p>Security report for https://mypage.w3schools.com at 1 october, 01:20 (Spain).</p>

<p>The input "name" located at https://mypage.w3schools.com/mypage/editprofile.php is vulnerable to XSS.</p>

<p>Step replication.

<p>1) Create new account and Log in.</p>
<p>2) Click edit profile button or go to the vulnerable url.</p>
<p>3) Introduce &lt;svg/onload=alert()></p>
<p>4) Save changes.</p>
</p>

<p>The javascript code get executed everytime i visit the webpage.</p>

<p>  Safety recommendation:
In case it's a "feature", should be removed anyways. I'm sure there is a lot of ways to use this vulnerability to damage the website and the users. </p></div>

This is the payload:
<div class="imagesParent"><img id="w3schoolsPayload" alt="inserted payload" class="images" src="./resources/w3schoolspayload.png"></div>

<p>The bug was totally a low hanging fruit.</p>
<p>I found another bug at w3schools 30 mins after. You can read <a href="#writeups/csrf/w3schoolscsrf1">w3schools csrf logout</a></p>

