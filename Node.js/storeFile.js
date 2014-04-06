/*https://edge.edx.org/courses/MITx/6.BDx/1T2014/discussion/forum?ajax=1&page=1&sort_key=votes&sort_order=desc*/
// var questionsData = new Array();
// function createUrlForPage(pageNo) {
// 	return "https://edge.edx.org/courses/MITx/6.BDx/1T2014/discussion/forum?ajax=1&page=" + pageNo  + "&sort_key=votes&sort_order=desc";
// }
// function getResponseHandler(data,status) {
// 	console.log( data.page + " received");
// 	questionsData = questionsData.concat(data.discussion_data);
// 	if(data.page < data.num_pages) {
// 		$.get(createUrlForPage(data.page + 1),getResponseHandler);
// 	} else {
// 		console.log("Questions retrival Finished");
// 	}	
// }
// $.get(createUrlForPage(1),getResponseHandler);

var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var serverPort = 8080;
http.createServer(function (request, response) {
  if(request.method == "GET") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("<head><script src='http://code.jquery.com/jquery-1.11.0.min.js'></script></head><body>Hello World</body>");
  } else if(request.method == "POST") {
    var requestBody = '';
    request.on('data', function(data) {
      requestBody += data;
    });
    request.on('end', function() {
      var dataObj = JSON.parse(requestBody);
      	fs.writeFile(dataObj.fileName, dataObj.fileData, function (err) {
		  if (err) {
		  	response.write('Error in saving the file ' + dataObj.fileName);
		  } else {
			  response.write('File Saved ' + dataObj.fileName);
		  }      
		  response.end();
      console.log("Response Ended!");
		});
      
    });
  }
}).listen(serverPort);
console.log('Server running at localhost:'+serverPort);