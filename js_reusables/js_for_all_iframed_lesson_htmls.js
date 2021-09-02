// CAREFUL! DEFER or NOT DEFER
var thisLessonHasBeenLoadedFresh = true; // Access this from js_for_the_sliding_navigation_menu to switch the function of the goBackOrRefreshButton
window.onload = function() {
  // Hide the preloader whenever a new lesson is ready to be shown through the iFrame
  parent.preloadHandlingDiv.classList.remove("addThisClassToRevealIt"); // See css_for_every_single_html
  parent.preloadHandlingDiv.classList.add("addThisClassToHideIt"); // See css_for_every_single_html
  setTimeout(function () { thisLessonHasBeenLoadedFresh = false; },8000); // The CAR MOVING BACKWARDS button is no more a go-back button and becomes a refresh button.
};
// CHECK IF ACCESS IS GOOD and block (or just fix) direct linking!
// MUST REVIEW if masked forwarding is implemented.
if (parent.thisIsTheParentWhichContainsAllIFramedLessons == "yes") {
  // This lesson html is inside its parent html as it is supposed to. That is good!
  // console.log("Safely parented!");
} else {
  // Someone is trying to access this lesson with a direct link. Must put it inside its parent html.
  alert("Redirecting to main...")

  // AVOID: Do not use reference to root with "/" as it could be uncertain what the root is in case of deep-iframing for domain masking.
  window.open("/","_top"); // Has been tested. It works.
  // WELL: If one tries to open "https://myproject.github.io/forbidden/folder/index.html" this will force it to open "https://myproject.github.io/index.html"
}

// Function that creates a div for NOTIFICATIONS
var notificationBoxContainer;
var notificationBoxItself;
var putNotificationTxtIntoThisP;
var okButtonToCloseTheNotification;

const popUpNotificationSound = new parent.Howl({  src: ['user_interface/sounds/notification2_appear.mp3']  });
const dismissNotificationSound = new parent.Howl({  src: ['user_interface/sounds/notification2_close.mp3']  });

function createAndHandleNotificationBox() {
  popUpNotificationSound.play();
  notificationBoxContainer = document.createElement("DIV");
  notificationBoxContainer.classList.add("notificationBG"); // See css_for_all_iframed_lesson_htmls
  document.body.appendChild(notificationBoxContainer);
  notificationBoxItself = document.createElement("DIV");
  notificationBoxItself.classList.add("notificationRoundedBox"); // See css_for_all_iframed_lesson_htmls
  notificationBoxContainer.appendChild(notificationBoxItself);

  putNotificationTxtIntoThisP = document.createElement("P");
  notificationBoxItself.appendChild(putNotificationTxtIntoThisP);
  okButtonToCloseTheNotification = document.createElement("DIV");
  okButtonToCloseTheNotification.innerHTML = "&#10004;"; // Default content of the OK box
  okButtonToCloseTheNotification.classList.add("okButtonUnderNotification"); // See css_for_all_iframed_lesson_htmls
  if (needLatinFonts) {
    okButtonToCloseTheNotification.style.fontFamily = '"Oxanium SemiBold", sans-serif';
  }
  notificationBoxItself.appendChild(okButtonToCloseTheNotification);
  okButtonToCloseTheNotification.addEventListener("mousedown",okButtonIsClicked);
  function okButtonIsClicked(event) {
    dismissNotificationSound.play();
    notificationBoxContainer.classList.add("addThisToAButtonForPlayStationStyleClick"); // See css_for_every_single_html_css
    setTimeout(function () {     notificationBoxContainer.parentNode.removeChild(notificationBoxContainer);     },1000); // The animation completes in 600ms
    if (typeof startTheLesson === "function") {
      setTimeout(function () {     startTheLesson();     }, 1500);
    }
  }
}

// HANDLE PAGE UNLOAD IF THE BROWSER'S “BACK” BUTTON IS USED
// WARNING: onbeforeunload doesn't fire when src of the iframe changes nor does hashchange
window.onbeforeunload = function() {
  // PROBLEM: When user makes progress and then clicks the browser's REFRESH button and then clicks the browser's BACK button the last lesson starts playing hidden behind the main menu.
  // console.log("iframe onbeforeunload has been fired -> js_for_all_iframed..."); // This does not show in eruda
  // Turn OFF annyang if it was ON
  if (parent.annyang) { // DO NOT OMIT! Firefox and other no-speech browsers need this to let the app work without Web Speech API.
    if (parent.annyang.isListening()) {
      parent.annyang.removeCommands();
      parent.annyang.abort();
    }
  }
  // Check if the functions exist in the lessons own js (like bread.js, water.js etc) before trying to call them.
  // NOTE: These are for the possibility of browser's back button being used or nav menu etc.
  if (typeof stopAudioInputVisualization === "function") {
    stopAudioInputVisualization(); // Stop Wavesurfer and turn off the microphone. See js_for_microphone_input...
  }
  if (typeof unloadTheSoundsOfThisLesson === "function") {
    unloadTheSoundsOfThisLesson(); // Every time defined with a different list in the lesson. See the unique js file of each lesson.
  }
  if (typeof unloadTheImagesOfThisLesson === "function") {
    unloadTheImagesOfThisLesson(); // Every time defined with a different list in the lesson. See the unique js file of each lesson.
  }
};

// BUTTON TYPE 1: Classical with playstation style
const hoverSoundForProceedToNextButton115 = new parent.Howl({  src: ['user_interface/sounds/proceed_to_next_hover.mp3']  }); // DESKTOPS ONLY! Could add code to disable it on mobile but guess it just works when left like this.
const clickSoundForProceedToNextButton115 = new parent.Howl({  src: ['user_interface/sounds/proceed_to_next_click.mp3']  });
let allLessonButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON");
let i;
for (i = 0; i < allLessonButtonElementsAreInThisArray.length; i++)
{
  /* The styles are standard for all devices. See css_for_all_iframed_lesson_htmls.css */
  /* Playstation style disappear */
  allLessonButtonElementsAreInThisArray[i].addEventListener("click", clickClassical);
  /* Classical sounds for hover and click */
  allLessonButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDownClassical);
  if (parent.deviceDetector.device == "desktop") {
    allLessonButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnterClassical);
  }
}

function clickClassical(event) {
  event.target.classList.add('addThisToAButtonForPlayStationStyleClick');
}
function mouseEnterClassical() {
  hoverSoundForProceedToNextButton115.play();
}
function mouseDownClassical() {
  clickSoundForProceedToNextButton115.play();
}

// BUTTON TYPE 2: Glassy button with glassy sounds
const hoverSoundForGlassyButtons = new parent.Howl({  src: ['user_interface/sounds/glass_button_hover.mp3']  }); // DESKTOPS ONLY! Could add code to disable it on mobile but guess it just works when left like this.
const clickSoundForGlassyButtons = new parent.Howl({  src: ['user_interface/sounds/glass_button_click.mp3']  });
/* Use ASIDE elements as a second type of button */
let allLessonAsideElementsAreInThisArray = document.getElementsByTagName("ASIDE");
let j;
for (j = 0; j < allLessonAsideElementsAreInThisArray.length; j++)
{
  /* GLASSMORPHISM visual style depends on the device and browser because mobiles need more readability */
  /* See @supports in css_for_all_iframed_lesson_htmls.css to find how alternative rules replace defaults in browsers like Firefox2021 */
  if (parent.deviceDetector.isMobile) {
    allLessonAsideElementsAreInThisArray[j].classList.add('glassmorphismOnMobiles'); /*See css_for_all_iframed_lesson_htmls.css*/
  } else {
    allLessonAsideElementsAreInThisArray[j].classList.add('glassmorphismOnDesktops'); /*See css_for_all_iframed_lesson_htmls.css*/
  }
  /* Click makes it explode. Touch makes it fade out */
  allLessonAsideElementsAreInThisArray[j].addEventListener("click", clickGlassy);
  /* Glassy sounds for hover and click */
  if (parent.deviceDetector.device == "desktop") { // Desktops
    allLessonAsideElementsAreInThisArray[j].addEventListener("mouseenter", mouseEnterGlassy);
    allLessonAsideElementsAreInThisArray[j].addEventListener("mousedown", mouseDownOrTouchStartGlassy, { once: true });
  }
  else { // Mobiles
    allLessonAsideElementsAreInThisArray[j].addEventListener("touchstart", mouseDownOrTouchStartGlassy, { once: true });
  }
}

function clickGlassy(event) {
  if (parent.deviceDetector.isMobile) { // Mobiles
    event.target.parentNode.classList.add('addThisToTheButtonWhenItIsTouchedOnMobiles'); //See css_for_all_iframed_lesson_htmls.css
    //event.target.removeEventListener("touchstart", mouseDownOrTouchStartGlassy);
  }
  else { // Desktops
    event.target.parentNode.classList.add('addThisToTheButtonWhenItIsClickedOnDesktops'); //See css_for_all_iframed_lesson_htmls.css
    event.target.removeEventListener("mouseenter", mouseEnterGlassy);
    //event.target.removeEventListener("mousedown", mouseDownOrTouchStartGlassy);
  }
}
function mouseEnterGlassy() {
  hoverSoundForGlassyButtons.play();
}
function mouseDownOrTouchStartGlassy() {
  clickSoundForGlassyButtons.play();
}
