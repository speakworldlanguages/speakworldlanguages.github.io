"use strict";
/*-----*/
// TYPE1: Generic info box » Watch how 1 of 2 possible texts is injected into the button

// Function that creates a div for [special case/unique feature/untranslatable thing] info NOTIFICATIONS
/* VARIABLES AND CONSTANTS*/
var putNotificationTxtIntoThisP;
const okButtonToCloseTheNotification = document.createElement("DIV");
okButtonToCloseTheNotification.innerHTML = "&#10004;"; // Default content of the OK box is a "tick ✔" mark

// Put something like [OK], [Got it], [I see], [Oh really?], [Wow], [That's interesting] etc into the button.
const pathOfOkCloseTheBox = "/user_interface/text/"+userInterfaceLanguage+"/0-ok_i_understand.txt";
fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleOKButtonText(contentOfTheTxtFile);  });
function handleOKButtonText(receivedTxt) {
  if(Math.random()<0.5) { okButtonToCloseTheNotification.innerHTML = receivedTxt.split("|")[0]; } // Heads or tails
  else { okButtonToCloseTheNotification.innerHTML = receivedTxt.split("|")[1]; } // Heads or tails
}

const popUpNotificationSound = new parent.Howl({  src: ["/user_interface/sounds/notification1_appear."+parent.audioFileExtension]  });
const dismissNotificationSound = new parent.Howl({  src: ["/user_interface/sounds/notification1_close."+parent.audioFileExtension]  });

/*FUNCTION DECLARATION*/
function createAndHandleInfoBoxType1(isAmidLessonOrNot) {
  popUpNotificationSound.play();
  const notificationBoxContainer = document.createElement("DIV");
  notificationBoxContainer.classList.add("notificationBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(notificationBoxContainer);
  const notificationBoxItself = document.createElement("DIV");
  notificationBoxItself.classList.add("notificationRoundedBox"); // See css_for_info_boxes_in_lessons
  notificationBoxContainer.appendChild(notificationBoxItself);

  putNotificationTxtIntoThisP = document.createElement("P");
  notificationBoxItself.appendChild(putNotificationTxtIntoThisP);

  okButtonToCloseTheNotification.classList.add("okButtonUnderNotification"); // See css_for_info_boxes_in_lessons
  if (needLatinFonts) {
    okButtonToCloseTheNotification.style.fontFamily = '"Oxanium SemiBold", sans-serif';
  }
  notificationBoxItself.appendChild(okButtonToCloseTheNotification);


  if (isAmidLessonOrNot=="amid") { // Make the function thenable if it is called with the argument "amid"

    return new Promise(function(resolve, reject) {
      if (deviceDetector.isMobile) { okButtonToCloseTheNotification.addEventListener("touchstart",okButtonIsClickedToContinueLesson); }
      else { okButtonToCloseTheNotification.addEventListener("mousedown",okButtonIsClickedToContinueLesson); }
      function okButtonIsClickedToContinueLesson(event) { event.preventDefault(); event.stopPropagation();
        // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(okButtonToCloseTheNotification); // Exists in js_for_the_sliding_navigation_menu
        dismissNotificationSound.play();
        notificationBoxContainer.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
        setTimeout(function () {     notificationBoxContainer.parentNode.removeChild(notificationBoxContainer);  resolve(true);   },1300); // The animation completes in 600ms
      }
    });

  } else { // Without "amid" closing the info box will start the lesson immediately

    if (deviceDetector.isMobile) { okButtonToCloseTheNotification.addEventListener("touchstart",okButtonIsClickedToStartLesson); }
    else { okButtonToCloseTheNotification.addEventListener("mousedown",okButtonIsClickedToStartLesson); }
    function okButtonIsClickedToStartLesson(event) { event.preventDefault(); event.stopPropagation();
      // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(okButtonToCloseTheNotification); // Exists in js_for_the_sliding_navigation_menu
      dismissNotificationSound.play();
      notificationBoxContainer.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
      setTimeout(function () {     notificationBoxContainer.parentNode.removeChild(notificationBoxContainer);     },1000); // The animation completes in 600ms
      if (typeof startTheLesson === "function") {
        setTimeout(function () {     startTheLesson();     }, 1500);
      } else { console.error("Error: createAndHandleInfoBoxType1() needs startTheLesson() function which doesn't exist???"); }
    }

  }
}

/*-----*/
// TYPE2 is the [choose input device] thingy.
/*-----*/

/*-----*/
// TYPE3 WAVESURFER.
// Function that creates a div box for pronunciation (wavesurfer) NOTIFICATIONS
/* VARIABLES AND CONSTANTS*/
const putVocabularyTxtIntoThisP1 = document.createElement("P");
const putVocabularyTxtIntoThisP2 = document.createElement("P");
let txtStringForP1 = "...";
let txtStringForP2 = "...";
function handleP1P2ActualText(receivedTxt) { // Called when fetch gets the file » See the lesson's own js
  txtStringForP1=receivedTxt.split("|")[0]; putVocabularyTxtIntoThisP1.innerHTML= txtStringForP1;
  txtStringForP2=receivedTxt.split("|")[1]; putVocabularyTxtIntoThisP2.innerHTML= txtStringForP2;
}
const listenButtonOfTheVocabulary = document.createElement("DIV");
const startButtonToCloseTheVocabulary = document.createElement("DIV");
let listenButtonTxt, listenAgainButtonTxt, startButtonTxt;
const wavesurferButton1Button2Path = "/user_interface/text/"+userInterfaceLanguage+"/0-vocabulary_button1_button2.txt";
fetch(wavesurferButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  listenButtonTxt = contentOfTheTxtFile.split("|")[0];
  listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
  startButtonTxt = contentOfTheTxtFile.split("|")[2];
});
const popUpVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_appear."+parent.audioFileExtension]  });
const dismissVocabularySound = new parent.Howl({  src: ["/user_interface/sounds/notification3_close."+parent.audioFileExtension]  });

/*FUNCTION DECLARATION*/
function createAndHandleListenManyTimesBox(filePathOfTheAudio) {
  popUpVocabularySound.play();
  const vocabularyBoxContainer = document.createElement("DIV"); // Maybe a dark theme will look nice
  vocabularyBoxContainer.classList.add("vocabularyBG"); // See css_for_info_boxes_in_lessons
  document.body.appendChild(vocabularyBoxContainer);
  const vocabularyBoxItself = document.createElement("DIV");
  vocabularyBoxItself.classList.add("vocabularyRoundedBox"); // See css_for_info_boxes_in_lessons
  vocabularyBoxContainer.appendChild(vocabularyBoxItself);
  //
  if (!txtStringForP1) { // If download has failed or not finished yet
    putVocabularyTxtIntoThisP1.innerHTML="📄"; //📄
    putVocabularyTxtIntoThisP2.innerHTML="⏳"; //⏳
  }

  // APPEND txt1
  vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP1);

  // Wavesurfer
  const wavesurferContainer = document.createElement("DIV");
  wavesurferContainer.id = "waveform";
  wavesurferContainer.classList.add("vocabularyWavesurfer");
  vocabularyBoxItself.appendChild(wavesurferContainer);
  const wavesurfer = WaveSurfer.create({ container: '#waveform', waveColor: 'black', progressColor: '#daecfa', barWidth:3, height:60, barMinHeight:2, barGap:2, responsive:true, cursorWidth:0, hideScrollbar:true   });
  wavesurfer.load(filePathOfTheAudio); // See give_me_water.js for example

  // APPEND txt2
  vocabularyBoxItself.appendChild(putVocabularyTxtIntoThisP2);
  // Try to fix Safari and Firefox as they ignore text align justify although the container div has it in its class
  // putVocabularyTxtIntoThisP1.style.textAlign = "justify"; putVocabularyTxtIntoThisP2.style.textAlign = "justify"; // DIDN'T WORK!

  // buttonsUnderWavesurfer
  listenButtonOfTheVocabulary.classList.add("buttonsUnderWavesurfer");  listenButtonOfTheVocabulary.innerHTML = "&#128259; &#9658;"; // Default content is a "refresh 🔃 + play ►" mark
  startButtonToCloseTheVocabulary.classList.add("buttonsUnderWavesurfer");  startButtonToCloseTheVocabulary.innerHTML = "&#127918;"; // Default content is a "gamepad 🎮" mark
  if (listenButtonTxt) { // If fetch has already finished downloading the txt file
    listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
    startButtonToCloseTheVocabulary.innerHTML = startButtonTxt;
  } else { // Restart fetch but this time update buttonTxts as soon as the file is ready
    fetch(wavesurferButton1Button2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      listenButtonTxt = contentOfTheTxtFile.split("|")[0]; listenButtonOfTheVocabulary.innerHTML = listenButtonTxt;
      listenAgainButtonTxt = contentOfTheTxtFile.split("|")[1];
      startButtonTxt = contentOfTheTxtFile.split("|")[2]; startButtonToCloseTheVocabulary.innerHTML = startButtonTxt;
    });
  }
  const twoButtonsContainer = document.createElement("DIV"); twoButtonsContainer.classList.add("vocabularyButtonsContainer");
  twoButtonsContainer.appendChild(listenButtonOfTheVocabulary);
  vocabularyBoxItself.appendChild(twoButtonsContainer);
  // Listen button
  if (deviceDetector.isMobile) {   listenButtonOfTheVocabulary.addEventListener("touchstart",playButtonF);   }
  else {   listenButtonOfTheVocabulary.addEventListener("mousedown",playButtonF);   }
  let clickOrTouchCount=1;
  function playButtonF(event) { event.preventDefault(); event.stopPropagation();
    // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(listenButtonOfTheVocabulary); // Exists in js_for_the_sliding_navigation_menu
    wavesurfer.setVolume(parent.Howler.volume()); wavesurfer.play();
    if (clickOrTouchCount==1) {
      if (listenAgainButtonTxt) { listenButtonOfTheVocabulary.innerHTML = listenAgainButtonTxt; } // Change button innerHTML from [Listen] to [Listen again]
    }
    if (clickOrTouchCount==2) {
      startButtonToCloseTheVocabulary.classList.add("startButtonUnderWavesurfer"); twoButtonsContainer.appendChild(startButtonToCloseTheVocabulary); // Reveal the [Start] button
    }
    clickOrTouchCount++;
  }
  // Start button
  if (deviceDetector.isMobile) {   startButtonToCloseTheVocabulary.addEventListener("touchstart",startButtonF);   }
  else {   startButtonToCloseTheVocabulary.addEventListener("mousedown",startButtonF);   }
  let lastPointerX, lastPointerY;
  function startButtonF(event) { event.preventDefault(); event.stopPropagation();
    // Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(startButtonToCloseTheVocabulary); // Exists in js_for_the_sliding_navigation_menu
    dismissVocabularySound.play();
    vocabularyBoxItself.style.animationName = "vocabularyWavesurferDisappears";
    vocabularyBoxContainer.style.animationName = "vocabularyWavesurferDisappearsBG";
    setTimeout(function(){  document.body.removeChild(vocabularyBoxContainer);  },501);

    if (deviceDetector.device == "desktop") {
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    } else {
      lastPointerX = event.touches[0].clientX;
      lastPointerY = event.touches[0].clientY;
    }

    if (typeof vocabluaryBoxIsClosed === "function") {
      setTimeout(function () {     vocabluaryBoxIsClosed(lastPointerX,lastPointerY);     }, 500);
    } else { console.error("Error: vocabluaryBoxIsClosed() function doesn't exist???"); }

  }
}
// END OF createAndHandleListenManyTimesBox DEFINITION
