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

const mouseEnterTouchStartSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/mouseenter_touchstart."+soundFileFormat]  });
const mouseDownTouchEndSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/mousedown_touchend."+soundFileFormat]  });
const turnSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/turn."+soundFileFormat]  });
const failSound = new parent.Howl({  src: ["/lessons_in_iframes/level_1/unit_3/lesson_4/fail."+soundFileFormat]  });
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

// List of backside visuals
const imageFiles = [
  '/lessons_in_iframes/level_1/unit_3/lesson_4/fish.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/bird.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/water.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/fish.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/bird.avif',
  '/lessons_in_iframes/level_1/unit_3/lesson_4/water.avif'
];

/* __CONTAINER DIVS__ */
// Use if needed » const main = document.getElementsByTagName('MAIN')[0];
const fullVpDarkBlue = document.getElementById('coverForTheUnchosenOnesID');
const containerOfSingles = document.getElementById('singlesDivID');
const allSingles = containerOfSingles.children; // Use children instead of childNodes to ignore HTML comments
const containerOfTheWholeGame = document.getElementById('allOfTheGameDivID');
const allSixPerfectFitSquares = document.querySelectorAll(".containerForOneOfSixPerfectFitPieces");
const allBackFaces = document.querySelectorAll(".theCardsBackFace");
const allCards = document.querySelectorAll(".containerForRoundedColorCards");

window.addEventListener("DOMContentLoaded",function(){   assignVisualsFunction();   }, { once: true });
function assignVisualsFunction() {
  // Shuffle the imagePairs array to randomize the assignment.
  // console.log(imageFiles); // Works OK
  shuffleArray(imageFiles);
  // console.log(imageFiles); // Works OK
  // Function to shuffle an array using the Fisher-Yates algorithm.
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
  for (let i = 0; i < 6; i++) {
    allBackFaces[i].src = imageFiles[i];
  }
}

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Desktop users can change the speed; mobile users can't. Because the mobile GUI has to stay simple.
function loadingIsCompleteFunction()
{
  if (studiedLang == "ar") { // Display the note about adjectives' GENDER in Arabic.
    const pathOfNotificationAboutGender = "/user_interface/text/"+userInterfaceLanguage+"/1-3-4_arabic_gender.txt";
    fetch(pathOfNotificationAboutGender,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      new SuperTimeout(function(){ createAndHandleInfoBoxType1BeforeLessonStarts(); putNotificationTxtIntoThisP1.innerHTML = contentOfTheTxtFile; },501); // See js_for_info_boxes_in_lessons.js
      // createAndHandleInfoBoxType1BeforeLessonStarts() will fire startTheLesson() 1.5 seconds after its OK button is clicked/touched
    });
  } else {
    startTheLesson(); // Call it now if it was not called from within createAndHandleInfoBoxType1BeforeLessonStarts() in js_for_info_boxes_in_lessons.js
  }
}

function startTheLesson()
{
  // White is the first color then comes green » blue » yellow » red » black
  // Give time to the preloader to clear
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 5000; proceedTime = 11000; break;
    case "fast": sayTime = 2000; proceedTime = 6000;  break;
    default:     sayTime = 3500; proceedTime = 8500;
  }
  new SuperTimeout(function () { sayWhite1.play(); }, sayTime/5);
  // new SuperTimeout(showGreen, proceedTime/5); // Uncomment after tests
  setTimeout(bringTheGameToTheScene, proceedTime/5);
}

function showGreen() {
  allSingles[0].style.visibility = "hidden";
  allSingles[1].style.visibility = "visible"; // Sudden change actually looks good in this case
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4000; proceedTime = 10000; break;
    case "fast": sayTime = 1000; proceedTime = 5000;  break;
    default:     sayTime = 2500; proceedTime = 7500;
  }
  new SuperTimeout(function () { sayGreen1.play(); }, sayTime/5);
  new SuperTimeout(showBlue, proceedTime/5);
}

function showBlue() {
  allSingles[1].style.visibility = "hidden";
  allSingles[2].style.visibility = "visible"; // Sudden change actually looks good in this case
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4000; proceedTime = 10000; break;
    case "fast": sayTime = 1000; proceedTime = 5000;  break;
    default:     sayTime = 2500; proceedTime = 7500;
  }
  new SuperTimeout(function () { sayBlue1.play(); }, sayTime/5);
  new SuperTimeout(showYellow, proceedTime/5);
}

function showYellow() {
  allSingles[2].style.visibility = "hidden";
  allSingles[3].style.visibility = "visible"; // Sudden change actually looks good in this case
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4000; proceedTime = 10000; break;
    case "fast": sayTime = 1000; proceedTime = 5000;  break;
    default:     sayTime = 2500; proceedTime = 7500;
  }
  new SuperTimeout(function () { sayYellow1.play(); }, sayTime/5);
  new SuperTimeout(showRed, proceedTime/5);
}

function showRed() {
  allSingles[3].style.visibility = "hidden";
  allSingles[4].style.visibility = "visible"; // Sudden change actually looks good in this case
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4000; proceedTime = 10000; break;
    case "fast": sayTime = 1000; proceedTime = 5000;  break;
    default:     sayTime = 2500; proceedTime = 7500;
  }
  new SuperTimeout(function () { sayRed1.play(); }, sayTime/5);
  new SuperTimeout(showBlack, proceedTime/5);
}

function showBlack() {
  allSingles[4].style.visibility = "hidden";
  allSingles[5].style.visibility = "visible"; // Sudden change actually looks good in this case
  let sayTime; let proceedTime;
  switch (parent.speedAdjustmentSetting) {
    case "slow": sayTime = 4000; proceedTime = 10000; break;
    case "fast": sayTime = 1000; proceedTime = 5000;  break;
    default:     sayTime = 2500; proceedTime = 7500;
  }
  new SuperTimeout(function () { sayBlack1.play(); }, sayTime/5);
  // sendTheCardsToTheirNewPositions();
  // new SuperTimeout(bringTheGameToTheScene, proceedTime/5);
}


function bringTheGameToTheScene() {
  containerOfSingles.classList.add("moveUpAndGoBeyondScreenLimit"); // Standard 2s animation » See colors.css
  containerOfTheWholeGame.classList.add("moveUpAndComeToTheCenterOfScreen"); // Standard 2s animation » See colors.css

  setTimeout(function () { sendTheCardsToTheirNewPositions(); }, 2000);

  if (deviceDetector.isMobile) { // Phones and tablets
    acceptAndHandleScreenTouches(); // See mobile.js
  } else { // Desktops
    acceptAndHandleMouseClicks(); // See desktop.js
  }
}

let theFirstChoice = null;
let original_zIndex1 = null;
function whenCorrectColorIsUtteredForThe_FIRST_Card(theChosenCard,saveThis_zIndex1) {
  turnSound.play();
  theChosenCard.classList.add("colorCardFlip"); // Name of class already applied » containerForRoundedColorCards
  theChosenCard.firstElementChild.firstElementChild.classList.add("appearAtFiftyPercent");
  theFirstChoice = theChosenCard; // Store
  console.log("the first choice src is " + theFirstChoice.firstElementChild.firstElementChild.src);
  theChosenCard.addEventListener("animationend", (event) => {
    fullVpDarkBlue.onanimationend = () => {
      fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
      original_zIndex1 = saveThis_zIndex1; // Only save, will revert after the second piece is checked
      // Add event listeners to the remaining elements
      if (deviceDetector.isMobile) { // Phones and tablets
        acceptAndHandleScreenTouches(theChosenCard); // See mobile.js
      } else { // Desktops
        acceptAndHandleMouseClicks(theChosenCard); // See desktop.js
      }
    };
    fullVpDarkBlue.style.animationPlayState = "running"; // The darkening layer disappears
  });
}
function whenCorrectColorIsUtteredForThe_SECOND_Card(theOtherChosenCard,revertToThis_zIndex2) {
  turnSound.play();
  theOtherChosenCard.classList.add("colorCardFlip"); // Name of class already applied » containerForRoundedColorCards
  theOtherChosenCard.firstElementChild.firstElementChild.classList.add("appearAtFiftyPercent");
  console.log("the second choice src is " + theOtherChosenCard.firstElementChild.firstElementChild.src);
  theOtherChosenCard.addEventListener("animationend", (event) => {
    fullVpDarkBlue.onanimationend = () => {
      fullVpDarkBlue.classList.remove("darkenLightenBackground"); // Clean up and get ready to restart
      theFirstChoice.parentNode.style.zIndex = original_zIndex1; // Push back to initial layer order
      theOtherChosenCard.parentNode.style.zIndex = revertToThis_zIndex2; // Push back to initial layer order
      console.log("TIME TO CHECK IF PAIRS MATCH");
      if (theOtherChosenCard.firstElementChild.firstElementChild.src == theFirstChoice.firstElementChild.firstElementChild.src) {
        console.log("CORRECT");
        // play partial success sound
      } else {
        console.log("TRY AGAIN");
        failSound.play();
        // Reset classes
        theFirstChoice.classList.remove("scaleUp");
        theOtherChosenCard.classList.remove("scaleUp");
        theFirstChoice.classList.remove("whenItIsClicked");
        theOtherChosenCard.classList.remove("whenItIsClicked");
        theFirstChoice.classList.remove("colorCardFlip");
        theOtherChosenCard.classList.remove("colorCardFlip");
        // Return to normal
        theFirstChoice.classList.add("returnToNormal");
        theOtherChosenCard.classList.add("returnToNormal");
        theFirstChoice.firstElementChild.firstElementChild.classList.remove("appearAtFiftyPercent");
        theOtherChosenCard.firstElementChild.firstElementChild.classList.remove("appearAtFiftyPercent");
        theFirstChoice.firstElementChild.firstElementChild.classList.add("disappearAtFiftyPercent");
        theOtherChosenCard.firstElementChild.firstElementChild.classList.add("disappearAtFiftyPercent");

        // Shuffle the cards
        setTimeout(function () {
          disperse();
          setTimeout(function () {
            collectAllCardsAtTheCenter();
          }, 300);
        }, 2500);
        setTimeout(function () {
          undoTheDispersion();
          setTimeout(function () {
            sendTheCardsToTheirNewPositions();
          }, 300);
        }, 3500);
      }
      // Add event listeners to the remaining elements
      // if (deviceDetector.isMobile) { // Phones and tablets
      //   acceptAndHandleScreenTouches(theChosenCard); // See mobile.js
      // } else { // Desktops
      //   acceptAndHandleMouseClicks(theChosenCard); // See desktop.js
      // }
    };
    fullVpDarkBlue.style.animationPlayState = "running"; // The darkening layer disappears
  });
}


// ----
const minVwOrVh = -30;
const maxVwOrVh = 30;
const minDifference = 8; // Minimum difference between accepted values
let generatedValuesForLEFT = [];
let generatedValuesForTOP = [];
function generateRandomNumber() { // Generate a random number between minVwOrVh and maxVwOrVh (inclusive of minVwOrVh and maxVwOrVh)
  let randomNumber = Math.floor(Math.random() * (maxVwOrVh - minVwOrVh + 1)) + minVwOrVh;
  return randomNumber;
}
function isValidRandomNumberForLEFT(randomNumber) { // Check if the difference between the new randomNumber and all previously generated values is at least minDifference
  for (const value of generatedValuesForLEFT) {
    if (Math.abs(randomNumber - value) < minDifference) {    return false;    }
  }
  return true;
}
function isValidRandomNumberForTOP(randomNumber) { // Check if the difference between the new randomNumber and all previously generated values is at least minDifference
  for (const value of generatedValuesForTOP) {
    if (Math.abs(randomNumber - value) < minDifference) {    return false;    }
  }
  return true;
}
// ---
/*
let boundaries = [];
function checkOverlap() {
  boundaries = [];
  allSixPerfectFitSquares.forEach((element) => {  const square = element.getBoundingClientRect();  boundaries.push(square);  });
  let overlappingPairs = [];
  for (let i = 0; i < boundaries.length - 1; i++) {
    for (let j = i + 1; j < boundaries.length; j++) {
      const rect1 = boundaries[i];
      const rect2 = boundaries[j];
      // Check if the two rectangles overlap in both the X and Y axes
      if ( rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top ) {
        console.log("overlap detected: "+i+"&"+j);
        if (!overlappingPairs.includes(i)) { overlappingPairs.push(i); }
        if (!overlappingPairs.includes(j)) { overlappingPairs.push(j); }
      }
    }
  }
  if (overlappingPairs.length === 0) {  return false; console.log("NO OVERLAPS");  }
  else {    return overlappingPairs;  }
}
*/
let attempts = 0;
function disperse() {
  allSixPerfectFitSquares.forEach((element) => {
    let randomNumber1; let randomNumber2;
    do { randomNumber1 = generateRandomNumber(); attempts++; } while (!isValidRandomNumberForLEFT(randomNumber1) && attempts < 50);
    generatedValuesForLEFT.push(randomNumber1); attempts = 0;
    do { randomNumber2 = generateRandomNumber(); attempts++; } while (!isValidRandomNumberForTOP(randomNumber2) && attempts < 50);
    generatedValuesForTOP.push(randomNumber2); attempts = 0;
    element.style.transform = "translateX("+randomNumber1+"vw) translateY("+randomNumber2+"vh)";
  });
  generatedValuesForLEFT = []; generatedValuesForTOP = []; // Reset
  /*
  setTimeout(function () {
    if (checkOverlap()) {
      allSixPerfectFitSquares[checkOverlap()[0]].style.transform = "translateX(-30vw) translateY(-30vh)";
      setTimeout(function () {
        if (checkOverlap()) {
          allSixPerfectFitSquares[checkOverlap()[0]].style.transform = "translateX(30vw) translateY(-30vh)";
          setTimeout(function () {
            if (checkOverlap()) {
              allSixPerfectFitSquares[checkOverlap()[0]].style.transform = "translateX(-30vw) translateY(30vh)";
              setTimeout(function () {
                if (checkOverlap()) {
                  allSixPerfectFitSquares[checkOverlap()[0]].style.transform = "translateX(30vw) translateY(30vh)";
                }
              }, 750);
            }
          }, 750);
        }
      }, 750);
    }
  }, 750);
  */
}
// --
function undoTheDispersion() {
  allSixPerfectFitSquares.forEach((element) => {
    element.style.transform = "translateX("+0+"vw) translateY("+0+"vh)" ;
  });
}

// ---- SHUFFLE AND SEND THE CARDS TO THEIR NEW POSITIONS ----
// Fit in the box with a different order
const xLandscape_yPortrait = [0,180,360]; const yLandscape_xPortrait = [0,180];
// Function to generate a random integer from an array of values
function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
// -
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
    allSixPerfectFitSquares[i].style.left = leftValue+"px";
    allSixPerfectFitSquares[i].style.top  = topValue+"px";
  }
}
function collectAllCardsAtTheCenter() {
  for (let i = 0; i < 6; i++) {
    allSixPerfectFitSquares[i].style.left = "calc(50% - 90px)";
    allSixPerfectFitSquares[i].style.top  = "calc(50% - 90px)";
  }

}

// ---- LANDSCAPE «-» PORTRAIT ----
// Detect orientation change using resize
let lastRecordedWindowWidth = window.innerWidth; let lastRecordedWindowHeight = window.innerHeight;
console.log("lastRecordedWindowWidth "+lastRecordedWindowWidth);
console.log("lastRecordedWindowHeight "+lastRecordedWindowHeight);
let landscapeOrPortrait = null;
if (lastRecordedWindowWidth>lastRecordedWindowHeight) {
  landscapeOrPortrait = "landscape"; console.log("Starting the game in LANDSCAPE");
} else { // Let a square window be treated as portrait
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
function handleOrientationChange() {  sendTheCardsToTheirNewPositions();  }
