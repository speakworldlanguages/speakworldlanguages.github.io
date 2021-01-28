// All settings here will depend on the content of the lesson
if (parent.theLanguageUserIsLearningNow == "ja") { // SPECIAL CASE ABOUT NEW VOCABULARY when user is learning Hito language
  const filePathForAlertAboutHitoic = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-5-3_special_case_for_ja.txt";
  fetch(filePathForAlertAboutHitoic,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ alert(contentOfTheTxtFile); });
}

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
const say1NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_fruit_normal.ogg";
const say1Natural = new parent.Howl({  src: [say1NaturalPath]  });
const say1SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_fruit_slow.ogg";
const say1Slow = new parent.Howl({  src: [say1SlowPath]  });
const say2NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_no_fruit_normal.ogg";
const say2Natural = new parent.Howl({  src: [say2NaturalPath]  });
const say2SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_no_fruit_slow.ogg";
const say2Slow = new parent.Howl({  src: [say2SlowPath]  });
const say3Path = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/what_is_that.ogg";
const say3 = new parent.Howl({  src: [say3Path]  });
const say4Path = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/it_is_a_fish.ogg";
const say4 = new parent.Howl({  src: [say4Path]  });
const say5Path = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_5/lesson_3/there_is_a_fish_in_water.ogg";
const say5 = new parent.Howl({  src: [say5Path]  });
const loopingBackgroundSound = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_5/lesson_3/waterfall_and_river_loop.ogg']  , loop:true });
const videoSoundTrackThatWillPlayWithClickOrTouch = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_5/lesson_3/state_c_soundtrack.ogg'] });
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

function loadingIsCompleteFunction() {
  document.getElementById("likeCameraZoomID").classList.add("addThisClassToStartZoomingInA");
  loopingBackgroundSound.play();
  setTimeout(function () {

   goFromAtoB();

  },7500);
}
let looping;
let counter = 1;
function goFromAtoB() {
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB;  },8000);
  layerOverImg1A.style.display = "none";
  layerOverImg2A.style.display = "none";
  layerOverImg1B.style.display = "initial";
  layerOverImg2B.style.display = "initial";
  // Must sync! 19500 ms
  function loopFunction1() {
    setTimeout(function () {  say1Natural.play();  },1300);
    setTimeout(function () {  say2Natural.play();  },10000);
    setTimeout(function () {  say1Slow.play();  },1300+19500);
    setTimeout(function () {  say2Slow.play();  },10000+19500);
    if (counter == 2) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction1();
  looping = setInterval(loopFunction1,19500*2);
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
  parent.navigator.vibrate([10,75,10,75,10]);
  setTimeout(function () {  parent.navigator.vibrate([17]);  },5550); // IMPORTANT! Timing must be accurate.
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textC;  },5200);
  setTimeout(function () {  parent.navigator.vibrate([11,111,15,555,15]);  },12000); // IMPORTANT! Timing must be accurate.
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
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson(); },30400); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () {    self.location.href = "../../unit_6/lesson_1/index.html";    },30500);
}
