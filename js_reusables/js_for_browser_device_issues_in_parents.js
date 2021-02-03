var isTheUsersBrowserWhitelisted = false;
window.addEventListener('DOMContentLoaded', function(){

  var parser = new UAParser();
  // Check for browser name on every device
  detectedBrowser = parser.getBrowser();
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
    case "IE": alert("(⊙_⊙)\nInternet Explorer???\nYour device is a SOFTWARE MUSEUM!");
      break;
    case "IEMobile": alert("(⊙_⊙)\nInternet Explorer???\nYour device is a SOFTWARE MUSEUM!");
      break;
    /* __ Everything else __ */
    default: // What to do if the browser is not whitelisted
      if (localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed == "yes") {
        // DO NOTNING here means “Don't display the annoying alert boxes anymore.”
      } else {
        localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed = "yes"; // Display th notifications only once by using this.
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
      var tryToAbortEveryThreeSeconds = setInterval(function () {
        if (annyang.isListening()) {
          annyang.abort();
          clearInterval(tryToAbortEveryThreeSeconds);
          //setTimeout(function () {  navigator.vibrate(1);  },4000); // This is for browsers (like Firefox Mobile) which ask the user if he/she wants to allow vibration.
        }
      },3000);
    } // End of inner “else”
  } // End of if (annyang)

  /*________________________________________*/
  // Handle lesson PAUSE with visibility change on mobile devices for return after tab navigation or when on/off button is pressed etc.
  // Use “var” (not “const”) for things that has to be accessible from elsewhere.
  var userGoesAway = new Howl({  src: ['user_interface/sounds/user_goes_away.mp3']  }); // DESKTOP ONLY!
  var userReturns = new Howl({  src: ['user_interface/sounds/user_returns.mp3']  }); // DESKTOP ONLY!
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
            if (document.hidden) {
                // console.log("hidden means user is gone");
                // Handle audio
                Howler._howls.forEach(function(nextAudioToFadeToSilence) {         nextAudioToFadeToSilence.fade(1, 0, 1200);         });
                // Handle microphone
                if (annyang) {
                  wasListeningJustBeforeUserLeft = annyang.isListening();
                  annyang.abort(); // without this annyang.start() won't function.
                }
                alert(continueAfterPauseMsgFromTxtFileInUILanguage); // Try to make the app pause when On/Off button of the phone/tablet is pressed, but do not block annyang restart.
            } else {
                // console.log("visible means user is back");
                // Handle audio
                Howler._howls.forEach(function(nextAudioToFadeBackFromSilence) {         nextAudioToFadeBackFromSilence.fade(0, 1, 1200);         });
                // Handle microphone
                //MUST restart annyang if was listening!
                if (wasListeningJustBeforeUserLeft) {
                  setTimeout(function() {          if (annyang){ annyang.start(); }              },1000);
                }
            }
          }
      // Maybe could use window blur focus && iframe blur focus to handle userGoesAway.play(); userReturns.play(); OR MAYBE should find another solution.
  }
  else {
    // ON DESKTOPS
    document.addEventListener("visibilitychange", handleVisibilityChangeOnDesktopsFunction);
    function handleVisibilityChangeOnDesktopsFunction()
          {
            if (document.hidden) {
                // console.log("hidden means user is gone");
                // Handle audio at will
                userGoesAway.play();
            } else {
                // console.log("visible means user is back");
                // Handle audio at will
                userReturns.play();
            }
          }
  }

}, { once: true });

window.addEventListener("load",function() {

  /*___________________________________*/
  // Resolve the Firefox refresh button issue... After an F5 refresh the frame is supposed to be blank but Firefox shows the last loaded html. Yet if we hit ENTER on the address bar it clears as expected. To make F5/refresh clear the frame (just like when ENTER is hit) we have to "force" it.
  let whatTheFileNameInIframeSrcIs = iFrameScriptAccess.src.substring(iFrameScriptAccess.src.length - 10, iFrameScriptAccess.src.length - 5); // Get the name of the html file from a string like "/user_interface/blank.html"
  if (whatTheFileNameInIframeSrcIs == "blank") {
    setTimeout( function ()  {   iFrameScriptAccess.src="user_interface/blank.html"  },100); // Force empty! At last! Blank as it is supposed to be.
  }

}, { once: true });
