var isTheUsersBrowserWhitelisted = false;
var detectedBrowser;
var detectedOS;
var audioFileExtension = "mp3"; // Default to ogg except for Safari // Ogg is better than mp3 but Safari won't play it

var deactivationSound2;
var activationSound2;

window.addEventListener('DOMContentLoaded', function(){

  var parser = new UAParser();
  // Check for browser name on every device
  detectedBrowser = parser.getBrowser();
  detectedOS = parser.getOS();
  /* DESPITE: Being sick of writing special code for Apple */
  if (detectedOS.name == "iOS" || detectedOS.name == "Mac OS") {
    audioFileExtension = "mp3";
  }

  deactivationSound2 = new Howl({  src: ['user_interface/sounds/thingy_two_deactivate.'+audioFileExtension]  }); // Mobiles: FULLSCREEN,,, Desktops: CHANGE BROWSER TAB
  activationSound2 = new Howl({  src: ['user_interface/sounds/thingy_two_activate.'+audioFileExtension]  }); // Mobiles: FULLSCREEN,,, Desktops: CHANGE BROWSER TAB
  // See caniuse.com
  // Samsung Browser PROBLEM SOLVED: See js_for_the_sliding_navigation_menu.js to find the function hideOrUnhideTheNavigationMenuOnMOBILES()
  // Sliding navigation menu used to be triggered oppositely because resize and fullscreenchange events fired at different times in Chrome and in Samsung Browser.
  // The solution was introducing a small delay with setTimeout() so that events fire in the same order.

  /*______SWITCH_______*/
  switch (detectedBrowser.name) { // See https://github.com/faisalman/ua-parser-js
    case "Chrome": isTheUsersBrowserWhitelisted = true;
      break;
    case "Chromium": isTheUsersBrowserWhitelisted = true;
      break;
    case "Chrome WebView": isTheUsersBrowserWhitelisted = true;
      break;
    case "Chrome Headless": isTheUsersBrowserWhitelisted = true;
      break;
    case "Samsung Browser": isTheUsersBrowserWhitelisted = true;
      break;
    case "Safari": isTheUsersBrowserWhitelisted = true;
      break;
    case "Mobile Safari": isTheUsersBrowserWhitelisted = true;
      break;
    case "Baidu": isTheUsersBrowserWhitelisted = true;
      break;
    case "baidu": isTheUsersBrowserWhitelisted = true;
      break;
    case "QQ": isTheUsersBrowserWhitelisted = true;
      break;
    case "QQBrowser": isTheUsersBrowserWhitelisted = true;
      break;
    case "QQBrowserLite": isTheUsersBrowserWhitelisted = true;
      break;
    /* __ For IE users __ */
    case "IE": alert("(⊙_⊙)\nWhat? Internet Explorer?\nIs this a computer or is it a software museum?");
      break;
    case "IEMobile": alert("(⊙_⊙)\nWhat? Internet Explorer?\nThis device is like a software museum!");
      break;
    /* __ For Edge users __ */
    case "Edge": alert("Edge ↹ Chrome");
      /*break;*/ // Do the defaults after alert » Don't escape with break
    /* __ For Opera users __ */
    case "Opera": alert("Opera ↹ Chrome");
      /*break;*/ // Do the defaults after alert » Don't escape with break
    /* __ Everything else including Firefox __ */
    default: // What to do if the browser is not whitelisted
      if (localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed == "yes") {
        // DO NOTNING here means “Don't display the annoying alert boxes anymore.”
      } else {
        localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed = "yes"; // Display the notifications only once by using this.
        setTimeout(function () {
          // A crude alert box is shown if the user's browser is not Chrome or another Web Speech API compatible one.
          const filePath = "user_interface/text/"+userInterfaceLanguage+"/0-if_the_browser_does_not_support.txt";
          fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
            // Display in UI language: “X browser did not support speech features last time we checked. Try using Chrome if it still doesn't.”
            alert(detectedBrowser.name+contentOfTheTxtFile);
            // Check if this uncertain browser supports Web Speech API now
            if (!annyang) {
              // A crude alert box is shown if there is a problem with the speech recognition.
              setTimeout(function () {
                const filePath = "user_interface/text/"+userInterfaceLanguage+"/0-if_speech_recognition_is_not_working.txt";
                fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile);  });
              },3100);
            }
          });
        },1500);
      }
  }
  /*______END OF SWITCH_______*/



  /*________________________________________*/
  // Handle lesson PAUSE with visibility change on mobile devices for return after tab navigation or when on/off button is pressed etc.
  // Use “var” (not “const”) for things that need to be accessible from elsewhere.

  let continueAfterPauseMsgFromTxtFileInUILanguage = "Continue?"; // Get the actual text from txt file and use it instead of this default.
  const filePathForTheContinueLessonText = "user_interface/text/"+userInterfaceLanguage+"/0-continue_after_pause.txt";
  fetch(filePathForTheContinueLessonText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ continueAfterPauseMsgFromTxtFileInUILanguage = contentOfTheTxtFile; });// See js_for_fetch_api_character_encoding.js for the headers thingy.
  // Note: The following enables annyang to restart after a PAUSE when user has been AWAY or has turned off his mobile device's screen. Desktops don't need any handling for that.
  // Note: Annyang's behaviour is similar to the "visibilitychange" event. That is different from window "blur/focus" event. See https://stackoverflow.com/questions/58148482/document-visibilitychange-versus-window-blur-focus-what-is-the-difference-when/58148483#58148483
  if (deviceDetector.isMobile) {
    // ON MOBILES
    let wasListeningJustBeforeUserLeft = false;
    document.addEventListener("visibilitychange", handleVisibilityChangeOnMobilesFunction);
    function handleVisibilityChangeOnMobilesFunction()
    {
      let newVolume;
      let i = 1;
      if (document.hidden) {
          // console.log("hidden means user is gone"); // This fires when ON-OFF button of the device is pressed.
          // Handle audio.
          // DEPRECATED: Howler._howls.forEach(function(nextAudioToFadeToSilence) {  nextAudioToFadeToSilence.fade(1, 0, 1200);  });
          // REMEMBER: On mobiles Howler.volume() always starts at 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-DOWN for global volume
          let nineteenSteps = setInterval(littleByLittle,49);
          function littleByLittle() {
            newVolume = 1 - i*0.05; // The last one will be 1- 19*0.05 = 1 - 0.95 = 0.05
            newVolume = newVolume.toFixed(2); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.abs() to prevent falling below zero.
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(0); clearInterval(nineteenSteps);   }
            i++;
          }
          // Handle microphone
          if (annyang) {
            wasListeningJustBeforeUserLeft = annyang.isListening();
            annyang.abort(); // without this annyang.start() won't function.
          }
          // Try to make the app pause when ON/OFF button of the phone/tablet is pressed, but do not block annyang restart.
          setTimeout(function() {          alert(continueAfterPauseMsgFromTxtFileInUILanguage);         },999);
          // Either find a solution or notify iPhone (and maybe iPad users too) about the muting and unmuting effect of alert boxes.
      } else {
          // console.log("visible means user is back");
          // Handle audio
          // DEPRECATED: Howler._howls.forEach(function(nextAudioToFadeBackFromSilence) {  nextAudioToFadeBackFromSilence.fade(0, 1, 1200);  });
          // REMEMBER: On mobiles Howler.volume() is always 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-UP for global volume
          let nineteenSteps = setInterval(littleByLittle,49);
          function littleByLittle() {
            newVolume = i*0.05; // The last one will be 0.95
            newVolume = newVolume.toFixed(2); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.round() to make sure it never goes above 1
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(1); clearInterval(nineteenSteps);   }
            i++;
          }
          // Handle microphone
          // MUST restart annyang if was listening!
          if (wasListeningJustBeforeUserLeft) {
            setTimeout(function() {          if (annyang){ annyang.start(); }           },1001);
          }
          // On mobiles, we want to go back to fullscreen because the alert box has made the browser exit fullscreen
          // Unfortunately requestFullscreen gets blocked because Chrome does not count an alert box click as a valid user gesture
          // See https://stackoverflow.com/questions/66242084/chrome-does-not-count-closing-an-alert-box-as-a-valid-user-gesture-therefore-unl
          // if (deviceDetector.isMobile){ // CANNOT USE
          //   setTimeout(function () {  openFullscreen();  },100); // CANNOT USE
          // } // CANNOT USE
      }
    }
    // Using window blur focus to handle sounds DOES NOT WORK... Double-fires, misfires etc... No easy solution.
  }
  else {
    // ON DESKTOPS
    document.addEventListener("visibilitychange", handleVisibilityChangeOnDesktopsFunction);
    function handleVisibilityChangeOnDesktopsFunction()
          {
            if (document.hidden) {
                // console.log("hidden means user is gone");
                deactivationSound2.play();
            } else {
                // console.log("visible means user is back");
                activationSound2.play();
            }
          }
  }

}, { once: true });

window.addEventListener("load",function() {

  /*___________________________________*/
  // Resolve the Firefox refresh button issue... After an F5 refresh the frame is supposed to be blank but Firefox shows the last loaded html. Yet if we hit ENTER on the address bar it clears as expected. To make F5/refresh clear the frame (just like when ENTER is hit) we have to "force" it.
  let whatTheFileNameInIframeSrcIs = ayFreym.src.substring(ayFreym.src.length - 10, ayFreym.src.length - 5); // Get the name of the html file from a string like "/user_interface/blank.html"
  if (whatTheFileNameInIframeSrcIs == "blank") { // This works. HOWEVER: Could also use let result = ayFreym.src.search("blank"); if(result>=0){}
    setTimeout( function ()  {   ayFreym.src="user_interface/blank.html"  },100); // Force empty! At last! Blank as it is supposed to be.
  }

}, { once: true });

/* __Test microphone and get allowed if need be__ */
function testAnnyang() {
  // Check if Speech Recognition API is supported (AT LEAST IN THEORY because Opera, in 2020, says yes but doesn't).
  if (annyang) {
    // For first-time users, try to get the “allow microphone” issue solved as soon as possible.
    if (localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed == "yes") { // There used to be a problem here like a double firing when index.html redirected to ja.html or tr.html shortly after landing because of UI language.
      // THE REASON WHY we don't want to repeat the microphone test every time the app starts running is because it DINGS on mobiles.
      // So start doing nothing with the 2nd visit and forever.
    }
    else {
      // Make the “allow microphone” box appear for users who have arrived for the first time by a quick TURN ON AND THEN OFF thing.
      setTimeout(function () {  annyang.start(); localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes";  },1000); // Actually any string value makes it return true but the keyword “true” does not.
      // Thus the device shall not uselessly/purposelessly DING every time main menu is viewed.
      // While the user is viewing the dialog box and deciding whether or not to press OK
      let tryToAbortEveryThreeSeconds = setInterval(function () {
        if (annyang.isListening()) {
          annyang.abort();
          clearInterval(tryToAbortEveryThreeSeconds);
          //setTimeout(function () {  navigator.vibrate(1);  },4000); // This is for browsers (like Firefox Mobile) which ask the user if he/she wants to allow vibration.
        }
      },3000);
    } // End of inner “else”
  } // End of if (annyang)
}

/* ____ PWA ____ */
const footerAsInstallButton = document.getElementById('footerInstallID');
const footerAsNotificationButton = document.getElementById('footerNotificationID');
if (deviceDetector.device == "tablet") {
  footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[1].style.display = "block"; // Tablet instead of desktop
} else if (deviceDetector.device == "phone") {
  footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[2].style.display = "block"; // Phone instead of desktop
}
if (deviceDetector.isMobile) {
  footerAsInstallButton.children[3].style.display = "none"; footerAsInstallButton.children[4].style.display = "block"; // Touch instead of click for install
  footerAsNotificationButton.children[1].style.display = "none"; footerAsNotificationButton.children[2].style.display = "block"; // Touch instead of click for notification
  footerAsInstallButton.classList.remove("footerDesktop"); footerAsInstallButton.classList.add("footerTabletAndPhone");
  footerAsNotificationButton.classList.remove("footerDesktop"); footerAsNotificationButton.classList.add("footerTabletAndPhone");
}
const checkUrlToSeeLaunchingOrigin = window.location.href;
const searchResult = checkUrlToSeeLaunchingOrigin.search("installed"); // The search() method returns -1 if no match is found. See manifest_**.json

if (searchResult != -1) {
  // Never show the install button
  footerAsInstallButton.parentNode.removeChild(footerAsInstallButton);
  // Show notification switch instead
  footerAsNotificationButton.style.display = "block";
}

let installationIsSupported = false;
var doYouWantToInstallprompt;
window.addEventListener("beforeinstallprompt",(e)=>{
  installationIsSupported = true;
  e.preventDefault(); // Chrome 67 and earlier needs this
  doYouWantToInstallprompt = e; //
});

function showInstall_PWA_prompt() {

  if (installationIsSupported) {
    doYouWantToInstallprompt.prompt();
    doYouWantToInstallprompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[1].style.display = "none"; footerAsInstallButton.children[2].style.display = "none";
        footerAsInstallButton.children[3].style.display = "none"; footerAsInstallButton.children[4].style.display = "none";
        footerAsInstallButton.children[6].style.display = "block"; // Reads: You can close this and start the app from Home screen

        // On Windows it auto closes the tab and auto switches to the new window
        // On Android it does not auto close and does not switch
        // alert("Good! You can close the browser and restart the app from your Home screen");
        // localStorage the-app-has-been-installed removeChild
      } else {
        // alert ("Find the install in ... menu to ")
      }
      doYouWantToInstallprompt = null;
    });
  } else {
    alert(detectedBrowser.name+" (ㆆ _ ㆆ)");
    footerAsInstallButton.children[3].style.display = "none"; footerAsInstallButton.children[4].style.display = "none"; footerAsInstallButton.children[5].style.display = "block";
  }

}

function askSubscribeToNotifications() {

}

/* appinstalled FIRES ONLY ONCE DURING THE LIFETIME OF THE APP */ /* Side note: Clearing local storage from the browser will clear the app's data too */
/* MDN says, appinstalled is deprecated and according to support table it fires only on Chrome and Edge */
/*
window.addEventListener("appinstalled",(evt)=>{   });
*/

// See manifest.json and use window.location.href to search() for installed
