﻿// This is deferred.
// Use this instead of inline script in index.html
window.addEventListener('DOMContentLoaded', function(){
  // switch (browserLanguage) { // See js_for_every_single_html.js
  //   case "tr":
  //     if (location.hostname != "birdildahaogreney.im") {
  //       window.open("https://birdildahaogreney.im/","_top");
  //     }
  //     break;
  //   case "ja":
  //     if (location.hostname != "hanaserutoiidesuy.one") {
  //       window.open("https://hanaserutoiidesuy.one/","_top");
  //     }
  //     break;
  //   default:
  //     if (location.hostname != "speakworldlanguag.es") {
  //       window.open("https://speakworldlanguag.es/","_top");
  //     }
  // }
}, { once: true });


var theLanguageUserIsLearningNow;
const iFrameScriptAccess = document.getElementById('theIdOfTheIframe');

// CODE TO BE REMOVED AFTER TESTS IS
// FROM HERE
//localStorage.theLastCheckpoint = "lessons_in_iframes/level_1/unit_7/lesson_2/"; // Only for testing.
//localStorage.theLanguageUserWasLearningLastTime = "tr";
// TO HERE

// Continue progress from last unit
if (localStorage.theLastCheckpoint) { // See if a previously saved checkpoint exists.
  // MUST USE display:none to avoid click blocking by z-index.
  document.getElementById('fullViewportPositionFixedDivAsContainerOfLoadCheckpointPrompt').classList.add("addThisForOpacityAnimationFadeIn");
  // NOTE: Chrome does not count an alert box click as a user gesture.
  theLanguageUserIsLearningNow = localStorage.theLanguageUserWasLearningLastTime; // Looks like there is no need to put this in an if(localStorage.theLanguageUserWasLearningLastTime){} to check if it exists.
  if (annyang) {
      annyang.setLanguage(theLanguageUserIsLearningNow); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }
  function whenLoadLastLessonOkButtonIsClickedOrTapped() { // See a parent document like index.html, ja.html, tr.html to find that button.
    // WARNING: Must see if 5000px is enough not to cause a problem with very high desktop resolutions like 4K.
    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "5000px";
    iFrameScriptAccess.src = localStorage.theLastCheckpoint;
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
  }
} else {
  // First time users will proceed via openFirstLesson()
  // localStorage.theLastCheckpoint is created in lesson 1-1-1 and updated with every lesson in the following units.
}

function letTheIFrameTeachTurkish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "tr";
  openFirstLesson();
}

function letTheIFrameTeachHitoicJapanese(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "ja";
  openFirstLesson();
}

function letTheIFrameTeachEnglish(){ //See index.html to find the button that triggers this via onclick.
  theLanguageUserIsLearningNow = "en";
  openFirstLesson();
}

function openFirstLesson() {
  localStorage.theLanguageUserWasLearningLastTime = theLanguageUserIsLearningNow;
  if (annyang) {
      annyang.setLanguage(theLanguageUserIsLearningNow); // Firefox v60's and v70's won't let buttons function unless this is wrapped in an if (annyang){} like this.
  }

  setTimeout(function() {
    // Hide the welcome screen ( <<choose the language you want to learn>> screen's menu-div)
    document.getElementById('fullViewportPositionFixedDivAsContainerOfTheMenu').style.left = "5000px";
    // Display the first lesson
    iFrameScriptAccess.src = "lessons_in_iframes/level_1/unit_1/lesson_1/index.html";
  },50); // Unnoticable tiny delay
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
const hoverSound = new Howl({  src: ['user_interface/sounds/select_language_hover.mp3']  }); // DESKTOP ONLY!
const clickSound = new Howl({  src: ['user_interface/sounds/select_language_click.mp3']  });

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
  case "speakworldlanguag.es": // ALLOW
    break;
  case "birdildahaogreney.im": // ALLOW
    break;
  case "hanaserutoiidesuy.one": // ALLOW
    break;
  case "tingdongshijiederen.men": // ALLOW
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
// Do not allow embedding of this app (no re-serve through an iframe)
if (self === top) {
    // Display normally
} else {
    /*top.location = self.location; » This doesn’t work directly because of browser policy. It blocked as a pop-up window */
    document.body.style.opacity = "0.1";
    setTimeout(function () {
      if (confirm("(×_×) → (⌒▽⌒) ?")) {
        top.location = self.location;
      }
    },7000);
}
/*____________*/
// Odtü detector
var detectODTUscript = document.createElement('script');
detectODTUscript.setAttribute('type', 'application/javascript');
detectODTUscript.setAttribute('src', 'https://api.ipify.org?format=jsonp&callback=getIP');
document.getElementsByTagName('head')[0].appendChild(detectODTUscript);

function getIP(json) {
    var aypii = json.ip;
    var ilk7karakter = aypii.substring(0,7);
    setTimeout(function () {
      if (ilk7karakter == "144.122") {
        var answer = prompt("ODTÜ’de iyi insan azdır. Sen iyi insan mısın? İyi insan isen EVET diye", "buraya yaz. If you don’t speak Turkish please type NOTURKISH and click OK.");
        if (answer == "evet" || answer == "Evet" || answer == "EVET" || answer == "NOTURKISH") {
          // Engel yok
        }
        else {
          document.body.style.display = "none";
        }
      }
    },1000);
 }

// <script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>
