// This is deferred.
// Redirection based on browser language is handled with inline script in index.html which should fire before anything here.

const welcomeMessageDiv = document.getElementById('idOfTheWelcomeMenuDiv');
function userHasClickedOrTouchedWelcomeAnswerA() {
  // Remove the element but display it again next time
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick");
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
}
function userHasClickedOrTouchedWelcomeAnswerB() { // The user has claimed that he/she is a member of the crowd.
  // Remove the element and don't display it anymore
  welcomeMessageDiv.classList.add("addThisToAButtonForPlayStationStyleClick");
  setTimeout(function () {     welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);    },1000);
  localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd = "yes";
}

window.addEventListener('DOMContentLoaded', function(){
  // Skip the crowdfunding (welcome screen) message if user says he she is a member.
  if (localStorage.theUserHasSaidHeOrSheIsAMemberOfTheCrowd == "yes") {
    welcomeMessageDiv.parentNode.removeChild(welcomeMessageDiv);
  }
}, { once: true });

var genderOfTheUser;
var theLanguageUserIsLearningNow;
const iFrameScriptAccess = document.getElementById('theIdOfTheIframe');

// CODE TO BE REMOVED AFTER TESTS IS
// FROM HERE
//localStorage.theLastCheckpointSavedInLocalStorage = "lessons_in_iframes/level_1/unit_7/lesson_2/"; // Only for testing.
//localStorage.theLanguageUserWasLearningLastTime = "tr";
// TO HERE

// Continue progress from last unit
if (localStorage.theLastCheckpointSavedInLocalStorage) { // See if a previously saved checkpoint exists.
  // MUST USE display:none to avoid click blocking by z-index.
  document.getElementById('fullViewportPositionFixedDivAsContainerOfLoadCheckpointPrompt').classList.add("addThisForOpacityAnimationFadeIn");
  // NOTE: Chrome does not count an alert box click as a user gesture.
  theLanguageUserIsLearningNow = localStorage.theLanguageUserWasLearningLastTime; // Looks like there is no need to put this in an if(localStorage.theLanguageUserWasLearningLastTime){} to check if it exists.
  if (annyang) {
      annyang.setLanguage(theLanguageUserIsLearningNow); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }
  if (localStorage.genderOfTheUserSavedToLocalStorage) {
      genderOfTheUser = localStorage.genderOfTheUserSavedToLocalStorage;
  }
  function whenLoadLastLessonOkButtonIsClickedOrTapped() { // See a parent document like index.html, ja.html, tr.html to find that button.
    // WARNING: Must see if 8000px is enough not to cause a problem with very high desktop resolutions like 4K.
    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    iFrameScriptAccess.src = localStorage.theLastCheckpointSavedInLocalStorage;
    document.getElementById('fullViewportPositionFixedDivAsContainerOfLoadCheckpointPrompt').classList.add("addThisForOpacityAnimationFadeOut");
    // Small navigation menu buttons... See js_for_the_sliding_navigation_menu.js
    if (iFrameScriptAccess.src.substring(iFrameScriptAccess.src.length - 34, iFrameScriptAccess.src.length)=="level_1/unit_1/lesson_1/index.html") {
      // add only HOME button to the left when going to the first lesson
      addHomeButtonToTheNavigationMenu();
    } else {
      // add both home and go back buttons when going to any lesson except for the very first (i.e. bread)
      addHomeButtonToTheNavigationMenu();
      addGoBackToPreviousButtonToTheNavigationMenu();
    }
    handleGoingFullscreenOnMobiles();

    // Make the loading animation appear (i.e. bring the preloader)
    preloadHandlingDiv.classList.remove("addThisClassToHideIt"); // See css_for_every_single_html
  }
} else {
  // First time users will proceed via openFirstLesson()
  // localStorage.theLastCheckpointSavedInLocalStorage is created in lesson 1-1-1 and updated with every lesson in the following units.
}

// For languages like Arabic we need to know the user's gender.
// Let the webp img files be downloaded and ready before the button to reveal them is clicked/touched.
const malesIcon = document.createElement("IMG");
const femalesIcon = document.createElement("IMG");
malesIcon.src = "user_interface/images/gender_gentlemen.webp";
femalesIcon.src = "user_interface/images/gender_ladies.webp";

/*What language will be taught via the iframe*/
/* JA - Hito */
function letTheIFrameTeachJapanese(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "ja";
  openFirstLesson();
}
/* ZH - Ren */
function letTheIFrameTeachChinese(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "zh-TW";
  openFirstLesson();
}
/* TR - Kişi */
function letTheIFrameTeachTurkish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "tr";
  openFirstLesson();
}
/* AR Arabic */
function letTheIFrameTeachArabic(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "ar-SA"; // Android is OK with ar but iPhone needs ar-SA
  // Get user's gender
  const darkenWholeViewportDiv = document.createElement("DIV");
  darkenWholeViewportDiv.classList.add("darkenTheWholeViewportClass");
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
    setTimeout( function ()  {
      openFirstLesson();
      document.body.removeChild(darkenWholeViewportDiv);
      document.body.removeChild(gentlemenButtonDiv);
      document.body.removeChild(ladiesButtonDiv);
    },1500);
  }
}
/* EN - People */
function letTheIFrameTeachEnglish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "en";
  openFirstLesson();
}

/*___________Navigate to first lesson_____________*/
function openFirstLesson() {
  // Save language choice
  localStorage.theLanguageUserWasLearningLastTime = theLanguageUserIsLearningNow;
  // Set language
  if (annyang) {
      annyang.setLanguage(theLanguageUserIsLearningNow); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }

  handleGoingFullscreenOnMobiles();

  setTimeout(function() {
    // Hide the welcome screen ( <<choose the language you want to learn>> screen's menu-div)
    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "8000px";
    // Display the first lesson
    iFrameScriptAccess.src = "lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
  },50); // Unnoticable tiny delay

  // Make the loading animation appear (i.e. bring the preloader)
  preloadHandlingDiv.classList.remove("addThisClassToHideIt"); // See css_for_every_single_html
}

function handleGoingFullscreenOnMobiles() {
  // Try to go fullscreen on mobile devices. Note that this won't work on iPhones!
  if (deviceDetector.isMobile) {
    // Going fullscreen on mobiles will make the nav menu sink down and disappear because
    // as you can find in js_for_the_sliding_navigation_menu.js -> the resize event triggers hideOrUnhideTheNavigationMenuOnMobilesDependingOnFullscreen()
    openFullscreen(); // See js_for_handling_fullscreen_mode.js
    // WARNING: iPhone's Safari won't allow fullscreen! caniuse.com says it is allowed on iPads but wasn't able to test it as of July 2021.
    // So since resize doesn't happen on iPhones we must manually do the first sinking of the nav menu like this.
    if (deviceDetector.device == "phone" && detectedOS.name == "iOS") {
      // Just hide the nav menu since we are unable to go fullscreen
      setTimeout(function () {      makeTheNavMenuGoDownOnMobiles();      },3500); // See js_for_the_sliding_navigation_menu
    }
  } // END OF Try to go fullscreen on mobile ...
}

// Dynamic titles are cool!
const theParentHtmlTitle = document.title;
setInterval( function ()
{
  if (iFrameScriptAccess.contentWindow.document.title) {
    document.title = iFrameScriptAccess.contentWindow.document.title;
  }
  setTimeout( function ()  {   document.title = theParentHtmlTitle   },3000);
} , 6000);

// UI sounds ... also see js_for_browser_device_issues_in_parents.js
const hoverSound = new Howl({  src: ['user_interface/sounds/illuminant_button_hover.mp3']  }); // DESKTOP ONLY!
const clickSound = new Howl({  src: ['user_interface/sounds/illuminant_button_click.mp3']  });

let allIndexButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON"); /*All buttons in parents, without any of the lesson buttons*/
let i;
for (i = 0; i < allIndexButtonElementsAreInThisArray.length; i++)
{
  allIndexButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDown);
  if (deviceDetector.device == "desktop") {
    allIndexButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnter);
  }
}
// Detect first click/first user gesture that unlocks sounds
// REMEMBER: Sliding menu buttons also need this. Handle separately. See js_for_the_sliding_navigation_menu.js
var soundShouldBeUnlockedNow = false;
window.addEventListener("mousedown",function () {  soundShouldBeUnlockedNow = true;  }, {once:true});
function mouseEnter() {
  if (soundShouldBeUnlockedNow) { // TESTED: It works.
    hoverSound.play();
  }
}
function mouseDown() {
  clickSound.play();
}
/*___________*/
// Domain locking against forks etc.
let firstSevenCharactersOfTheAddress = location.hostname.substring(0,7);
switch (location.hostname) {
  case "speakworldlanguages.github.io": // ALLOW
    break;
  case "speakworldlanguages.app": // ALLOW
    break;
  case "birdildahaogreneyim.com": // ALLOW
    break;
  case "hanaserutoiidesuy.one": // ALLOW
    break;
  case "tingdongshijiederenmen.com": // ALLOW
    break;
  case "localhost": // ALLOW
    break;
  default:
    if (firstSevenCharactersOfTheAddress=="192.168") { // ALLOW
      // Do nothing
    } else {
      document.body.style.display = "none";
      alert(location.hostname + " is UNAUTHORIZED!\n1 - DO NOT modify the source code!\n2 - DELETE this fork from your repositories!");
    }
}

/*___________*/
// Do not allow embedding of this app (no re-serving through an alien iframe)
if (self === top) {
    // Display normally
} else {
    /*top.location = self.location; » This doesn’t work directly because of browser policy. Gets blocked as a pop-up window. Use a confirm box before redirecting. */
    document.body.style.opacity = "0.1";
    setTimeout(function () {
      if (confirm("(×_×) → (⌒▽⌒) ?")) {
        top.location = self.location;
      }
    },7000);
}
