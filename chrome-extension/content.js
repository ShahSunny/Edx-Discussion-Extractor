/*
  1. First uncomment first line below to questions data then move questionsData.json to webserver running on port 80.
  2. Once questions data is downloaded and moved to localhost:80 then uncomment last line of code to download answers.
*/
var lastFlush = 1;
var questionsData = new Array();

// Request Questions Data
function createUrlForPage(pageNo) {
  return "https://edge.edx.org/courses/MITx/6.BDx/1T2014/discussion/forum?ajax=1&page=" + pageNo  + "&sort_key=votes&sort_order=desc";
}
function getResponseHandler(data,status) {  
  questionsData = questionsData.concat(data.discussion_data);  
  if(data.page < data.num_pages) {
    console.log(data.page +" / " + data.num_pages + " Finished");
    $.get(createUrlForPage(data.page + 1),getResponseHandler);
  } else {
      var questionsFileName = "questionsData-.json";
      var dataObject = {"fileName":"questionsData.json", "fileData":JSON.stringify(questionsData)};  
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/',
        data: JSON.stringify(dataObject),
      }).done(function(res) {
          console.log("Questions posted successfully");
          console.log(res); 
      }).fail(function( jqXHR, textStatus ) {
          console.log("Questions post failed! " + textStatus);
      });
  }
}

/** 
  IMP: uncomment below line to download questions data, Copy questionsData.json to webserver (Apache?) running on port 80. 
  to retrive questions data.
*/
// $.get(createUrlForPage(1),getResponseHandler);

var questionCounter = 0;
var failedQuestions = new Array();
var failedToStoreAnswers = new Array();

function createUrlForPage(questionID) {
  return "https://edge.edx.org/courses/MITx/6.BDx/1T2014/discussion/forum/i4x-MITx-6_BDx-course-1T2014/threads/"+ questionID +"?ajax=1&resp_skip=0&resp_limit=200";  
}

function getQuestionData(callback) {
  console.log("Requesting QuestionData:");
  $.get( "http://localhost/questionsData.json","", function( data ) {
    var questionIDs = new Array();
    for (var i = 0; i < data.length; i++) {
      questionIDs[i] = data[i].id;
    };
    callback(questionIDs);
  },"json");
}

function storeData(questionID, data) {  
  var fileName = "ans/" + questionID + ".json";
  var dataObject = {"fileName":fileName, "fileData":JSON.stringify(data)};
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/',
    data: JSON.stringify(dataObject),
  }).done(function(res) {    
  }).fail(function( jqXHR, textStatus ) {
    failedToStoreAnswers.push(questionID);    
  });
}

function requestAnswers(questionIDs) {  
  var questionID = questionIDs[questionCounter];
  $.get(createUrlForPage(questionIDs[questionCounter]),"", function(data) {
    storeData(questionIDs[questionCounter], data);
  },"json").fail(function() {
    console.log("Failed for : " + questionIDs[questionCounter]);
    failedQuestions.push(questionID);
  }).always(function() {
    console.log(questionCounter + " / " + questionIDs.length + " Finished!");    
    ++questionCounter;
    if(questionCounter < questionIDs.length) {
      requestAnswers(questionIDs);
    }
  });  
}

/** 
  IMP: uncomment below line to download answers data, This requires http://localhost/questionsData.json to be available.
*/

//getQuestionData(requestAnswers);

