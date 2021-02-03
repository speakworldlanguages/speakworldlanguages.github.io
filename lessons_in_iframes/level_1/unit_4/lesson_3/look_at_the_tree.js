// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3b.txt";
const filePathC = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3c.txt";
const filePathD = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3d.txt";
const filePathE = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-4-3e.txt";
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
const say1NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/look_at_the_tree_normal.mp3";
const say1Natural = new parent.Howl({  src: [say1NaturalPath]  });
const say1SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/look_at_the_tree_slow.mp3";
const say1Slow = new parent.Howl({  src: [say1SlowPath]  });
const say2NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/there_is_a_bird_normal.mp3";
const say2Natural = new parent.Howl({  src: [say2NaturalPath]  });
const say2SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/there_is_a_bird_in_the_tree_slow.mp3";
const say2Slow = new parent.Howl({  src: [say2SlowPath]  });
const say3NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/listen_normal.mp3";
const say3Natural = new parent.Howl({  src: [say3NaturalPath]  });
const say3SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_4/lesson_3/listen_to_the_bird_slow.mp3";
const say3Slow = new parent.Howl({  src: [say3SlowPath]  });
const clickTone1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/click_on_tree.mp3'] });
const clickTone2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/bird_tweet_tweet.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_4/lesson_3/state_g_soundtrack.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  videoSoundTrack.unload();
  clickTone2.unload();
  clickTone1.unload();
  say3Slow.unload();
  say3Natural.unload();
  say2Slow.unload();
  say2Natural.unload();
  say1Slow.unload();
  say1Natural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const layerOverImgA = document.getElementById("layerOverImageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");
const imgF = document.getElementById("imageF");
const imgG = document.getElementById("imageG");
const layerOverImgG = document.getElementById("layerOverImageG");
const imgBackground1 = document.getElementById("background1");
const imgBackground2 = document.getElementById("background2");

const clickableArea1 = document.getElementById("idOfTheLittleInvisibleClickableDiv1");
const clickableArea2 = document.getElementById("idOfTheLittleInvisibleClickableDiv2");
const clickableArea3 = document.getElementById("idOfTheLittleInvisibleClickableDiv3");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  layerOverImgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
  imgF.src = onePixelTransparentGif;
  imgG.src = onePixelTransparentGif;
  layerOverImgG.src = onePixelTransparentGif;
  imgBackground1.src = onePixelTransparentGif;
  imgBackground2.src = onePixelTransparentGif;
}

const postloaderWhitecover = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const postloaderHiddenGlobeInsideWhitecover = document.getElementById('theGlobeInsideTheWhiteOutroID');

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
let looping1;
let counter1 = 1;
function loadingIsCompleteFunction() {
  // No need to sync. The timing must just feel nice enough.
  function loopFunction1() {
    setTimeout(function () {  say1Natural.play();  },2500);
    setTimeout(function () {  say1Slow.play();  },8500);
    if (counter1 == 3) {  clearInterval(looping1);  }
    counter1++;
  }
  loopFunction1();
  looping1 = setInterval(loopFunction1,14000);
  // Add clickability!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (parent.deviceDetector.isMobile) {
        clickableArea1.addEventListener("touchstart",goFromAtoB,{once:true});
      } else {
        clickableArea1.addEventListener("mousedown",goFromAtoB,{once:true});
      }
   },5000);
}

function goFromAtoB() {
  clearInterval(looping1); say1Natural.fade(1,0,1500); say1Slow.fade(1,0,1500);
  clickableArea1.style.display = "none"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  clickTone1.play();
  parent.navigator.vibrate([10,40,10]);
  imgA.style.display = "none";
  layerOverImgA.style.display = "none";
  imgB.style.display = "initial";
  setTimeout(function () {  goFromBtoC();  },2100); // IMPORTANT! Timing must be accurate.
}

function goFromBtoC() {
  imgBackground1.style.display = "none";
  imgBackground2.style.display = "initial";
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(function () {  goFromCtoD();  },2000); // IMPORTANT! Timing must be accurate.
}
let looping2;
let counter2 = 1;
function goFromCtoD() {
  setTimeout(function () {   putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB;   },2500);
  setTimeout(function () {   putTranslationIntoThisHelpAreaFromFileP.innerHTML = textC;   },7500);
  imgC.style.display = "none";
  imgD.style.display = "initial";
  // Loop 2
  function loopFunction2() {
    setTimeout(function () {  say2Natural.play();  },2200);
    setTimeout(function () {  say2Slow.play();  },7700);
    if (counter2 == 3) {  clearInterval(looping2);  }
    counter2++;
  }
  loopFunction2();
  looping2 = setInterval(loopFunction2,19500);
  // Add clickability!
  clickableArea2.style.display = "initial"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (parent.deviceDetector.isMobile) {
        clickableArea2.addEventListener("touchstart",goFromDtoE,{once:true});
      } else {
        clickableArea2.addEventListener("mousedown",goFromDtoE,{once:true});
      }
   },5000);
}

function goFromDtoE() {
  clearInterval(looping2); say2Natural.fade(1,0,1500); say2Slow.fade(1,0,1500);
  clickableArea2.style.display = "none"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
  clickTone2.play();
  imgD.style.display = "none";
  imgE.style.display = "initial";
  setTimeout(function () {  goFromEtoF();  },3000); // IMPORTANT! Timing must be accurate.
}
let looping3;
let counter3 = 1;
function goFromEtoF() {
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textD;  },4000);
  setTimeout(function () {  putTranslationIntoThisHelpAreaFromFileP.innerHTML = textE;  },8500);
  imgE.style.display = "none";
  imgF.style.display = "initial";
  // Loop 3
  function loopFunction3() {
    setTimeout(function () {  say3Natural.play();  },4000);
    setTimeout(function () {  say3Slow.play();  },8000);
    if (counter3 == 3) {  clearInterval(looping3);  }
    counter3++;
  }
  loopFunction3();
  looping3 = setInterval(loopFunction3,15000);
  // Add clickability!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      clickableArea3.style.display = "initial"; // NOTICE: Yes, these divs are already invisible yet we still have to add/remove them because when they overlap the lower z-indexed ones are blocked and user can't click.
      if (parent.deviceDetector.isMobile) {
        clickableArea3.addEventListener("touchstart",goFromFtoG,{once:true});
      } else {
        clickableArea3.addEventListener("mousedown",goFromFtoG,{once:true});
      }
   },5000);
}

function goFromFtoG() {
  clearInterval(looping3); say3Natural.fade(1,0,1500); say3Slow.fade(1,0,1500);
  imgBackground2.style.display = "none";
  imgBackground1.style.display = "initial";
  imgF.style.display = "none";
  imgG.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  layerOverImgG.style.display = "initial";
  videoSoundTrack.play();
  setTimeout(function () { parent.navigator.vibrate([13,333,10,333,8,333,7]);   },16500);  // Exact number of milliseconds from webp
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },21000); // -500ms from the end.
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },21250); // -250ms from the end.
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson(); },21400); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () { self.location.href = "../../unit_5/lesson_1/index.html";  },21500);
}
