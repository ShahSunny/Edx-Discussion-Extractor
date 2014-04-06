Edx discussion data extractor is implemented using Google chrome extension which uses cross-site-scripting to extract and save data using AJAX APIs of Edx. Google chrome extensions are not allowed to access local file-system, so I implemented simple node.js web-server to store the data. Chrome extension posts the data retrieved from Edx to node.js webserver which internally writes it to local filesystem.

Check comments in chrome-extension/content.js to understand the usage of chrome extension. 
