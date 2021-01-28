// TEXT TO BE INJECTED “SLOWLY” INTO P ELEMENTS
let whatTheAuthorHasToSay115 = " "; // CAUTION & WARNING: If fetch() is delayed because of slow network this would be UNDEFINED for a while unless set to empty space!
// NOTE: “myHeaders” variable exists in "../../../../js_reusables/js_for_fetch_api_character_encoding.js"
// NOTE: “userInterfaceLanguage” variable exists in "../../../../js_reusables/js_for_every_single_html.js"
let filePathForAuthorsMessage;
let filePathForWhatToPutIntoTheButton;

// Wait until all images and other js variables are ready with the 'load' event.
// ESPECIALLY wait for userInterfaceLanguage in js_for_every_single_html.js
window.addEventListener('load', function(){
  if (parent.deviceDetector.device == "tablet") {
      tabletDisplay.classList.add("fadeIn");
  }
  else if (parent.deviceDetector.device == "phone") {
      phoneDisplay.classList.add("fadeIn");
  }
  else {
      desktopDisplay.classList.add("fadeIn");
  }
  /*_________END OF UI HANDLING__________*/
  filePathForAuthorsMessage  = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-5_author_says.txt";
  fetch(filePathForAuthorsMessage,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    whatTheAuthorHasToSay115 = contentOfTheTxtFile;
    // ANIMATE TEXT
    let i = 1;
    function updateTheTextFunction115() {
        let visibleText = whatTheAuthorHasToSay115.substring(0, i); // CAUTION & WARNING: If fetch() is delayed because of slow network “whatTheAuthorHasToSay115” could be UNDEFINED for a while!
        document.getElementById("putTheWordsInHereP").innerHTML = visibleText;
    }
    let timer115 = setInterval(function(){
        updateTheTextFunction115();
        if (i >= whatTheAuthorHasToSay115.length) {
          clearInterval(timer115);
        }
        i++;
    }, 60);
  });
  // TRICK: Although the same ID is used three times, the removal of two of them will already have taken place by the time fetch() gets the file.
  filePathForWhatToPutIntoTheButton  = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-continue_to_next.txt";
  fetch(filePathForWhatToPutIntoTheButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  document.getElementById('putTextIntoThisGoToNextButton').innerHTML = contentOfTheTxtFile; });

}, { once: true });
// The 1-1-5.txt file should read one of the following (depending on the UI language)
//TR: "Az önce gördüğün bu ekmeği evde kendim pişirdim.";
//EN: "I baked this bread myself at home.";
//JA: "先に見えたそのパンは私が家で作りました。";

// UPDATE: It's now OK if the following two functions are not defined here. See js_for_all_iframed_lesson_htmls typeof conditionals
// // FOR COMPATIBILITY
// function unloadTheSoundsOfThisLesson() {  /*Do nothing*/  } // This has to exist here. Otherwise menu navigation buttons will go dead and give an error. Because of standard code in parent HTMLs.
// function unloadTheImagesOfThisLesson() {  /*Do nothing*/  } // This has to exist here. Otherwise menu navigation buttons will go dead and give an error. Because of standard code in parent HTMLs.

function proceedToNextLesson115() { /*This is called with an inline onclick inside the button element. See notice_0/index.html */
  document.querySelector('.nearZeroOpacity').classList.add("fadeOut"); // 2 second fadeout
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible"); },500+2000);
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible"); },750+2000);
  setTimeout(function () { self.location.href = "../../unit_2/lesson_1/index.html";  },1000+2000);
}
