// Run our kitten generation script as soon as the document's DOM is ready.
    document.addEventListener('DOMContentLoaded', function () {
      var button = document.getElementById("loadbtn");
      button.addEventListener("click", function() {
        if(button.innerHTML == "Load again") {
          button.innerHTML  = "Load";
        } else {
          button.innerHTML  = "Load again";
        }
        chrome.tabs.executeScript(null, {file: "jquery-1.11.0.min.js"});
        chrome.tabs.executeScript(null, {file: "content.js"});
      }, false);
    });