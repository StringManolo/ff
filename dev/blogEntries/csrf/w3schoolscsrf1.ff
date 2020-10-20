<div class="csrf"><h1>CSRF - Log Out</h1>
<h4>Report made 1 oct, 2020 to mypage.w3schools.com where i found 2 bugs.
<a href="#writeups/csrf">Logout CSRF</a>, and <a href="#writeups/xss">Stored XSS</a>.</h4>
<p>I found this logout CSRF bug testing w3schools security. Just made an account following the login link in the main domain. Here is the original report in case you want to take a look.</p>
<div class="csrfReport" contentEditable="true">
<p>Security report for https://mypage.w3schools.com at 1 october, 01:54 (Spain).</p>

<p>Anyone logged in his own mypage can be logged out from his account from any other webpage.</p>

<p>Step Reproduction:
<p>1) Upload this code to any website with views:<p>

<p>&lt;html><br />
&lt;body><br />
You're getting logged out!<br />
&lt;img src="https://mypage.w3schools.com/mypage/logout_user.php"><br />
&lt;/body><br />
&lt;/html></p>

<p>2) When you visit a webpage with a image pointing to that url, or a request made or form submited with javascript, you get logged out from your account at w3schools.</p>
</p></div>
<p>The bug was totally a low hanging fruit.</p>
<p>I found another bug at w3schools 30 mins before. You can read  <a href="#writeups/xss/w3schoolsxss1">here w3schools stored xss</a></p>
