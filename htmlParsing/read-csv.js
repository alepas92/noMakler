var globalNumbers = [], blackNumbers = ["Black numbers list"], goodNumbers = ["Good numbers list"];

function handleFiles(files) {
    // Check for the various File API support.
    if (window.FileReader) {
        // FileReader are supported.
        var filesNumber = files.length;
        for (var i = 0; i < filesNumber; i++) {
                  getAsText(files[i]);
        }

    } else {
        alert('FileReader are not supported in this browser.');
    }
  }

  function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
  }

  function loadHandler(event) {
    var csv = event.target.result;
    var allNumbers = [];
    allNumbers.push(processData(csv));
  }

  function processData(csv) {
      var allText = csv;
      var numberRegExp = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g;
      globalNumbers.push(allText.match(numberRegExp));
      detectGlobal();
  }

  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }

  function checkInBlackList(number) {
    var flag;
    for (var i = 0; i < blackNumbers.length; i++) {
      if (number == blackNumbers[i]) {
        return false;
      } else {
        flag = 0;
      }
    }
    if (flag == 0) return true;
  } 

  function checkInWhiteList(number) {
    var flag;
    for (var i = 0; i < blackNumbers.length; i++) {
      if (number == goodNumbers[i]) {
        return false;
      } else {
        flag = 0;
      }
    }
    if (flag == 0) return true;
  }

  function detectGlobal() {
    var detectingNumber, 
        blackCounter,
        currentNumb = 0,
        allNumbersMas = [];
        for (var i = 0; i < globalNumbers.length; i++) {
          allNumbersMas += globalNumbers[i] + "";  
          allNumbersMas = allNumbersMas.split(",");
        }
        for (; currentNumb < allNumbersMas.length; currentNumb++ ) {
          for (var i = 1; i < allNumbersMas.length; i++) {
            if (i == currentNumb) {
              i++;
            }
            if (allNumbersMas[currentNumb] == allNumbersMas[i]) {
              if (checkInBlackList(allNumbersMas[currentNumb]) == true) {
                blackNumbers.push(allNumbersMas[currentNumb]);            
              } 
            }
          }
        }
  }

  function show() {
    document.getElementById("loader-result").innerHTML += "<ul>";
    for (var i = 0; i < blackNumbers.length; i++) {
      console.log(blackNumbers[i]);
      document.getElementById("loader-result").innerHTML += "<li>" + blackNumbers[i] + "</li>";
    }
    document.getElementById("loader-result").innerHTML += "</ul>";
  };

document.getElementById("csvFileInput").onchange =  function(files) {
  this.files = files;
   handleFiles(this.files);
}

document.getElementById("show-maklers-phones").onclick = show;