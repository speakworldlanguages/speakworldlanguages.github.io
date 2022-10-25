"use strict";
﻿// This is deferred.
////var theStudyHasStarted = false;
// See js_for_all_iframed_lesson_htmls AND blank.html
var userIsOrWasJustViewing = "welcome-screen"; // First time users will stay at welcome-screen,,, continuing user's will teleport to progress-chart
//
var checkIfLoadingIsTakingTooLongTimeout; // See openFirstLesson below
var maybeYouShouldReloadBoxIsNowBeingDisplayed = false;
// moved itIsAlreadyCertainThatUserWantsToReload to inline in index.html
function startTheTimerToSeeIfNextLessonLoadsFastEnough() { // Called by either beforeunload in blank.html OR by onbeforeunload in js_for_all_iframed_lesson_htmls OR beforeunload in about.js
  //console.log("window load timeout started ticking"); // Works OK
  checkIfLoadingIsTakingTooLongTimeout = setTimeout(function () {
    // Show the [Wait] or [Reload] box
    createAndHandleMaybeYouShouldReloadBox(); // !!!!!!!!!!!!!!!! Must clear the timeout as soon as window-load happens in a lesson
    // !!!!!!!!!!!!!!!! Must clear the timeout and restart it MANUALLY where js_for_all_iframed_lesson_htmls is not included
    maybeYouShouldReloadBoxIsNowBeingDisplayed = true; // Will be set back to false by hideWouldYouLikeToRestartTheAppBox which fires in all 3 possible cases in js_for_info_boxes_in_parent
  }, 19500); // If new lesson doesn't load in 18~20 seconds the box will appear,,, compare it to the dialog element of pre-preloader that waits for 8 seconds
}
function stopTheTimerToSeeIfNextLessonLoadedFastEnough() { // See blank.html AND js_for_all_iframed_lesson_htmls AND about.js
  // Clear timeout for [would you like to wait or refresh] box
  if (checkIfLoadingIsTakingTooLongTimeout) {
    //console.log("trying to clear the timeout before it's too late"); // Tested: Works OK
    clearTimeout(checkIfLoadingIsTakingTooLongTimeout);
    checkIfLoadingIsTakingTooLongTimeout = 0;
  }
  // If it was too late and the box has been displayed but is no longer necessary because window did load after all, phew!
  if (maybeYouShouldReloadBoxIsNowBeingDisplayed) {
    loadWasSuccessfulDespiteTakingTooLong(); // Display [never mind] and disappear » js_for_info_boxes_in_parent
    // maybeYouShouldReloadBoxIsNowBeingDisplayed boolean is handled by hideWouldYouLikeToRestartTheAppBox in js_for_info_boxes_in_parent
  }
}
/*________________LOAD/SAVE___________________*/
var savedProgress; // This used to be in js_for_every_single_html BUT it made two DANGEROUS DUPLICATE vars exist [1- container parent level] [2- iframed lesson level] // LET'S avoid trouble
var saveJSON, loadJSON; // Same as savedProgress
// Load all previous progress data
if (localStorage.memoryCard) {  // https://www.w3schools.com/jsref/tryit.asp?filename=tryjson_store
  loadJSON = localStorage.getItem("memoryCard");
  savedProgress = JSON.parse(loadJSON);
} else {
  savedProgress = {}; // It is the user's first time using the app. So we create an empty object to be able to fill it.
  saveJSON = JSON.stringify(savedProgress); // Convert
  localStorage.setItem("memoryCard", saveJSON); // Save
  // Now we must create savedProgress.tr = {}; savedProgress.ja = {}; savedProgress.en = {}; ... in js_for_app_initialization_in_parent letTheIframeTeach..
}

/*_____CAN PLAY SOUND??? ___using howler.js*/
// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately.
// ALSO REMEMBER: mousedown DOESN'T UNLOCK SOUND --- mouseup DOES
var firstUserGestureHasUnleashedAudio = false; // Used in js_for_the_sliding_navigation_menu.js
window.addEventListener("mouseup",function () {  firstUserGestureHasUnleashedAudio = true;  }, {once:true}); // Prevent sound flooding (otherwise hover sounds that accumulate may explode with the first user gesture).

// NOTE: Chrome does not count an alert box click as a user gesture. Only the first element click or touch will unlock sound. Must be silent until then.

var genderOfTheUser; // CODING CHOICE: Should we make it "unknown" at this point???
var mustUseFemaleConjugationForCommandVerbs = false;
var langCodeForTeachingFilePaths;
var langCodeForAnnyang;
// Looks like we don't have to wrap this in DOMContentLoaded thanks to defer, no?
var ayFreym = document.getElementsByTagName('IFRAME')[0]; // Used to be getElementById('theIdOfTheIframe'); // Access to ayFreym from » progress.js, js_for_different_browsers_and_devices, js_for_the_sliding_navigation_menu
var ayFreymWindow = ayFreym.contentWindow || ayFreym.contentDocument; // Used in js_for_different_browsers_and_devices AND js_for_the_sliding_navigation_menu
const mainInParent = document.getElementsByTagName('MAIN')[0];

function handleFadingAndNavigation(srcPath) { // This used to be in DEPRECATEDjs_for_preload_handling.js and before that it was in progress.js (it has to stay at parent level because script execution must continue even if a frame is unloaded)
  ayFreym.classList.add("everyThingFadesToBlack"); // Exists in css_for_preloader_and_orbiting_circles,,, PREVIOUSLY WAS IN css_for_the_sliding_navigation_menu
  const orbitingCircles =  document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701); // From display none;
  setTimeout(function () {
    ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {   ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      orbitingCircles.style.display = "none";
      ayFreym.classList.remove("everyThingFadesToBlack");  ayFreym.classList.add("everyThingComesFromBlack");
      setTimeout(function() {   ayFreym.classList.remove("everyThingComesFromBlack");   },2701); // 701ms was not enough???
    }
  },750);
}

function goToProgressChart() {
  ayFreym.src = "/progress_chart/index.html"; // Load immediately; don't wait for [Ok, that's good] being touched/clicked in the dialog/info-box
  createAndHandleProgressHasBeenLoadedBox(); // See js_for_info_boxes_in_parent
  // Probably must do addEventListener load for iframe before hiding MAIN
  // NOTE: 8K is 7680x4320  »  8000px should be enough for any display
  mainInParent.style.left = "8000px"; // Hide the "Choose the language you want to learn" screen
}

window.addEventListener('load', function(){

  // Skip the welcome screen and continue progress from last unit / last saved position
  if (Object.keys(savedProgress).length>0) { // See if a previously saved checkpoint exists.
    // See openFirstLesson() down in line 200+smth to find the first storage of theLanguageUserIsLearningNow...
    langCodeForTeachingFilePaths = localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths; // This will certainly exist as long as there has been a "memory card" save.
    langCodeForAnnyang = localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang; // Same situation.
    if (annyang) {
        annyang.setLanguage(langCodeForAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
    }
    if (localStorage.genderOfTheUserSavedToLocalStorage) { // Retrieve
        genderOfTheUser = localStorage.genderOfTheUserSavedToLocalStorage;
        if (genderOfTheUser=="female") {          mustUseFemaleConjugationForCommandVerbs = true;        }
    }

    ayFreym.addEventListener('load',goToProgressChart,{ once: true }); // The right-click (context menu) won't function properly if ayFreym.src is changed too early???

  } else {
    // First time users will proceed via openFirstLesson() which fires when any of the letTheIframeTeach functions is called depending on button name.
    // localStorage.memoryCard is created as soon as one of the letTheIframeTeach buttons is clicked or touched.
  }

}, { once: true });
// For languages like Arabic we need to know the user's gender.
// Let the webp img files be downloaded and ready before the button to reveal them is clicked/touched.
const malesIcon = document.createElement("IMG");
const femalesIcon = document.createElement("IMG");
malesIcon.src = "/user_interface/images/gender_gentlemen.webp"; // Less than 1KB
femalesIcon.src = "/user_interface/images/gender_ladies.webp"; // Only 1,5KB

function setLangCodeForFilePathsOfTeachingAssets(idOfTheButtonThatWasClickedOrTouched) {
  console.log("On welcome screen user has chosen: "+idOfTheButtonThatWasClickedOrTouched);
  langCodeForTeachingFilePaths = idOfTheButtonThatWasClickedOrTouched;
  if (!localStorage.lesson111VoiceFilesCachedSuccessfully) {
    if (typeof loadTheVoiceOfTheTeacherInLesson111 === "function") { loadTheVoiceOfTheTeacherInLesson111(); }
    // Cache the audio files that contain the teacher's voice for the very first lesson » See js_for_cache_handling_with_initial_load
  }
}

/*What language will be taught via the iframe*/
/* JA - Hito */
function letTheIFrameTeachJapanese(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "ja"; //"ja" seemed to be OK with both iOS and Android in summer 2021
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "ja";
  /*if (isApple) { // See js_for_different_browsers_and_devices
    langCodeForAnnyang = "ja-JP"; // Overwrite // NO - ACCORDING TO https://www.ibabbleon.com/iOS-Language-Codes-ISO-639.html
  }*/
  if (!savedProgress.ja) { // if it doesn't exist
    savedProgress.ja = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress); // See js_for_every_single_html
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}
/* ZH - Renmen */
function letTheIFrameTeachChinese(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "zh";
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "zh"; // "zh" alone works on Android. Would it still be better with "zh-CN" or "zh-TW" or vice-versa on Android and Windows. Because Android turns the mic on and off too quickly in some less supported languages.
  // Mac Safari works with zh only // Does not work with "zh-Hans"!
  if (!savedProgress.zh) { // if it doesn't exist
    savedProgress.zh = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}
/* TR - Kişi */
function letTheIFrameTeachTurkish(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "tr"; //"tr" is OK with both iOS and Android
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "tr"; // UNCLEAR: SHOULD THIS BE tr-TR on iOS? // or tr-tr?
  /*if (isApple) {
    langCodeForAnnyang = "tr-TR"; // Overwrite
  }*/
  if (!savedProgress.tr) { // if it doesn't exist
    savedProgress.tr = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}
/* AR Arabic */
function letTheIFrameTeachArabic(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "ar"; // Android is OK with "ar" and according to https://www.ibabbleon.com/iOS-Language-Codes-ISO-639.html iOS shouldn't need "ar-SA" or "ar-QA" etc, no???
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "ar"; // We still want "ar" instead of "ar-SA" on Android for better performance (frequency of the mic turn on&off thing).
  // Weird Safari problem with ar: the word is detected correctly and matches the answer key but for some reason the function still won't fire
  if (!savedProgress.ar) { // if it doesn't exist
    savedProgress.ar = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    // Get user's gender
    const darkenWholeViewportDiv = document.createElement("DIV");
    darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass"); // css_for_the_container_parent_html
    document.body.appendChild(darkenWholeViewportDiv);
    const gentlemenButtonDiv = document.createElement("DIV");
    const ladiesButtonDiv = document.createElement("DIV");
    gentlemenButtonDiv.appendChild(malesIcon);
    ladiesButtonDiv.appendChild(femalesIcon);
    malesIcon.style.width = "160px";
    malesIcon.style.height = "160px";
    femalesIcon.style.width = "160px";
    femalesIcon.style.height = "160px";
    gentlemenButtonDiv.classList.add("gentlemenAndLadiesButtonClass");
    gentlemenButtonDiv.classList.add("gentlemenButtonClass");
    ladiesButtonDiv.classList.add("gentlemenAndLadiesButtonClass");
    ladiesButtonDiv.classList.add("ladiesButtonClass");
    document.body.appendChild(gentlemenButtonDiv);
    document.body.appendChild(ladiesButtonDiv);
    if (deviceDetector.isMobile) {
      gentlemenButtonDiv.addEventListener("touchstart",theUserIsMaleFunction,{once:true});
      ladiesButtonDiv.addEventListener("touchstart",theUserIsFemaleFunction,{once:true});
    } else {
      gentlemenButtonDiv.addEventListener("mousedown",theUserIsMaleFunction,{once:true});
      ladiesButtonDiv.addEventListener("mousedown",theUserIsFemaleFunction,{once:true});
    }
    function theUserIsMaleFunction() {
      gentlemenButtonDiv.classList.remove("gentlemenButtonClass");
      gentlemenButtonDiv.classList.add("bringGenderButtonToVerticalCenter");
      ladiesButtonDiv.classList.add("fadeGenderButtonToZeroOpacity");
      setTimeout( function ()  {  ladiesButtonDiv.style.display="none";  },500);
      genderOfTheUser = "male"; // Set it...
      localStorage.genderOfTheUserSavedToLocalStorage = "male"; // ...and save it
      setTimeout( function ()  {
        openFirstLesson();
        document.body.removeChild(darkenWholeViewportDiv);
        document.body.removeChild(gentlemenButtonDiv);
        document.body.removeChild(ladiesButtonDiv);
      },1500);
    }
    function theUserIsFemaleFunction() {
      ladiesButtonDiv.classList.remove("ladiesButtonClass");
      ladiesButtonDiv.classList.add("bringGenderButtonToVerticalCenter");
      gentlemenButtonDiv.classList.add("fadeGenderButtonToZeroOpacity");
      setTimeout( function ()  {  gentlemenButtonDiv.style.display="none";  },500);
      genderOfTheUser = "female"; // Set it...
      localStorage.genderOfTheUserSavedToLocalStorage = "female"; // ...and save it
      mustUseFemaleConjugationForCommandVerbs = true;
      setTimeout( function ()  {
        openFirstLesson();
        document.body.removeChild(darkenWholeViewportDiv);
        document.body.removeChild(gentlemenButtonDiv);
        document.body.removeChild(ladiesButtonDiv);
      },1500);
    }
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}
/* EN - People */
// LET'S TRY AND CREATE TWO DIFFERENT BUTTONS AND TEACH AMERICAN AND BRITISH separately
function letTheIFrameTeachBritishEnglish(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "en_east"; // "en" alone works well both on Android and iOS. No need for "en-US" or "en-GB"
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "en-GB";
  if (!savedProgress.en_east) { // if it doesn't exist » CAUTION: The key name must match langCodeForTeachingFilePaths
    savedProgress.en_east = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}

function letTheIFrameTeachAmericanEnglish(){ //See index.html to find the button that triggers this via onclick.
  console.log("Create or read a save slot for "+ langCodeForTeachingFilePaths);
  //cleanup//langCodeForTeachingFilePaths = "en_west"; // "en" alone works well both on Android and iOS. No need for "en-US" or "en-GB"
  //cleanup//loadTheVoiceOfTheTeacherInLesson111(); // Cache the audio files that contain the teacher's voice » See js_for_initial_cache_handling
  langCodeForAnnyang = "en-US"; // According to https://www.ibabbleon.com/iOS-Language-Codes-ISO-639.html it should be "en" only instead of en-US on iOS
  if (isApple) { // Let's believe ibabbleon
    langCodeForAnnyang = "en"; // Overwrite
  }
  if (!savedProgress.en_west) { // if it doesn't exist » CAUTION: The key name must match langCodeForTeachingFilePaths
    savedProgress.en_west = {}; // Create an object to fill and save later ,,, Will exist AT PARENT LEVEL unless passed and shared via localStorage!
    saveJSON = JSON.stringify(savedProgress);
    localStorage.setItem("memoryCard", saveJSON); // Now it exists on the memory card, accessible by both parent and iframe
    openFirstLesson();
  } else { // User must have used the [learn another language] bilingual button and now wants to continue a previously studied language
    openFirstLesson("returning");
  }
}

function startTeaching(usersChoice) { // Called from within testAnnyangAndAllowMic() » See js_for_different_browsers_and_devices
  console.log("startTeaching() fired; will now proceed to letTheIframeTeach...()");
  switch (usersChoice) {
    case "hito": letTheIFrameTeachJapanese();
      break;
    case "renmen": letTheIFrameTeachChinese();
      break;
    case "kishi": letTheIFrameTeachTurkish();
      break;
    case "3rabiyyah": letTheIFrameTeachArabic();
      break;

    default: // Do nothing if no button name is passed. For example, on Safari [as of 16.0] testAnnyangAndAllowMic() is first called without a parameter.
  }
}

/*___________Navigate to first lesson_____________*/
function openFirstLesson(freshNewOrReturning) {
  console.log("openFirstLesson() fired - iframe src will now be changed in order to navigate to...");
  ////startTheTimerToSeeIfNextLessonLoadsFastEnough(); // Don't need this because blank.html beforeunload will handle it instead
  // DEPRECATED: hideNotificationAndInstallation_2in1_button(); // See js_for_pwa
  // Save language choice
  localStorage.theLanguageUserWasLearningLastTimeToSetFilePaths = langCodeForTeachingFilePaths;
  localStorage.theLanguageUserWasLearningLastTimeToSetAnnyang = langCodeForAnnyang;
  // Set language
  if (annyang) {
    annyang.setLanguage(langCodeForAnnyang); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }

  // WHAT IS THE BEST WAY TO do the first test vibration??? Probably: let the give me water easy game "LISTEN" button be the first button that all must touch
  // if (canVibrate) { navigator.vibrate(10); } // See js_for_every_single_html // Note that this may make mobile Firefox ask for permission to allow vibration

  setTimeout(function() {
    // Hide the welcome screen ( <<choose the language you want to learn>> screen's menu-div)
    mainInParent.style.left = "8000px";   // Used to be    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    // Check if this particular language was studied or viewed before
    if (freshNewOrReturning == "returning") {
      goToProgressChart();
    } else {
      // Display the first lesson
      if (isSafari && !localStorage.safariHowToPermanentlyAllowMicAlertIsAlreadyDisplayed) {
        //DEPRECATED createAndHandleSafariNeedsOneMoreStepBox().then(function () {  ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html";  });
        // HANDLE LATER: When iPhone user runs the app from his homescreen THERE IS NO ADDRESS BAR and it's FULLSCREEN
        // So THE MESSAGE MUST NOT be about specific single web site mic allow method
        // Another way to permanently allow mic is by going to iPhone device settings->Safari settings->Microphone and allowing mic for all web sites
        alert(safariHowToPermanentlyAllowMicP.innerHTML); // See js_for_info_boxes_in_parent
        localStorage.safariHowToPermanentlyAllowMicAlertIsAlreadyDisplayed = "yes";
        ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
      } else {
        ayFreym.src = "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
      }

    }
  },50); // Unnoticable tiny delay

  // Make the loading animation appear (i.e. bring the preloader) immediately
  // add("addThisClassToRevealThePreloader") is not used here because user is about to see the very first lesson (bread) and we want that to happen asap (not after 1.5s of animation time)
  preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // It was added with window.load See css_for_the_container_parent_html,,, Should be 500ms if not changed.
  // PROBABLY: Not necessary anymore,,, setPreloadCoverIsShowingNowToTrue(); // See js_for_preload_handling
}


// UI sounds ... also see js_for_different_browsers_and_devices.js
function unloadThatLastSoundWhichCannotBeUnloadedNormally(passItToMe) {
  // Normally unloadTheSoundsOfThisLesson will do the job which fires with beforeunload in js_for_all_iframed_lesson_htmls
  // But in case the sound must play even after beforeunload
  setTimeout(function () {    passItToMe.unload();   }, 5000); // Cool! It works
}
let dismissNotificationSound1, clickSound; /*hoverSound,*/
window.addEventListener("load",function () { // HEY!!! THERE ALREADY IS A WINDOW LOAD UP ABOVE HERE
  dismissNotificationSound1 = new Howl({  src: ["/user_interface/sounds/notification1_close.webm"]  });
  /* DEPRECATED hoverSound = new Howl({  src: ["/user_interface/sounds/illuminant_button_hover."+audioFileExtension]  });*/ // DESKTOP ONLY!
  clickSound = new Howl({  src: ["/user_interface/sounds/illuminant_button_click.webm"]  });
},{once:true})

window.addEventListener("DOMContentLoaded",function() {

  /* BUTTON - Kishi Language, Hito Lanuage, Ren Language */
  const allParentButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON"); /*All of them in container parents,,, NOT THE IFRAMED LESSON BUTTONS*/
  let i;
  for (i = 0; i < allParentButtonElementsAreInThisArray.length; i++)
  {
    if (deviceDetector.device == "desktop") {
      // allParentButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnterMenuButtonF); // Cannot use a hover sound because sound is locked until first click
      allParentButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDownMenuButtonF);
    } else {
      allParentButtonElementsAreInThisArray[i].addEventListener("touchend", touchEndMenuButtonF); // Not touchstart because it may have to be scrollable
    }
  }

}, { once: true });


var blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // prevent touch or click chaos,,, See blank.html to find how it is set back to the initial value

function mouseDownMenuButtonF(event) { event.preventDefault();
  if (!blockOtherWelcomeScreenButtonsUntilItIsSafe) { // Prevention of touch/click chaos » Do not let clicking one language and another one immediately after
    blockOtherWelcomeScreenButtonsUntilItIsSafe = true; // Set this back to false if confirm box is cancelled
    clickSound.play();
    event.target.classList.add("buttonMousedownOrTouchend"); // Make it blink: See css_for_the_container_parent_html
    const userWantsToLearnWhichLanguage = event.target.name;
    setLangCodeForFilePathsOfTeachingAssets(event.target.id);
    setTimeout(function () { event.target.classList.remove("buttonMousedownOrTouchend"); },1201); // See css_for_the_container_parent_html
    setTimeout(function () {
      // Use the app's modal box instead of the browser's native confirm box » reason1 it's much nicer, reason2 Safari mutes unmutes sound after native alert/confirm boxes
      // See js_for_info_boxes_in_parent
      createAndHandleGoBackOrProceedBox().then(function () { // This threw an error when removeChild was used the second time, said: Failed to execute 'removeChild' on 'Node'
        //console.log("promise resolved");
        setTimeout(function () { testAnnyangAndAllowMic(userWantsToLearnWhichLanguage); },700); // 300+1501=1801ms??? See js_for_different_browsers_and_devices
        // blockOtherWelcomeScreenButtonsUntilItIsSafe will be set to false bl user_interface/blank.html onbeforeunload
      }).catch(function () {
        //console.log("promise rejected"); // Works OK
        blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // User changed his/her mind and wants to stay
      });

    },1500); // Let user watch the blinking animation and listen to the nice button sound
  }
}
function touchEndMenuButtonF(event) { event.preventDefault();
  if (!blockOtherWelcomeScreenButtonsUntilItIsSafe) { // Prevention of touch/click chaos » Do not let clicking one language and another one immediately after
    const changedTouch = event.changedTouches[0];
    const theThingThatWasChosen = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
    if(theThingThatWasChosen.tagName.toLowerCase() == "button" ){
      blockOtherWelcomeScreenButtonsUntilItIsSafe = true; // Set this back to false if confirm box is cancelled
      clickSound.play();
      theThingThatWasChosen.classList.add("buttonMousedownOrTouchend"); // Make it blink: See css_for_the_container_parent_html
      setLangCodeForFilePathsOfTeachingAssets(theThingThatWasChosen.id);
      setTimeout(function () { theThingThatWasChosen.classList.remove("buttonMousedownOrTouchend"); },1201); // See css_for_the_container_parent_html
      setTimeout(function () {
        // Use the app's modal box instead of the browser's native confirm box » reason1 it's much nicer, reason2 Safari mutes unmutes sound after native alert/confirm boxes
        // See js_for_info_boxes_in_parent
        createAndHandleGoBackOrProceedBox().then(function () {
          setTimeout(function () { testAnnyangAndAllowMic(theThingThatWasChosen.name); },500); // See js_for_different_browsers_and_devices
          // blockOtherWelcomeScreenButtonsUntilItIsSafe will be set to false bl user_interface/blank.html when beforeunload fires
        }).catch(function () {
          blockOtherWelcomeScreenButtonsUntilItIsSafe = false; // User changed his/her mind and wants to stay
        });

      },1500); // Let user watch the blinking animation and listen to the nice button sound
    }
  }
}


/*___PREVENT IMMEDIATE NAVIGATION TO EMPTY BROWSER TAB___*/
// This makes Chrome show a default prompt: "Leave site? Changes that you made may not be saved [Cancel] [Leave]"
// ...which is better for UX
window.addEventListener('beforeunload', (event) => { // See » https://stackoverflow.com/questions/821011/prevent-a-webpage-from-navigating-away-using-javascript
  if (itIsAlreadyCertainThatUserWantsToReload) {
    // Proceed normally
  } else {
    // Cancel the event as stated by the standard.
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
});


/* DEPRECATED: We don't want to kill any of the good mood of the user by showing a crowdfunding prompt immediately
const welcomeMessageDiv = document.getElementById('idOfTheWelcomeMenuDiv');
function userHasClickedOrTouchedWelcomeAnswerA() {
  // Remove the element but display it again next time
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick"); // this is a generic animation, it is not only for this button
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
}
function userHasClickedOrTouchedWelcomeAnswerB() { // The user has claimed that he/she is a member of the crowd.
  // Remove the element and don't display it anymore
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick"); // this is a generic animation, it is not only for this button
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
  localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd = "yes";
}*/

/* DEPRECATED
window.addEventListener('DOMContentLoaded', function(){
  // Skip the crowdfunding (welcome screen) message if user says he she is a member.
  if (localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd == "yes") {
    welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);
  }
}, { once: true });*/



/*_____*/
//
// HANDLE: addHomeButtonToTheNavigationMenu(); addGoBackToPreviousButtonToTheNavigationMenu(); handleTheFirstGoingFullscreenOnMobiles();
// HANDLE: preloadHandlingDiv setPreloadCoverIsShowingNowToTrue();

// DEPRECATED CODE
// function whenLoadLastLessonOkButtonIsClickedOrTapped() { // See a parent document like index.html, ja.html, tr.html to find that button.
//       // Used to be document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
//   ayFreym.src = localStorage.theLastCheckpointSavedInLocalStorage;
//   //document.getElementById('fullViewportPositionFixedDivAsContainerOfLoadCheckpointPrompt').classList.add("addThisForOpacityAnimationFadeOut");
//   // Small navigation menu buttons... See js_for_the_sliding_navigation_menu.js
//   if (ayFreym.src.substring(ayFreym.src.length - 34, ayFreym.src.length)=="level_1/unit_1/lesson_1/index.html") {
//     // add only HOME button to the left when going to the first lesson
//     addHomeButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
//   } else {
//     // add both home and go back buttons when going to any lesson except for the very first (i.e. bread)
//     addHomeButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
//     addGoBackToPreviousButtonToTheNavigationMenu(); // WITH PROGRESS CHART: this must be moved to progress.js
//   }
//   handleTheFirstGoingFullscreenOnMobiles(); // WITH PROGRESS CHART: this must be moved to progress.js
//
//   // Make the loading animation appear (i.e. bring the preloader)
//   preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader"); // See css_for_every_single_html,,, Should be 500ms if not changed.
//   setPreloadCoverIsShowingNowToTrue(); // See js_for_preload_handling
// }

/*____*/
// DEPRECATED: function handleTheFirstGoingFullscreenOnMobiles() { // This fires if 1- User selects a language to learn 2- User returns to the last saved point
//   // Try to go fullscreen on mobile devices. Note the exception of iPhones!
//   if (deviceDetector.isMobile) {
//     // Going fullscreen on mobiles will make the nav menu sink down and disappear because
//     // as you can find in js_for_the_sliding_navigation_menu.js -> the resize event triggers DEPRECATED: hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen()
//     o-p-e-n-F-u-l-l-s-c-r-e-e-n(); // See js_for_handling_fullscreen_mode.js
//     // WARNING: iPhone's Safari won't allow fullscreen! caniuse.com says it is allowed on iPads but wasn't able to test it as of July 2021.
//     // So since resize doesn't happen on iPhones we must manually do the first sinking of the nav menu like this.
//     // BETTER SOLUTION: Move the m-a-k-eTheNavMenuGoDownOnMobiles() function call to iframe.onload and check if landing is a lesson html (not progress_chart)
//     /*if (deviceDetector.device == "phone" && detectedOS.name == "iOS") {
//       // Just hide the nav menu since we are unable to go fullscreen on an iPhone
//       // INSTEAD OF THIS: setTimeout(function () {      m-a-k-eTheNavMenuGoDownOnMobiles();      },3500); // See js_for_the_sliding_navigation_menu
//       // WE MUST: wait until preloadCoverIsShowingNow is set to false. That change happens in js_for_app_initialization_in_parent
//       let checkEvery350msOrSo = setInterval(isThePreloaderDoneYet, 350);
//       function isThePreloaderDoneYet() {
//         if (preloadCoverIsShowingNow == false) { // Yes, it is now done.
//           clearInterval(checkEvery350msOrSo); // Stop the timer.
//           m-a-k-eTheNavMenuGoDownOnMobiles(); // Safely hide the nav menu as soon as possible now. // See js_for_the_sliding_navigation_menu
//         }
//       }
//     }*/
//   } // END OF Try to go fullscreen on mobile ...
// }


/*___*/
/* DEPRECATED: ASIDE - I will consider joining
let allParentAsideElementsAreInThisArray = document.getElementsByTagName("ASIDE"); // All of them in container parents,,, NOT THE IFRAMED LESSON BUTTONS
let j;
for (j = 0; j < allParentAsideElementsAreInThisArray.length; j++)
{
  if (deviceDetector.device == "desktop"){
    allParentAsideElementsAreInThisArray[j].addEventListener("mousedown", mouseDownAsideAsButtonF); // When the [OK I will consider joining...] box is closed.
  } else {
    allParentAsideElementsAreInThisArray[j].addEventListener("touchstart", mouseDownAsideAsButtonF); // When the [OK I will consider joining...] box is closed.
  }
}*/

// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately. See js_for_the_sliding_navigation_menu.js

/*function mouseEnterMenuButtonF() {
  if (firstUserGestureHasUnleashedAudio) {
    hoverSound.play(); // If we don't wrap this in such an if() what can happen: The user can hover many times before the sound is unlocked which then EXPLODES when sound is unlocked.
  }
}*/

/*____*/
/* DEPRECATED
function mouseDownAsideAsButtonF() {
  dismissNotificationSound1.play();
}
*/
