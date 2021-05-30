// All settings here will depend on the content of the lesson

// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3b.txt";
const filePathC = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3c.txt";
const filePathD = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3d.txt";
const filePathE = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3e.txt";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
let textB;
let textC;
let textD;
let textE;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });
fetch(filePathC,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textC = contentOfTheTxtFile; });
fetch(filePathD,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textD = contentOfTheTxtFile; });
fetch(filePathE,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textE = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const say1NaturalPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_fruit_normal.mp3";
const say1Natural = new parent.Howl({  src: [say1NaturalPath]  });
const say1SlowPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_fruit_slow.mp3";
const say1Slow = new parent.Howl({  src: [say1SlowPath]  });
const say2NaturalPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_no_fruit_normal.mp3";
const say2Natural = new parent.Howl({  src: [say2NaturalPath]  });
const say2SlowPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_no_fruit_slow.mp3";
const say2Slow = new parent.Howl({  src: [say2SlowPath]  });
const say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/what_is_that.mp3";
const say3 = new parent.Howl({  src: [say3Path]  });
const say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/it_is_a_fish.mp3";
const say4 = new parent.Howl({  src: [say4Path]  });
const say5Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_a_fish_in_the_water.mp3";
const say5 = new parent.Howl({  src: [say5Path]  });
const loopingBackgroundSound = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_5/lesson_3/waterfall_and_river_loop.mp3']  , loop:true });
const videoSoundTrackThatWillPlayWithClickOrTouch = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_5/lesson_3/state_c_soundtrack.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  videoSoundTrackThatWillPlayWithClickOrTouch.unload();
  loopingBackgroundSound.unload();
  say5.unload();
  say4.unload();
  say3.unload();
  say2Slow.unload();
  say2Natural.unload();
  say1Slow.unload();
  say1Natural.unload();
}

/* ___VISUAL ELEMENTS___ */
const layerOverImg1A = document.getElementById("layerOverImage1A");
const layerOverImg1B = document.getElementById("layerOverImage1B");
const layerOverImg1C = document.getElementById("layerOverImage1C");
const layerOverImg2A = document.getElementById("layerOverImage2A");
const layerOverImg2B = document.getElementById("layerOverImage2B");
const layerOverImg2C = document.getElementById("layerOverImage2C");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  layerOverImg1A.src = onePixelTransparentGif;
  layerOverImg1B.src = onePixelTransparentGif;
  layerOverImg1C.src = onePixelTransparentGif;
  layerOverImg2A.src = onePixelTransparentGif;
  layerOverImg2B.src = onePixelTransparentGif;
  layerOverImg2C.src = onePixelTransparentGif;
}

const postloaderWhitecover = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const postloaderHiddenGlobeInsideWhitecover = document.getElementById('theGlobeInsideTheWhiteOutroID');

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });

function loadingIsCompleteFunction()
{
  // Display notifications if there are any.
  if (parent.theLanguageUserIsLearningNow == "ja") { // SPECIAL CASE ABOUT NEW VOCABULARY when user is learning Hito language
    const filePathForAlertAboutHitoic = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3_special_case_for_ja.txt";
    fetch(filePathForAlertAboutHitoic,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      // Display notification instead of alert(contentOfTheTxtFile);
      createAndHandleNotificationBox();
      putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile;
      // Continue when user clicks or touches OK
      // createAndHandleNotificationBox() will start the lesson 1.5 seconds after the button is clicked
    });
    const pathOfOkCloseTheBox = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-ok_i_understand.txt";
    fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      okButtonToCloseTheNotification.innerHTML = contentOfTheTxtFile;
    });
  }
  else {
    startTheLesson();
  }
}

function startTheLesson()
{
  document.getElementById("likeCameraZoomID").classList.add("addThisClassToStartZoomingInA");
  loopingBackgroundSound.play();
  setTimeout(function () {   goFromAtoB();   },7500);
}

var looping;
let counter = 1;
function goFromAtoB()
{
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB;  },8000);
  layerOverImg1A.style.display = "none";
  layerOverImg2A.style.display = "none";
  layerOverImg1B.style.display = "initial";
  layerOverImg2B.style.display = "initial";
  // Must sync! 19500 ms
  looping = setInterval(loopFunction,39000); // 19500 x 2 = 39000
  function loopFunction() {
    setTimeout(function () {  say1Natural.play();  },1300);
    setTimeout(function () {  say2Natural.play();  },10000);
    setTimeout(function () {  say1Slow.play();  },20800); // 1300+19500 = 20800
    setTimeout(function () {  say2Slow.play();  },29500); // 10000+19500 = 29500
    if (counter == 2) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();

  // Add clickability!
  setTimeout(function () {
    // touchstart is the equivalent of mousedown for mobile
    if (parent.deviceDetector.isMobile) {
      clickableArea.addEventListener("touchstart",goFromBtoC,{once:true});
    } else {
      clickableArea.addEventListener("mousedown",goFromBtoC,{once:true});
    }

  },5000); // IMPORTANT! Timing must be accurate.
}

function goFromBtoC() {
  clearInterval(looping); say1Natural.fade(1,0,1500); say2Natural.fade(1,0,1500); say1Slow.fade(1,0,1500); say2Slow.fade(1,0,1500);
  document.getElementById("likeCameraZoomID").classList.add("addThisClassToStartZoomingInB");
  setTimeout(function () {  say3.play();  },5500);
  setTimeout(function () {  say4.play();  },15000);
  setTimeout(function () {  say5.play();  },18000);
  videoSoundTrackThatWillPlayWithClickOrTouch.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") { parent.navigator.vibrate([18,75,14,75,10]); }
  setTimeout(function () {  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") { parent.navigator.vibrate([18,40,22]); } },5550); // IMPORTANT! Timing must be accurate.
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textC;  },5200);
  setTimeout(function () {  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") { parent.navigator.vibrate([15,111,25,555,15]); } },12000); // IMPORTANT! Timing must be accurate.
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textD;  },15000);
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textE;  },18600);
  clickableArea.style.display = "none";

  layerOverImg1B.style.display = "none";
  layerOverImg2B.style.display = "none";
  layerOverImg1C.style.display = "initial";
  layerOverImg2C.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () {
    loopingBackgroundSound.fade(1,0,2900);
    loopingBackgroundSound.once('fade', function(){      loopingBackgroundSound.stop();       });
  },27500);
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },30000); // -500ms from the end.
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },30250); // -250ms from the end.
  // See js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () {    self.location.href = "../../unit_6/lesson_1/index.html";    },30500);
}
