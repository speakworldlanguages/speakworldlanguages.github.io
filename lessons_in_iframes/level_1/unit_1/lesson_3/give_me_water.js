"use strict";
/* This js file must be DEFERRED to be able to declare consts for elements without DOMContentLoaded */

/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_app_initialization_in_parent to find how savedProgress.ja savedProgress.zh savedProgress.tr savedProgress.ar savedProgress.en are created
const studiedLang = parent.langCodeForTeachingFilePaths;
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_GIVEMEWATER_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

/* __ TEXT TO BE INJECTED INTO EXPLANATION BOX __ */
const explanationPathA = "/user_interface/text/"+userInterfaceLanguage+"/1-1-3a.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
const explanationPathB = "/user_interface/text/"+userInterfaceLanguage+"/1-1-3b.txt"; // The translation of what is being said, to be put into the helpbox/subtitles.
let explanationA = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let explanationB = "…"; // Warning: Without an initial value it returns UNDEFINED before fetch() actually gets the file.
let goodByeMessage = "…";
// OPTIONAL: fetches can happen after window load unless it is an immediate info box to be displayed at the beginning of the lesson
fetch(explanationPathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationA = contentOfTheTxtFile; });
fetch(explanationPathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ explanationB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
let say1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_normal."+parent.audioFileExtension;
let say2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_slow."+parent.audioFileExtension;
let say3Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_normal."+parent.audioFileExtension;
let say4Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_slow."+parent.audioFileExtension;
let say5Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/thank_you."+parent.audioFileExtension;

if (parent.mustUseFemaleConjugationForCommandVerbs) { // See js_for_app_initialization_in_parent
  say1Path = say1Path.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  say2Path = say2Path.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  say3Path = say3Path.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  say4Path = say4Path.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  say5Path = say5Path.split(".")[0] + "_tofemale."+parent.audioFileExtension; // Shukran lak-a lak-e
}
let saySecondSet = false;
const say1 = new parent.Howl({  src: [say1Path]  });
const say2 = new parent.Howl({  src: [say2Path]  });
const say3 = new parent.Howl({  src: [say3Path]  });
const say4 = new parent.Howl({  src: [say4Path]  });
const say5 = new parent.Howl({  src: [say5Path]  });

const hoverSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/hover_on_the_glass."+parent.audioFileExtension]  });
const mouseDownTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/mousedown_touchstart."+parent.audioFileExtension]  });
const disconnectionFromPlateSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/glass_on_porcelain."+parent.audioFileExtension]  });
const draggingTheGlassSound1 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_1."+parent.audioFileExtension] , loop:true });
const draggingTheGlassSound2 = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_2."+parent.audioFileExtension] , loop:true });
const winSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water."+parent.audioFileExtension]  });
/* Sound init code is linked on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
function unloadTheSoundsOfThisLesson() {
  winSound.unload();
  draggingTheGlassSound2.unload();
  draggingTheGlassSound1.unload();
  disconnectionFromPlateSound.unload();
  mouseDownTouchStartSound.unload();
  hoverSound.unload();
  say5.unload();  say4.unload();  say3.unload();  say2.unload();  say1.unload();
}

/* Declare js variables to manipulate the elements */
const main = document.getElementsByTagName('MAIN')[0];
const pictogramDiv1 = document.getElementById("pictogram1DivID");
const movingEyesDiv1 = document.getElementById("movingEyes1DivID");
const theGlassDiv = document.getElementById("theGlassDivID");
const theSvg = document.querySelector(".preciseHoverSvg");
const preciseHoverAndClick = document.getElementById("preciseAreaID");
const niceDownArrowImg = document.getElementById("niceDownArrowImgID");
const niceLeftArrowImg = document.getElementById("niceLeftArrowImgID");
const youMustMoveTheMouseNowImg = document.createElement("IMG");
const aBetterTouchArea = document.querySelector(".touchDetectionArea");
const winAreaDesktopDiv1 = document.querySelector(".winTestOnDesktopHitArea1");
const winAreaDesktopDiv2 = document.querySelector(".winTestOnDesktopHitArea2");
const winAreaMobileDiv1 = document.querySelector(".winTestOnMobileHitArea1");
const winAreaMobileDiv2 = document.querySelector(".winTestOnMobileHitArea2");

window.addEventListener('DOMContentLoaded', whatMustBeDoneAtFirstOnThisDevice, { once: true });
function whatMustBeDoneAtFirstOnThisDevice() {
  if (deviceDetector.device == "desktop") {
    youMustMoveTheMouseNowImg.src = "move_the_mouse.webp";
    youMustMoveTheMouseNowImg.classList.add("youMustMoveTheMouseToContinue");
    aBetterTouchArea.parentNode.removeChild(aBetterTouchArea);
    winAreaMobileDiv1.parentNode.removeChild(winAreaMobileDiv1);
    winAreaMobileDiv2.parentNode.removeChild(winAreaMobileDiv2);
  } else {
    winAreaDesktopDiv1.parentNode.removeChild(winAreaDesktopDiv1);
    winAreaDesktopDiv2.parentNode.removeChild(winAreaDesktopDiv2);
  }
}

let lastRecordedWidth = window.innerWidth; let lastRecordedHeight = window.innerHeight;
window.addEventListener('resize', updateWindowProperties);
function updateWindowProperties() {
  lastRecordedWidth = window.innerWidth; lastRecordedHeight = window.innerHeight; // Update the values
  setTimeout(function () { lastRecordedWidth = window.innerWidth; lastRecordedHeight = window.innerHeight; },100); // Double check
}

/* SET OFF */
window.addEventListener('load', loadingIsCompleteFunction, { once: true });
function loadingIsCompleteFunction() {
  if (parent.langCodeForTeachingFilePaths == "ar") { // Display an info box about gender difference in Arabic.
    const pathOfNotificationAboutMaleFemaleCommand = "/user_interface/text/"+userInterfaceLanguage+"/1-1-3_arabic_male_female.txt";
    fetch(pathOfNotificationAboutMaleFemaleCommand,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      setTimeout(function(){ createAndHandleInfoBoxType1(); putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1 will fire startTheLesson 1.5 seconds after its OK button is clicked/touched
    });
  }
  else {
    startTheLesson(); // Call it now if it was not to be called from within createAndHandleInfoBoxType1() in js_for_all_iframed_lesson_htmls.js
  }
  //--- By the way: Get the goodbye text ready
  const pathOfLessonNoteAboutExpressingGratitude = "/user_interface/text/"+userInterfaceLanguage+"/1-1-3_end_of_lesson_note.txt";
  fetch(pathOfLessonNoteAboutExpressingGratitude,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
    goodByeMessage = contentOfTheTxtFile;
  });
}

function startTheLesson() {
  // User must listen to wavesurfer vocabulary box no matter what language he/she is studying
  const filePathOfTheAudioFile = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give."+parent.audioFileExtension; // In case of "ar" wavesurfer box will play the verb root in male conjugation even if the user is female
  const wavesurferP1P2Path = "/user_interface/text/"+userInterfaceLanguage+"/1-1-3_vocabulary_p1_p2.txt"; // UI lang depends on domain (hostname) » See js_for_every_single_html
  fetch(wavesurferP1P2Path,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  handleP1P2ActualText(contentOfTheTxtFile);  });
  // See js_for_info_boxes_in_lessons » iframe-lesson level
  setTimeout(function(){    createAndHandleListenManyTimesBox(filePathOfTheAudioFile);    },501); // Wait for preloader to disappear or give a brief break after notification
}

function vocabluaryBoxIsClosed(x,y) { // Will fire from within createAndHandleListenManyTimesBox
  let unblurTime;  switch (parent.speedAdjustmentSetting) {  case "slow": unblurTime = 2.0; break;  case "fast": unblurTime = 0.5; break;  default: unblurTime = 1.0;  }
  main.style.transitionDuration = String(unblurTime)+"s";
  main.style.filter = "blur(0px)";
  setTimeout(function () { playPictogramLoop(); }, unblurTime*550);
  // No use for last mouse or touch coordinates: x, y
  waitForFirstTouchOrClickOnGlass(); // Start waiting for a click or touch without waiting for unblur to complete
}
// --- Unique functions for 1-1-3,,, the very first game
function showNiceArrow() {
  if (isWaitingForLaunch) {
    niceDownArrowImg.style.display = "block"; // 72x40ms = 2880ms
    setTimeout(function () {
      niceDownArrowImg.style.display = "none"; resetWebp(niceDownArrowImg);
      niceLeftArrowImg.style.display = "block";
      setTimeout(function () {
        niceLeftArrowImg.style.display = "none"; resetWebp(niceLeftArrowImg);
      }, 3000);
    }, 3000);
  }
}
function makeTranslationHelpBlink() {
  if (deviceDetector.isMobile) {
    let blinker = setInterval(function () { imgInsideTouchableArea.classList.toggle("toggleToMakeItBlink");    }, 350);
    setTimeout(function () {  clearInterval(blinker); imgInsideTouchableArea.classList.remove("toggleToMakeItBlink");    }, 4900);
    setTimeout(function () { toggleTranslationOnMobiles(); }, 1400);
    setTimeout(function () { toggleTranslationOnMobiles(); }, 3500);
  } else {
    let flashTime;  switch (parent.speedAdjustmentSetting) {  case "slow": flashTime = 500; break;  case "fast": flashTime = 150; break;  default: flashTime = 250;  }
    let flasher = setInterval(function () { clickToRevealSubtitlesDiv.classList.toggle("toggleToMakeItFlash"); }, flashTime);
    setTimeout(function () {  clearInterval(flasher); clickToRevealSubtitlesDiv.classList.remove("toggleToMakeItFlash"); }, 6000);
  }
}
let to1,to2,to3,to4,to5,to6,to7,to8,to9,to10,to11,to12,to13,to14;
let loopCounter=1;
function playPictogramLoop() { // Fires when blur has 55% cleared towards focus to open the scene
  let changeTime;  switch (parent.speedAdjustmentSetting) {  case "slow": changeTime = 2400; break;  case "fast": changeTime = 1200; break;  default: changeTime = 1800;  }
  to1 = setTimeout(function(){
    movingEyesDiv1.style.left = "3.2%"; movingEyesDiv1.style.top = "0.3%"; // Moving the eyes looks like rotating the head
    to2 = setTimeout(function(){ // NOTE: Element.children includes only element nodes (i.e. skips comments).
      pictogramDiv1.children[0].style.display = "none"; // a- Natural standing
      pictogramDiv1.children[1].style.display = "block"; // b0- Pointing hand 1 without movement
    },changeTime/5+500); // Arm does its first pointing movement
    to3 = setTimeout(function(){
      pictogramDiv1.children[1].style.display = "none"; // b0- Pointing hand 1 without movement
      pictogramDiv1.children[2].style.display = "block"; // b1- Pointing hand with movement loop 600ms
      to4 = setTimeout(function(){
        pictogramDiv1.children[2].style.display = "none"; // b1- Pointing hand with movement loop 600ms
        pictogramDiv1.children[3].style.display = "block"; // b2- Pointing hand 2 without movement
        to5 = setTimeout(function(){
          movingEyesDiv1.style.left = "0%"; movingEyesDiv1.style.top = "0%";
          to6 = setTimeout(function(){
            pictogramDiv1.children[3].style.display = "none"; // b2- Pointing hand 2 without movement
            pictogramDiv1.children[4].style.display = "block"; // c- Points to himself
            if (loopCounter == 1) { makeTranslationHelpBlink(); }
            to7 = setTimeout(function(){
              pictogramDiv1.children[7].classList.add("fadeIn"); to8 = setTimeout(function(){  pictogramDiv1.children[7].classList.remove("fadeIn");  },601);
              pictogramDiv1.children[7].style.display = "block"; // speech bubble with water droplet
              injectTextIntoTheHelpBoxP.innerHTML = explanationA;

              to9 = setTimeout(talk1,1000);
              function talk1() {
                if (saySecondSet) {  say3.play();       if (loopCounter >= 2) { say3.once("end",showNiceArrow); }       }
                else {  say1.play();                    if (loopCounter >= 2) { say1.once("end",showNiceArrow); }       }
              }
              to10 = setTimeout(function(){
                pictogramDiv1.children[7].style.display = "none"; // speech bubble with water droplet
                pictogramDiv1.children[8].style.display = "block"; // speech bubble with hand gesture give me
                to11 = setTimeout(talk2,1000);
                function talk2() {
                  if (saySecondSet) {  say4.play();     if (loopCounter >= 3) { say4.once("end",showNiceArrow); }       }
                  else {  say2.play();                  if (loopCounter >= 3) { say2.once("end",showNiceArrow); }       }
                }
                to12 = setTimeout(function(){
                  pictogramDiv1.children[4].style.display = "none"; // c- Pointing to himself
                  pictogramDiv1.children[0].style.display = "block"; // a- Natural standing
                  to13 = setTimeout(function(){
                    pictogramDiv1.children[8].classList.add("fadeOut");
                    to14 = setTimeout(function(){
                      pictogramDiv1.children[8].classList.remove("fadeOut"); pictogramDiv1.children[8].style.display = "none";
                      saySecondSet = !saySecondSet; // Toggle between first set of says and second set of says
                      injectTextIntoTheHelpBoxP.innerHTML = "…";
                      if (loopCounter<5) { playPictogramLoop(); }
                      loopCounter++;
                    },601); // back to start
                  },((changeTime*2)+1600)); // speech bubble disappears
                },(changeTime+1000)); // to idle stance while hands-give-me plays
              },(changeTime+3300)); // from droplet to hands-give-me
            },(changeTime/2)); // droplet in bubble appears
          },350); // Let the arm wait for the eyes
        },(changeTime+100));  // From pointing 2 to pointing to the self
      },(changeTime-100)); // From pointing loop to pointing 2
    },(changeTime+100)); // From pointing 1 to pointing loop
  },(changeTime+500)); // From idle-stand to pointing 1
}

function waitForFirstTouchOrClickOnGlass() {
  draggingTheGlassSound1.volume(0); draggingTheGlassSound1.play();
  draggingTheGlassSound2.volume(0); draggingTheGlassSound2.play();
  /*---*/
  if (deviceDetector.isMobile) {
    main.addEventListener("touchstart",checkIfGlassHasBeenTouchedOnMobile); // Use elementFromPoint so that touchmove is easy to handle
    window.addEventListener("touchstart",lockOrientation,{ once:true }); // Will unlock with onbeforeunload » See js_for_all_iframed_lesson_htmls
  } else {
    preciseHoverAndClick.addEventListener("mousedown",glassHasBeenClickedOnDesktop,{ once:true });
    preciseHoverAndClick.addEventListener("mouseenter",glassHasBeenHoveredDesktop);
    preciseHoverAndClick.addEventListener("mouseleave",glassHasBeenUnhoveredDesktop);
  }
}

let pointerToLeft=0, pointerToTop=0; // pixels
let deltaX = 0, deltaY = 0; // vw vh
let newX = 0, newY = 0; // vw vh
let detectMouseStopOrTouchStop;
let firstDragSoundVolumeShouldBe = 1;
let secondDragSoundVolumeShouldBe = 0;
let isWaitingForLaunch = true; // disconnectionFromPlateSound
// let winAlreadyHappened = false;

function turnUpDragSoundVolume() { // This UNWANTEDLY fires one or two times after WIN happens on mousemove because of 300ms delay by setTimeout for detecting mousestop
  draggingTheGlassSound1.fade(0,firstDragSoundVolumeShouldBe,100); // To deal with that use stop() to stop the sounds as soon as WIN happens
  /*if (!winAlreadyHappened) { // Without stop() and only using volume(0) we used to prevent it the hard way like
    draggingTheGlassSound1.fade(0,1,100);
  }*/
  // const v = Number(secondDragSoundVolumeShouldBe.toFixed(2)); // Can't fade! It has to start immediately
  // draggingTheGlassSound2.fade(0,v,100); // Can't fade! It has to start immediately
}
function turnDownDragSoundVolume() {
  const v1 = Number(firstDragSoundVolumeShouldBe.toFixed(2));
  draggingTheGlassSound1.fade(v1,0,500);
  const v2 = Number(secondDragSoundVolumeShouldBe.toFixed(2));
  draggingTheGlassSound2.fade(v2,0,200);
  if (deviceDetector.isMobile) {
    // Let's do » From soundA to soundB instead of soundA plus increasingly more soundB on mobiles
  } else {
    // DIFFERENCE BETWEEN DESKTOP AND MOBILE GAME: There is no releasing the glass (NO MOUSEUP EVENT) on desktop
    main.addEventListener("mousemove",turnUpDragSoundVolume,{ once:true }); // Continue the on off cycle on desktop
  }
}

/* -- MOBILE -- MOBILE -- MOBILE -- */
let theFirstEverTouchIsYetToHappen = true;
function checkIfGlassHasBeenTouchedOnMobile(event) { event.preventDefault();
  pointerToLeft = event.touches[0].clientX;
  pointerToTop = event.touches[0].clientY;
  const elem = document.elementFromPoint(pointerToLeft,pointerToTop); // x,y
  if (elem == aBetterTouchArea) {
    event.stopPropagation(); // Disable interaction with sliding nav menu
    if (theFirstEverTouchIsYetToHappen) {
      setTimeout(function () { disconnectionFromPlateSound.play(); }, 250); // On mobile play this only once after touchstart,,, on desktop play only with first little mousemove
      isWaitingForLaunch = false; // Will never return back to plate
    }
    theFirstEverTouchIsYetToHappen = false;
    // EXPECTED TOUCH IS HAPPENING
    mouseDownTouchStartSound.play();
    if (canVibrate) { navigator.vibrate(8); }
    // MOVE THE GLASS TO TOUCH COORDINATES IMMEDIATELY
    theGlassDiv.className = "glassContainerWithFirstTouch";
    theGlassDiv.style.marginLeft = String(pointerToLeft) +"px";
    theGlassDiv.style.marginTop = String(pointerToTop) + "px";
    theGlassDiv.style.transform = "translate(-50%,-160%) scale(1.25)";
    setTimeout(function () { theGlassDiv.classList.add("startDoingTransitions"); },201); // Must be delayed otherwise it will start animating from top:0 left:0
    // Add visual niceness with a glow
    aBetterTouchArea.style.opacity = "0.45";
    // GET READY TO UPDATE GLASS POSITION
    main.addEventListener("touchmove",moveTheGlassWithFinger);
    main.addEventListener("touchend",leaveTheGlassWhereItWas,{ once:true });
    //---
    //Use stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(elem); // Hides the nav menu until touchend » See js_for_the_sliding_navigation_menu instead
  }
}
function moveTheGlassWithFinger(event) {

  pointerToLeft = event.changedTouches[0].clientX;
  pointerToTop = event.changedTouches[0].clientY;
  theGlassDiv.style.marginLeft = String(pointerToLeft) +"px";
  theGlassDiv.style.marginTop = String(pointerToTop) + "px";
  /*---*/
  if (detectMouseStopOrTouchStop) { clearTimeout(detectMouseStopOrTouchStop); }
  detectMouseStopOrTouchStop = setTimeout(turnDownDragSoundVolume, 100);
  /*---*/
  secondDragSoundVolumeShouldBe  = (lastRecordedWidth-pointerToLeft)/lastRecordedWidth; // Linearly from 0 to 1
  if (secondDragSoundVolumeShouldBe <= 0.25) { secondDragSoundVolumeShouldBe = 0; }
  else if (secondDragSoundVolumeShouldBe > 0.25 && secondDragSoundVolumeShouldBe < 0.75) {
    secondDragSoundVolumeShouldBe = (secondDragSoundVolumeShouldBe - 0.25)*2; // 0.25 is ZERO volume,,, 0.75 is FULL volume
  } else { secondDragSoundVolumeShouldBe = 1; }
  draggingTheGlassSound2.volume(Number(secondDragSoundVolumeShouldBe.toFixed(2)));
  firstDragSoundVolumeShouldBe = 1-secondDragSoundVolumeShouldBe; // MAKE THEM OPPOSITE SOUNDS
  draggingTheGlassSound1.volume(Number(firstDragSoundVolumeShouldBe.toFixed(2)));
  /*---*/
  checkForWinningConditionMobile(pointerToLeft,pointerToTop);
}
function leaveTheGlassWhereItWas(event) { event.preventDefault(); event.stopPropagation(); // Do not let sliding nav menu sense the touchend
  if (canVibrate) { navigator.vibrate([9,100,8,62,7]); }
  hoverSound.play(); // Make use of mouseenter sound by reassigning it as touchend sound
  aBetterTouchArea.style.opacity = "0";
  main.removeEventListener("touchmove",moveTheGlassWithFinger);
  //setTimeout(function () { main.removeEventListener("touchmove",moveTheGlassWithFinger); },111); // Double check
  theGlassDiv.style.transform = "translate(-50%,-75%) scale(1)";
}

/* -- DESKTOP -- DESKTOP -- DESKTOP -- */
function glassHasBeenHoveredDesktop() {  hoverSound.play();  theSvg.style.opacity = "0.3";  }
function glassHasBeenUnhoveredDesktop() {  theSvg.style.opacity = "0";  }

function glassHasBeenClickedOnDesktop(event) {

  preciseHoverAndClick.removeEventListener("mouseenter",glassHasBeenHoveredDesktop);
  preciseHoverAndClick.removeEventListener("mouseleave",glassHasBeenUnhoveredDesktop);
  mouseDownTouchStartSound.play();
  main.classList.remove("defaultCursor");
  main.classList.add("noCursor"); // It works
  pointerToLeft = event.clientX; // Luckily instead of relative coords within polygon, it returns absolute coords wrt window
  pointerToTop = event.clientY; // Luckily instead of relative coords within polygon, it returns absolute coords wrt window
  main.addEventListener("mousemove",updateRelativeGlassPositionUnlessWindowIsResized);
  main.addEventListener("mousemove",turnUpDragSoundVolume,{ once:true }); // Start the on off cycle
  window.addEventListener('resize', changeTheClassForever,{ once:true });
  window.addEventListener('resize', resetCoordinatesEtc);
}

function updateRelativeGlassPositionUnlessWindowIsResized(event) {
  if (isWaitingForLaunch) {
    setTimeout(function () { disconnectionFromPlateSound.play(); }, 250);

    isWaitingForLaunch = false; // Will never return back to plate
  }
  deltaX = (pointerToLeft - event.clientX)*100/lastRecordedWidth;
  deltaY = (pointerToTop - event.clientY)*100/lastRecordedHeight;
  pointerToLeft = event.clientX;
  pointerToTop = event.clientY;
  newX += deltaX;
  newY += deltaY;
  theGlassDiv.style.marginRight = newX.toFixed(1) + "vw";
  theGlassDiv.style.marginBottom = newY.toFixed(1) + "vh";
  /*---*/
  if (detectMouseStopOrTouchStop) { clearTimeout(detectMouseStopOrTouchStop); }
  detectMouseStopOrTouchStop = setTimeout(turnDownDragSoundVolume, 300);
  /*---*/
  // SET AS: newX 15:zero-volume,,,newX 60:full-volume
  if (newX<=15) { secondDragSoundVolumeShouldBe = 0; }
  else if (newX>15 && newX<60) {  secondDragSoundVolumeShouldBe = Math.pow((newX - 15)/45, 2);  } // Nice curve instead of linear
  else { secondDragSoundVolumeShouldBe = 1; }
  draggingTheGlassSound2.volume(Number(secondDragSoundVolumeShouldBe.toFixed(2))); // CAREFUL! toFixed(1) is not PRECISE ENOUGH
  /*---*/
  checkForWinningConditionDesktop(pointerToLeft,pointerToTop); // Pass mouse coordinates
}

function changeTheClassForever() {
  theGlassDiv.className = "glassContainerOnceResizeHappens"; // Better than classList in this case?
}
function resetCoordinatesEtc() {
  main.removeEventListener("mousemove",updateRelativeGlassPositionUnlessWindowIsResized); // Cancel first method
  main.removeEventListener("mousemove",updateAbsoluteGlassPositionBecauseWindowIsResized); // Bypass second method temporarily in case it was ON already
  theGlassDiv.style.visibility = "hidden"; // Hide the glass random position nonsense for a moment
  setTimeout(function () {
    document.body.appendChild(youMustMoveTheMouseNowImg); // Show YOU MUST MOVE THE MOUSE img
    main.addEventListener("mousemove",resetInitialPointASAP, { once: true }); // Initialize second method
  },200); // Make sure we get the actual window dimensions
}
function resetInitialPointASAP(event) {
  document.body.removeChild(youMustMoveTheMouseNowImg); // Hide YOU MUST MOVE THE MOUSE img
  theGlassDiv.style.margin = "0"; // Reset margin
  /*deltaX = 0; deltaY = 0;*/ // pointerToLeft = 0; pointerToTop = 0;
  newX = (event.clientX)*100/lastRecordedWidth; newY = (event.clientY)*100/lastRecordedHeight; // Set new location
  theGlassDiv.style.marginLeft = newX.toFixed(1) + "vw"; // Move to new location
  theGlassDiv.style.marginTop = newY.toFixed(1) + "vh"; // Move to new location
  theGlassDiv.style.visibility = "visible"; // Display the glass at good coordinates
  main.addEventListener("mousemove",updateAbsoluteGlassPositionBecauseWindowIsResized);
  main.addEventListener("mousemove",turnUpDragSoundVolume,{ once:true }); // Restart the on off cycle
}
function updateAbsoluteGlassPositionBecauseWindowIsResized() {
  newX = (event.clientX)*100/lastRecordedWidth; newY = (event.clientY)*100/lastRecordedHeight; // Set new location
  theGlassDiv.style.marginLeft = newX.toFixed(1) + "vw"; // Move to new location
  theGlassDiv.style.marginTop = newY.toFixed(1) + "vh"; // Move to new location
  /*---*/
  if (detectMouseStopOrTouchStop) { clearTimeout(detectMouseStopOrTouchStop); }
  detectMouseStopOrTouchStop = setTimeout(turnDownDragSoundVolume, 300);
  /*---*/
  // SET AS: newX 75:zero-volume,,,newX 25:full-volume
  if (newX>=75) { secondDragSoundVolumeShouldBe = 0; }
  else if (newX<75 && newX>25) {    secondDragSoundVolumeShouldBe = Math.pow((75 - newX)/50, 2);  } // Nice curve instead of linear
  else { secondDragSoundVolumeShouldBe = 1; }
  draggingTheGlassSound2.volume(Number(secondDragSoundVolumeShouldBe.toFixed(2)));
  /*---*/
  pointerToLeft = event.clientX; pointerToTop = event.clientY;
  checkForWinningConditionDesktop(pointerToLeft,pointerToTop); // Pass mouse coordinates
}

function checkForWinningConditionDesktop(x,y) {
  const elem = document.elementFromPoint(x,y);
  if (elem == winAreaDesktopDiv1 || elem == winAreaDesktopDiv2) { // Works OK
    // Win happened
    // winAlreadyHappened = true;
    // console.log("WIN");
    // Remove all mousemove listeners
    main.removeEventListener("mousemove",updateRelativeGlassPositionUnlessWindowIsResized);
    main.removeEventListener("mousemove",updateAbsoluteGlassPositionBecauseWindowIsResized);
    // Turn off Drag sound and don't let it restart

    // Remove other in-game listeners
    window.removeEventListener('resize', changeTheClassForever);
    window.removeEventListener('resize', resetCoordinatesEtc);
    // Finalize
    whatToDoWhenWinHappens();
  }
}
function checkForWinningConditionMobile(x,y) {
  const elem = document.elementFromPoint(x,y);
  if (elem == winAreaMobileDiv1 || elem == winAreaMobileDiv2) {
    // Win happened
    setTimeout(function () {  if (canVibrate) { navigator.vibrate([20,125,20,125,20,125,250]); }  },600);
    // winAlreadyHappened = true;
    // Remove event listeners
    main.removeEventListener("touchmove",moveTheGlassWithFinger);
    main.removeEventListener("touchend",leaveTheGlassWhereItWas);
    // Finalize
    whatToDoWhenWinHappens();
  }
}

function whatToDoWhenWinHappens() {
  // End dragging sound,,, NOTE volume(0) won't be able to deal with half complete fades
  draggingTheGlassSound1.stop(); draggingTheGlassSound2.stop();
  // Stop talking in case "was talking"
  say1.stop(); say2.stop(); say3.stop(); say4.stop();
  // Hide dragged glass
  if (deviceDetector.isMobile) {
    setTimeout(function () { theGlassDiv.parentNode.removeChild(theGlassDiv); }, 80); // Cannot do transform animation on mobile because it is already used up
  } else {
    theGlassDiv.classList.add("noMoreFlyingGlass");
  }


  // Play win sound etc
  winSound.play();
  // Camera zoom effect DOESN'T TASTE GOOD in this case

  // Switch to win img
  clearTimeout(to1); clearTimeout(to2); clearTimeout(to3); clearTimeout(to4); clearTimeout(to5); clearTimeout(to6); clearTimeout(to7);
  clearTimeout(to8); clearTimeout(to9); clearTimeout(to10); clearTimeout(to11); clearTimeout(to12); clearTimeout(to13); clearTimeout(to14);
  setTimeout(function () {
    pictogramDiv1.children[0].style.display = "none";
    pictogramDiv1.children[1].style.display = "none";
    pictogramDiv1.children[2].style.display = "none";
    pictogramDiv1.children[3].style.display = "none";
    pictogramDiv1.children[4].style.display = "none";
    pictogramDiv1.children[7].style.display = "none";
    pictogramDiv1.children[8].style.display = "none";
    pictogramDiv1.children[5].style.display = "block";
    // Either reset "eyes" if were looking away or redraw state_d with happy eyes and hide the "eyes" layer that was showing so far
    movingEyesDiv1.parentNode.removeChild(movingEyesDiv1);
  },100); // Wait 100ms to allow visibility = "hidden" on glass to take effect in case CPU is weak or was busy

  // Say thank_you
  let proceedTime;  switch (parent.speedAdjustmentSetting) {  case "slow": proceedTime = 5000; break;  case "fast": proceedTime = 2000; break;  default: proceedTime = 3500;  }
  setTimeout(expressGratitude,proceedTime);
  function expressGratitude() {
    pictogramDiv1.children[5].style.display = "none";
    pictogramDiv1.children[6].style.display = "block";
    say5.play();
    injectTextIntoTheHelpBoxP.innerHTML = explanationB; // Thank you translation
  }

  setTimeout(function () {  main.classList.remove("noCursor");  main.classList.add("defaultCursor");  }, proceedTime*1.6+1600);  // Back to normal cursor
  setTimeout(displayNoteAtTheEndOfLesson,proceedTime*1.8+3500);
  function displayNoteAtTheEndOfLesson() {
      // See js_for_info_boxes_in_lessons.js
      createAndHandleInfoBoxType1("amid").then(function(){ goToTheNextLesson(); });
      putNotificationTxtIntoThisP.innerHTML = goodByeMessage; // This line must come after calling createAndHandleInfoBoxType1() otherwise putNotificationTxtIntoThisP will be undefined
  }
  // Finally go to next lesson when [OK] is touched or clicked
  function goToTheNextLesson() {
    setTimeout(function () {
      showPreloaderBeforeExit(); // 1500ms » See js_for_all_iframed_lesson_htmls AND See css_for_preloader_and_orbiting_circles
      setTimeout(function () {   parent.ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_4/index.html";   }, 1500);
    },proceedTime/7+250); // Let dialog box disappear completely before preloader starts appearing
  }
  /* Save progress */
  parent.savedProgress[studiedLang].lesson_GIVEMEWATER_IsCompleted=true; // WATCH THE NAME OF THE LESSON!!!
  parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
  localStorage.setItem("memoryCard", parent.saveJSON); // Save
}
