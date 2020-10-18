#!/usr/bin/env python

from socket import *
import re

#Webpage code:
index_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<link rel='icon' href='data:;base64,iVBORw0KGgo='>
<title>Web Page Maker</title>
<meta name='theme-color' content='#555'>
<link rel='stylesheet' href='./main.css'>
</head>
<body>
Placeholder text.
<script type='module' src='./main.js'></script>
</body>
</html>"""


main_js = f"""import ff from "https://fastframework.ga/ff.js";

ff.activateShortcuts();
ff.defineShortcut("_", alert);
_("Everything working as intended");"""


main_css = f"""body {{
  margin: 0 0 0 0;
  background-color: #ccc;
  color: #555;
}}"""

#Minimal Server Code:
def localServer():
    i = 0
    sfd = socket(AF_INET, SOCK_STREAM)
    ADDR = ("127.0.0.1", 8003)
    sfd.bind(ADDR)
    sfd.listen(5)

    while True:
        connection, address = sfd.accept()

        while True:
            requested = connection.recv(1024).decode("utf-8")
            if not requested:
                break

            else:
                print(f"The request recived is {requested} \n\n\n")

                path = requested.split("\r\n")[0].split(" ")[1]
                print(f"Requested Path is: {path}")
           
                try:
                    ext = path.split(".")[1]
                except Exception as error:
                    ext = "/"

                print(f"Ext is {ext}")
                if re.match(ext, "js"):
                    contentType = "application/javascript"
                    if re.match(path, "/ff.js"):
                        requestedFile = ff_js

                    if re.match(path, "/main.js"):
                        requestedFile = main_js
                elif re.match(ext, "html") or re.match(ext, "htm") or re.match(ext, "/"):
                    contentType = "text/html"
                    requestedFile = index_html

                elif re.match(ext, "css"):
                    contentType = "text/css"
                    requestedFile = main_css
                else:
                    contentType = False

                if contentType:
                    hexSize = hex(len(requestedFile))
                    hexSize = str(hexSize)[2:]
         
                    print(f"Hex size is {hexSize}")
                    request = f"""HTTP/1.1 200 OK
Content-Type: {contentType}
Connection: keep-alive
Transfer-Encoding: chunked

{hexSize}
{requestedFile}
0


""".encode("utf-8")

                    connection.send(bytes(request))

    connection.close()
            #return "Connection With Client Closed"


localServer()

