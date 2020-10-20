<h1>JEX - JavaScript Offline Hexadecimal Editor.</h1>

<p><b>What is it?</b><br />
JEX is a web application written in javascript to analyze and modify all types of files from any device that can use a browser.</p>

<p><b>How does it work?</b><br />
The operation is simple, you open the document.html with the browser and upload any file under 1 mb. The <em>Compile</em> button is used so that once you modify the hexadecimal of the file, a new file will be downloaded with the modifications incorporated. The <em>Info</em> button is self-descriptive, and to manage the interface all you need is to scroll the hexadecimal. The software works 100% offline.</p>

<p><b>Features</b>
<list><li>I added an analysis to ELF files and if you are a developer the analysis can be extended to different files.</li> 
<li>It detects the mime types of multiple files.</li>
<li>Indicates the possible file extension.</li>
<li>Indicates the architecture / platform.*</li>
<li>Indicates the byte order.*</li>
<li>Indicates the cpu.*</li>
<li>Indicates the size of the file.</li>
<li>Easily extendable.</li></list>
* ELF.</p>

<p>All the code is in a single file to make it more accessible to newbies.</p>

<p><b>Why?</b><br />
The idea came up with the purpose of offering this feature to old Android devices incompatible with software that would allow this analysis. Also preserve its 100% offline operation so that it is not necessary to work on the network so as not to expose malware with which you can be working.</p>

<p><b>Current status?</b><br />
The project presents a problem that caused me to temporarily not continue with development. Files that exceed a few kilobytes (600KB +) cannot be processed due to browser limitations using raw js on DOM api. The option that I valued to be able to process large files is to use WebAssembler, in which I still do not have enough proficiency and that is why i did not continue development.</p>

<iframe id="jexIframe" src="https://stringmanolo.ga/projects/jex/jex.html"></iframe>
