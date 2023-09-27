"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent



/* __ SAVE PROGRESS TO LOCAL STORAGE __ */
// See js_for_the_parent_all_browsers_all_devices to find how savedProgress.ja savedProgress.zh savedProgress.tr etc are created
const studiedLang = parent.langCodeForTeachingFilePaths.substr(0,2); // en_east en_west will use the same save-slot
// !!! VERY CAREFUL: Watch the lesson name!!!
parent.savedProgress[studiedLang].lesson_PRIMARYCOLORS_IsViewed=true; // Create and add... or overwrite the same thing
parent.saveJSON = JSON.stringify(parent.savedProgress); // Convert
localStorage.setItem("memoryCard", parent.saveJSON); // Save

// All settings here will depend on the content of the lesson
let answerWhite,answerGreen,answerBlue,answerYellow,answerRed,answerBlack; // Get them from txt files
// CAUTION: parent.langCodeForTeachingFilePaths variable depends on localStorage data being available. See js_for_the_parent_all_browsers_all_devices.js
const filePathForWhite  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-white.txt";
const filePathForGreen  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-green.txt";
const filePathForBlue   = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-blue.txt";
const filePathForYellow = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-yellow.txt";
const filePathForRed    = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-red.txt";
const filePathForBlack  = "/speech_recognition_answer_key/"+parent.langCodeForTeachingFilePaths+"/1-3-4-black.txt";
// See js_for_every_single_html.js for the headers setting.
fetch(filePathForWhite, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerWhite  = contentOfTheTxtFile; });
fetch(filePathForGreen, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerGreen  = contentOfTheTxtFile; });
fetch(filePathForBlue,  myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerBlue   = contentOfTheTxtFile; });
fetch(filePathForYellow,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerYellow = contentOfTheTxtFile; });
fetch(filePathForRed,   myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerRed    = contentOfTheTxtFile; });
fetch(filePathForBlack, myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ answerBlack  = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const sayWhite1Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_1."+soundFileFormat;
const sayGreen1Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_1."+soundFileFormat;
const sayBlue1Path   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_1."+soundFileFormat;
const sayYellow1Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_1."+soundFileFormat;
const sayRed1Path    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_1."+soundFileFormat;
const sayBlack1Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_1."+soundFileFormat;
const sayWhite1  = new parent.Howl({ src: [sayWhite1Path]  });
const sayGreen1  = new parent.Howl({ src: [sayGreen1Path]  });
const sayBlue1   = new parent.Howl({ src: [sayBlue1Path]   });
const sayYellow1 = new parent.Howl({ src: [sayYellow1Path] });
const sayRed1    = new parent.Howl({ src: [sayRed1Path]    });
const sayBlack1  = new parent.Howl({ src: [sayBlack1Path]  });

const sayWhite2Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/white_2."+soundFileFormat;
const sayGreen2Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/green_2."+soundFileFormat;
const sayBlue2Path   = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/blue_2."+soundFileFormat;
const sayYellow2Path = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/yellow_2."+soundFileFormat;
const sayRed2Path    = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/red_2."+soundFileFormat;
const sayBlack2Path  = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_4/black_2."+soundFileFormat;
const sayWhite2  = new parent.Howl({ src: [sayWhite2Path]  });
const sayGreen2  = new parent.Howl({ src: [sayGreen2Path]  });
const sayBlue2   = new parent.Howl({ src: [sayBlue2Path]   });
const sayYellow2 = new parent.Howl({ src: [sayYellow2Path] });
const sayRed2    = new parent.Howl({ src: [sayRed2Path]    });
const sayBlack2  = new parent.Howl({ src: [sayBlack2Path]  });

const finalWinSound = new parent.Howl({  src: ["/user_interface/sounds/success1b."+soundFileFormat]  });

/* Sound initialization happens on the parent but the consts exist in frame. SEE js_for_all_iframed_lesson_htmls » FIND onbeforeunload. */
// listOfAllSoundsInThisLesson is also used by pauseTheAppFunction in js_for_the_sliding_navigation_menu
var listOfAllSoundsInThisLesson = [
  //finalWinSound, // EXCEPTION: See unloadThatLastSoundWhichCannotBeUnloadedNormally
  sayBlack2,sayRed2,sayYellow2,sayBlue2,sayGreen2,sayWhite2,
  sayBlack1,sayRed1,sayYellow1,sayBlue1,sayGreen1,sayWhite1,
];
function unloadTheSoundsOfThisLesson() { // See onbeforeunload in js_for_all_iframed_lesson_htmls
  for (let i = 0; i < listOfAllSoundsInThisLesson.length; i++) {
      const snd = listOfAllSoundsInThisLesson[i]; snd.unload();
  }
  parent.unloadThatLastSoundWhichCannotBeUnloadedNormally(finalWinSound); // Exists in js_for_navigation_handling,,, unloads the sound after 5s
}


/* __CONTAINER DIVS__ */
// Use if needed » const main = document.getElementsByTagName('MAIN')[0];
const fullVpDarkBlue = document.getElementById('fullVpDarkBlueDivID');
const containerOfSingles = document.getElementById('singlesDivID');
const allSingles = containerOfSingles.children; // Use children instead of childNodes to ignore HTML comments
const containerOfTheWholeGame = document.getElementById('allOfTheGameDivID');
const allMemoryPieces = document.querySelectorAll(".containerForOneOfSixPieces");; // Use children instead of childNodes to ignore HTML comments

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
}

function startTheLesson()
{
  // White is the first color then comes green » blue » yellow » red » black
  new SuperTimeout(showGreen, 1500);
}

function showGreen() {
  allSingles[0].style.visibility = "hidden";
  allSingles[1].style.visibility = "visible"; // Sudden change actually looks good in this case
  new SuperTimeout(showBlue, 1000);
}

function showBlue() {
  allSingles[1].style.visibility = "hidden";
  allSingles[2].style.visibility = "visible"; // Sudden change actually looks good in this case
  new SuperTimeout(showYellow, 1000);
}

function showYellow() {
  allSingles[2].style.visibility = "hidden";
  allSingles[3].style.visibility = "visible"; // Sudden change actually looks good in this case
  new SuperTimeout(showRed, 1000);
}

function showRed() {
  allSingles[3].style.visibility = "hidden";
  allSingles[4].style.visibility = "visible"; // Sudden change actually looks good in this case
  new SuperTimeout(showBlack, 1000);
}

function showBlack() {
  allSingles[4].style.visibility = "hidden";
  allSingles[5].style.visibility = "visible"; // Sudden change actually looks good in this case
  new SuperTimeout(bringTheGameToTheScene, 1000);
}

function bringTheGameToTheScene() {
  containerOfSingles.classList.add("moveUpAndGoBeyondScreenLimit");
  //disperse();
  containerOfTheWholeGame.classList.add("moveUpAndComeToTheCenterOfScreen");
  setTimeout(function () {
    disperse();
    //sendTheCardsToTheirNewPositions();
  }, 3000);
  setTimeout(function () {
    undoTheDispersion();
  }, 5000);
  setInterval(function () {
    sendTheCardsToTheirNewPositions();
  }, 7000);
}

const minVwOrVh = -33;
const maxVwOrVh = 33;
function disperse() {
  allMemoryPieces.forEach((element) => {
    // Generate a random number between minVwOrVh and maxVwOrVh (inclusive of minVwOrVh and maxVwOrVh)
    const randomNumber1 = Math.floor(Math.random() * (maxVwOrVh - minVwOrVh + 1)) + minVwOrVh;
    const randomNumber2 = Math.floor(Math.random() * (maxVwOrVh - minVwOrVh + 1)) + minVwOrVh;
    element.style.transform = "translateX("+randomNumber1+"vw) translateY("+randomNumber2+"vh)" ;
  });
}
function undoTheDispersion() {
  allMemoryPieces.forEach((element) => {
    element.style.transform = "translateX("+0+"vw) translateY("+0+"vh)" ;
  });
}

// Function to generate a random integer from an array of values
function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const xLandscape_yPortrait = [0,180,360]; const yLandscape_xPortrait = [0,180];

function sendTheCardsToTheirNewPositions() {
  const uniqueCoordinates = []; // Initialize an array to store unique coordinates
  // Generate 6 random and unique coordinates
  while (uniqueCoordinates.length < 6) {
    let x; let y;
    if (containerOfTheWholeGame.offsetWidth > containerOfTheWholeGame.offsetHeight) { // Landscape
      x = getRandomFromArray(xLandscape_yPortrait);
      y = getRandomFromArray(yLandscape_xPortrait);
    } else { // Portrait
      x = getRandomFromArray(yLandscape_xPortrait);
      y = getRandomFromArray(xLandscape_yPortrait);
    }
    const coordinate = x + ',' + y;
    // Check if the coordinate is unique
    if (!uniqueCoordinates.includes(coordinate)) {
      uniqueCoordinates.push(coordinate);
    }
  }
  // ---
  for (let i = 0; i < 6; i++) {
    const leftValue = uniqueCoordinates[i].split(",")[0];
    const topValue = uniqueCoordinates[i].split(",")[1];
    allMemoryPieces[i].style.left = leftValue+"px";
    allMemoryPieces[i].style.top  = topValue+"px";
  }
}

// Detect orientation change using resize
let lastRecordedWindowWidth = window.innerWidth; let lastRecordedWindowHeight = window.innerHeight;
console.log("lastRecordedWindowWidth "+lastRecordedWindowWidth);
console.log("lastRecordedWindowHeight "+lastRecordedWindowHeight);
let landscapeOrPortrait = null;
if (lastRecordedWindowWidth>lastRecordedWindowHeight) {
  landscapeOrPortrait = "landscape"; console.log("Starting the game in LANDSCAPE");
} else {
  landscapeOrPortrait = "portrait"; console.log("Starting the game in PORTRAIT");
}
window.addEventListener('resize', updateWindowProperties);
function updateWindowProperties() {
  setTimeout(function () {
    lastRecordedWindowWidth = window.innerWidth; lastRecordedWindowHeight = window.innerHeight;
    if (lastRecordedWindowWidth>lastRecordedWindowHeight) {
      if (landscapeOrPortrait != "landscape") {  handleOrientationChange();  }
      landscapeOrPortrait = "landscape";
    } else {
      if (landscapeOrPortrait != "portrait") {  handleOrientationChange();  }
      landscapeOrPortrait = "portrait";
    }
  },100); // Wait for retarded browsers
}
function handleOrientationChange() {
  sendTheCardsToTheirNewPositions();
}
