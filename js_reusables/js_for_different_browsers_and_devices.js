"use strict";
var willUserTalkToSpeechRecognition = false;
var detectedBrowser, detectedBrowserName;
var detectedOS;
var detectedBrand, detectedBrandName;
var audioFileExtension = "ogg"; // Default to ogg except for Safari // Ogg is better than mp3 but Safari won't play it.
var isApple = false;
var isSafari = false;
var isAndroid = false;
var isWebViewOnAndroid = false;
let wasListeningJustBeforeUserLeft = false; // annyang mic input
//var deactivationSound2;
//var activationSound2;
let userIsAwaySound, userIsBackSound;

window.addEventListener('DOMContentLoaded', function(){

  var parser = new UAParser();
  // Check for browser name on every device
  detectedBrowser = parser.getBrowser(); detectedBrowserName = detectedBrowser.name;
  detectedOS = parser.getOS();
  detectedBrand = parser.getDevice();  detectedBrandName = detectedBrand.vendor;
  /* DESPITE: Being sick of writing special code for Apple */
  if (detectedOS.name == "iOS" || detectedOS.name == "Mac OS" || detectedBrandName == "Apple") {
    audioFileExtension = "mp3";
    Howler.usingWebAudio = false; // force html5
    // Howler.html5PoolSize = 60; // Is it because it's too late???
    isApple=true;
  }

  if (detectedBrowserName.search("Safari") >= 0) {
    isSafari = true;
  }

  // Android Chrome and Webview on Android are different // Like support for change event is not the same in 2022 >>> https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
  if (detectedBrowserName.search("WebView") >= 0) {
    isWebViewOnAndroid = true;
  }

  const searchable_OS_name = detectedOS.name;
  if (searchable_OS_name.search("Android") >= 0) {
    isAndroid=true; // Primary use case: In lesson 1-1-1 bread.js to notify user about microphone timing
  }

  userIsAwaySound = new Howl({  src: ["/user_interface/sounds/user_is_away."+audioFileExtension]  });
  userIsBackSound = new Howl({  src: ["/user_interface/sounds/user_is_back."+audioFileExtension]  });

  // See caniuse.com
  // Samsung Browser PROBLEM SOLVED: See js_for_the_sliding_navigation_menu.js to find the function hideOrUnhideTheNavigationMenuOnMOBILES()
  // Sliding navigation menu used to be triggered oppositely because resize and fullscreenchange events fired at different times in Chrome and in Samsung Browser.
  // The solution was introducing a small delay with setTimeout() so that events fire in the same order.

  /*______SWITCH_______*/
  switch (detectedBrowser.name) { // See https://github.com/faisalman/ua-parser-js
    case "Chrome": willUserTalkToSpeechRecognition = true;
      break;
    case "Chromium": willUserTalkToSpeechRecognition = true;
      break;
    case "Chrome WebView": willUserTalkToSpeechRecognition = true;
      break;
    case "Chrome Headless": willUserTalkToSpeechRecognition = true;
      break;
    case "Samsung Browser": willUserTalkToSpeechRecognition = true;
      break;
    case "Safari": willUserTalkToSpeechRecognition = true;
      break;
    case "Mobile Safari": willUserTalkToSpeechRecognition = true;
      break;
    case "Baidu": willUserTalkToSpeechRecognition = true;
      break;
    case "baidu": willUserTalkToSpeechRecognition = true;
      break;
    case "QQ": willUserTalkToSpeechRecognition = true;
      break;
    case "QQBrowser": willUserTalkToSpeechRecognition = true;
      break;
    case "QQBrowserLite": willUserTalkToSpeechRecognition = true;
      break;
    /* __ For IE users __ */
    case "IE": alert("(⊙_⊙)\nWhat? Internet Explorer?\nIs this a computer or is it a software museum?"); willUserTalkToSpeechRecognition = false;
      break;
    case "IEMobile": alert("(⊙_⊙)\nWhat? Internet Explorer?\nThis device is like a software museum!"); willUserTalkToSpeechRecognition = false;
      break;
    /* __ For Edge users __ */
    case "Edge": // willUserTalkToSpeechRecognition = true;
      // break; // NOTE-THAT: Skipping break will make defaults fire in any case
    /* __ For Opera users __ */
    case "Opera": // alert("Opera ↹ Chrome");
      /*break;*/ // NOTE-THAT: Skipping break will make defaults fire in any case

    // Opera mobile is like Chrome with an Opera skin. So it may be whitelisted.

    /* __ Everything else including Firefox __ */
    default: // What to do if the browser is not whitelisted
      if (localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed == "yes") {
        // DO NOTNING here means “Don't display the annoying alert boxes anymore.”
      } else {
        localStorage.browserIsNotWhitelistedNotificationHasAlreadyBeenDisplayed = "yes"; // Display the notifications only once by using this.
        setTimeout(function () {
          // A crude alert box is shown if the user's browser is not Chrome or another Web Speech API compatible one.
          const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_browser_support_is_unknown.txt";
          fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
            // Display in UI language: “X browser did not support speech features last time we checked. Try using Chrome if it still doesn't.”
            alert(detectedBrowser.name+contentOfTheTxtFile);
          });
        },1500);
      }
  }
  /*______END OF SWITCH_______*/

  // NOT TO SET BUT TO GET THE LAST permission SETTINGS
  if ("permissions" in navigator) {
    // Read the last setting
    const micPermissionPromise = navigator.permissions.query({name:'microphone'});
    micPermissionPromise.then(function(result1) { // Handle Windows & Android ...mainly Chrome
      console.log("This is a good browser that supports permissions API along with microphone permissions");
      if (result1.state == 'granted') {
        willUserTalkToSpeechRecognition = true;
        console.log("Microphone permission already granted previously");
      } else if (result1.state == 'denied') {
        willUserTalkToSpeechRecognition = false;
        console.log("Microphone permission is already set to DENIED");
      } else {
        // Use if needed: if (result1.state == 'prompt') // Please allow will be showing unless removed
        localStorage.removeItem("allowMicrophoneDialogHasAlreadyBeenDisplayed");
        console.log("Microphone permission must be taken");
      }
    }).catch(function () { // Handle Firefox ...hopefully
      // User's browser has permissions API but it does not let us check microphone permissions!
      console.log("This browser supports permissions API but microphone permissions are not available");
    });
  } else {
    // User's browser doesn't have permissions API at all.
    console.log("This browser doesn't have permissions API at all");
  }


  /*________________________________________*/
  // Handle lesson PAUSE with visibility change on mobile devices for return after tab navigation or when on/off button is pressed etc.
  // Use “var” (not “const”) for things that need to be accessible from elsewhere.

  /* MAYBE this should be deprecated */
  let continueAfterPauseMsgFromTxtFileInUILanguage = "Continue?"; // Get the actual text from txt file and use it instead of this default.
  const filePathForTheContinueLessonText = "/user_interface/text/"+userInterfaceLanguage+"/0-continue_after_pause.txt";
  fetch(filePathForTheContinueLessonText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ continueAfterPauseMsgFromTxtFileInUILanguage = contentOfTheTxtFile; }); // See js_for_every_single_html.js for the headers thingy.


  // Note: The following enables annyang to restart after a PAUSE when user has been AWAY or has turned off his mobile device's screen. Desktops don't need any handling for that.
  // Note: Annyang's behaviour is similar to the "visibilitychange" event. That is different from window "blur/focus" event. See https://stackoverflow.com/questions/58148482/document-visibilitychange-versus-window-blur-focus-what-is-the-difference-when/58148483#58148483

  if (deviceDetector.isMobile) {
    // ON MOBILES
    /**/
    document.addEventListener("visibilitychange", handleVisibilityChangeOnMobilesFunction);
    function handleVisibilityChangeOnMobilesFunction()
    {
      let newVolume;
      let i = 1;
      if (document.hidden) {
          // console.log("hidden means user is gone"); // This fires when ON-OFF button of the device is pressed.
          userIsAwaySound.play(); // It can't flood can it?
          // Handle audio.
          // DEPRECATED: Howler._howls.forEach(function(nextAudioToFadeToSilence) {  nextAudioToFadeToSilence.fade(1, 0, 1200);  });
          // REMEMBER: On mobiles Howler.volume() always starts at 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-DOWN for global volume
          let nineteenSteps = setInterval(littleByLittle,49);
          function littleByLittle() {
            newVolume = 1 - i*0.05; // The last one will be 1- 19*0.05 = 1 - 0.95 = 0.05
            newVolume = Number(newVolume.toFixed(2)); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.abs() to prevent falling below zero.
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(0); clearInterval(nineteenSteps);   }
            i++;
          }
          // Handle microphone
          if (annyang) {
            wasListeningJustBeforeUserLeft = annyang.isListening();
            if (!isApple) {  annyang.abort();  } // without this annyang.start() won't function.
          }
          // Try to make the app pause when ON/OFF button of the phone/tablet is pressed, but do not block annyang restart.
          if (!isApple) { // WEIRD: alert boxes mute and unmute sounds and keep toggling in Safari
            setTimeout(function() { alert(continueAfterPauseMsgFromTxtFileInUILanguage); },999);
          }
          /*SHOULD THIS BE DEPRECATED? MAYBE YES -> setTimeout(function() {          alert(continueAfterPauseMsgFromTxtFileInUILanguage);         },999);*/
          // Either find a solution or notify iPhone (and maybe iPad users too) about the muting and unmuting effect of alert boxes.
      } else {
          // console.log("visible means user is back");
          // WARNING: Returning from AUTO-SLEEP DOES NOT MAKE THIS FIRE! (It is not like user pressing ON/OFF button twice)
          // AUTO-SLEEP is not counted as user being away according to document.hidden
          // This works only in case user presses ON/OFF button twice
          setTimeout(function () { resetSleepCountdown(); }, 111); // See sleep-control.js

          // Handle audio
          // DEPRECATED: Howler._howls.forEach(function(nextAudioToFadeBackFromSilence) {  nextAudioToFadeBackFromSilence.fade(0, 1, 1200);  });
          // REMEMBER: On mobiles Howler.volume() is always 1 and is never changed. User adjusts OS volume natively with the device buttons.
          // Custom FADE-UP for global volume
          let nineteenSteps = setInterval(littleByLittle,10);
          function littleByLittle() {
            newVolume = i*0.05; // The last one will be 0.95
            newVolume = Number(newVolume.toFixed(2)); // Some kind of bugginess in Chrome makes this necessary. // No need to use Math.round() to make sure it never goes above 1
            Howler.volume(newVolume);
            if (i > 18) {     Howler.volume(1); clearInterval(nineteenSteps);   }
            i++;
          }

          // NICE ENOUGH
          setTimeout(function() { userIsBackSound.play(); },130); // lag cannot be too long

          // Handle microphone
          // MUST restart annyang if was listening!
          if (wasListeningJustBeforeUserLeft) {
            setTimeout(function() {          if (annyang){ annyang.start(); }           },1500); // used to be 1001
          }
          // On mobiles, we want to go back to fullscreen because the alert box has made the browser exit fullscreen
          // Unfortunately requestFullscreen gets blocked because Chrome does not count an alert box click as a valid user gesture
          // See https://stackoverflow.com/questions/66242084/chrome-does-not-count-closing-an-alert-box-as-a-valid-user-gesture-therefore-unl
          // if (deviceDetector.isMobile){ // CANNOT USE
          //   setTimeout(function () {  o-p-e-n-F-u-l-l-s-c-r-e-e-n();  },100); // CANNOT USE
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
                if (firstUserGestureHasUnleashedAudio) { userIsAwaySound.play(); }
            } else {
                // console.log("visible means user is back");
                if (firstUserGestureHasUnleashedAudio) { userIsBackSound.play(); }
            }
          }
  }

}, { once: true });
// END OF DOMContentLoaded

/**/
/*________________window LOAD___________________*/
let allowMicrophoneBlinker;



window.addEventListener("load",function() {


  /*
  // DISABLED THIS BECAUSE of suspected service worker miscaching -> Why does blank.html appear in dynamic caching despite being listed in static resources
  // CHECK IF WE STILL NEED THIS: Maybe this is not necessary anymore since iframe src is now assigned after parent level window load event
  // Resolve the Firefox refresh button issue... After an F5 refresh the frame is supposed to be blank but Firefox shows the last loaded html. Yet if we hit ENTER on the address bar it clears as expected. To make F5/refresh clear the frame (just like when ENTER is hit) we have to "force" it.
  let whatTheFileNameInIframeSrcIs = ayFreym.src.substring(ayFreym.src.length - 10, ayFreym.src.length - 5); // Get the name of the html file from a string like "/user_interface/blank.html"
  if (whatTheFileNameInIframeSrcIs == "blank") { // This works. HOWEVER: Could also use let result = ayFreym.src.search("blank"); if(result>=0){}
    setTimeout(function () {  ayFreym.src="/user_interface/blank.html"  },100); // Force empty! At last! Blank as it is supposed to be.
  }
  */
  allowMicrophoneBlinker = document.getElementById('allowMicrophoneDivID');
  const filePathForAllowMicrophoneText = "/user_interface/text/"+userInterfaceLanguage+"/0-allow_microphone.txt";
  fetch(filePathForAllowMicrophoneText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ allowMicrophoneBlinker.children[1].innerHTML =  contentOfTheTxtFile; });
  //PROBABLY BETTER WITHOUT:  checkMicPermission(); // check it even if user has landed on progress chart
  /* UPDATE : Safari 16 finally has full support for permissions including microphone, phew! */
  // if (isApple) { // As of Safari 16.0 we cannot react to user's choice: "Don't allow" "Allow" // Check caniuse permissions microphone
  //   setTimeout(function () { testAnnyangAndAllowMic(); },1111); // So we trigger the prompt at the beginning right after landing
  // }

}, { once: true });

const blockAllClicksAndHoversDIV = document.createElement("DIV"); // During mic permission prompt
function removeAllowMicrophoneBlinkerSoftly() {
  allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogDisappear"); // No matter what the choice is // Works for both desktop and mobile
  setTimeout(function () {     allowMicrophoneBlinker.parentNode.removeChild(allowMicrophoneBlinker);     },1501);
  if (deviceDetector.device == "desktop") {
    blockAllClicksAndHoversDIV.style.animationName = "theDarkeningBackgroundDisappears"; // See css_for_the_container_parent_html
    setTimeout(function () {     document.body.removeChild(blockAllClicksAndHoversDIV);     },5000); // Keep blocking hovers until first lesson shows
  }
}
function removeAllowMicrophoneBlinkerForcedly() {
  // Immediate HARD REMOVE » Never let anything appear
  allowMicrophoneBlinker.parentNode.removeChild(allowMicrophoneBlinker);
  if (deviceDetector.device == "desktop") { document.body.removeChild(blockAllClicksAndHoversDIV); }
}
/*---*/

/* __Test microphone and get allowed if need be__ */
function testAnnyangAndAllowMic(nameOfButtonIsWhatWillBeTaught) {
  // Check if Speech Recognition API is supported (AT LEAST IN THEORY because Opera, in 2020, says yes but doesn't).
  if (annyang) {
    // For first-time users, try to get the “allow microphone” issue solved as soon as possible.
    if (localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed == "yes") { // There used to be a problem here like a double firing when index.html redirected to ja.html or tr.html shortly after landing because of UI language.
        startTeaching(nameOfButtonIsWhatWillBeTaught); // Not a fresh user: User must be trying to learn a different language
    } else { // A first ever fresh user
        // Make the “allow microphone” box appear for users who have arrived for the first time by a quick TURN ON AND THEN OFF thing.
        const httpORhttps = window.location.protocol.toLowerCase(); // the app's custom "please allow" box must appear only on https (not http)
        // In case of testing on http://localhost we don't want "Allow-Deny" dialog to appear
        if (httpORhttps.search("https") >= 0) {
          if (deviceDetector.isMobile) { // PHONES AND TABLETS
            // Mobiles already have a native touch blocker
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearMobile"); // 1.5s See css_for_the_container_parent_html
          } else { // DESKTOPS
            // On desktops create and display a full viewport half opaque DIV to block all hovering and clicking while native allow box is showing
            blockAllClicksAndHoversDIV.classList.add("allowMicDesktopBackground"); document.body.appendChild(blockAllClicksAndHoversDIV); // See css_for_the_container_parent_html
            allowMicrophoneBlinker.classList.add("letYouMustAllowMicrophoneDialogAppearDesktop"); // 1.5s See css_for_the_container_parent_html
          }
        } else {
          willUserTalkToSpeechRecognition = false; // if somehow http instead of https
        }

        //
        // ---Permission handling---
        // These will be executed only when testAnnyangAndAllowMic is called » when a welcome screen button is touched/clicked
        // UPDATE: As of late 2022 Safari 16.0 finally has full support for permissions API, phew!
        let changeEventIsNotSupported = false;
        if ("permissions" in navigator) {
            console.log("Can we check microphone permission state...?");
            const micPermissionPromise = navigator.permissions.query({name:'microphone'});
            micPermissionPromise.then(function(result2) { // Handle mic permission
              console.log("...yes and that is good.");
              if (result2.state == 'granted') {
                console.log("Already granted so let's start the app");
                removeAllowMicrophoneBlinkerForcedly(); // Immediate HARD REMOVE » Never let anything appear
                startTeaching(nameOfButtonIsWhatWillBeTaught);
              } else {
                // Use if needed: if (result2.state == 'prompt') // Please allow will be showing unless removed
                // Use if needed: if (result2.state == 'denied') // Please allow will be showing unless removed

                // SAFARI ignores onchange
                // https://developer.mozilla.org/en-US/docs/Web/API/PermissionStatus/change_event
                // According to mozilla Android Webview also acts like Safari rather than Chrome
                // So let's try to make it handleable
                if (isApple || isWebViewOnAndroid) { // IT WOULD BE BETTER IF we could actually detect if browser supports change event!!!
                  changeEventIsNotSupported = true;
                }
              }

              result2.addEventListener('change', proceedAccordingToUsersChoiceAboutMicPermission);
              function proceedAccordingToUsersChoiceAboutMicPermission(event) {
                if (event) { console.log("User's answer was detected by listening to the CHANGE event"); }

                if (result2.state == 'prompt') {} // Is this ever possible in any browser? It could be in Safari 16.0 if proceedAccordingToUsersChoiceAboutMicPermission is called without the CHANGE event and no answer is given
                else { // Was either allowed or denied
                  localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes";
                  if (result2.state == 'granted') { willUserTalkToSpeechRecognition = true; console.log("User has chosen OK for microphone"); } // In case user is on an unknown browser that supports "Speech Recognition"
                  if (result2.state == 'denied') { willUserTalkToSpeechRecognition = false; console.log("User has chosen NO for microphone "); } // Even if user's browser supports it
                }
                // When the setting is changed anyhow
                removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                // The first lesson may start in 1502ms
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              }


            }).catch(function () { // Handle exceptional browsers ...hopefully
              console.log("...no, even though support for permissons API exists."); // Firefox???
              if (nameOfButtonIsWhatWillBeTaught) { // This is expected to be executed when a language button is clicked/touched on Apple devices
                removeAllowMicrophoneBlinkerForcedly(); // Immediate HARD REMOVE » Never let anything appear
                startTeaching(nameOfButtonIsWhatWillBeTaught); // Start the app // See js_for_app_initialization_in_parent
              } else { // This is expected to be executed (1111ms) after window load once at the beginning (no button name passed as parameter) on Safari 16.0
                localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes"; // This is a lie. We lie so that it won't be triggered again.
                setTimeout(function () { removeAllowMicrophoneBlinkerSoftly(); },3000); // With nice animation » Should work both on mobile and desktop
              }
            });
        } else { // permissions query not supported at all but annyang exists
          console.log("No permissions API... What do we do now?");
          // What browser could be handled here???
          // According to caniuse July 2022, browsers that have no permissions API: IE & QQ Browser & Baidu browser & Opera Mobile
          setTimeout(function () {    removeAllowMicrophoneBlinkerSoftly();    },3000);
          // The first lesson may start in 1502ms
          setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },4500);
        }
        // END OF ---Permission handling---

        // Either with or without permissons API
        setTimeout(function () {     annyang.start();     },1503); // This will make the prompt box appear for allowing microphone usage

        // While the user is viewing the dialog box and deciding whether or not to press OK
        let tryToAbortEveryThreeSeconds = setInterval(function () {
          if (annyang.isListening()) {
            // On Apple we must keep the mic ON, otherwise it will continue asking "Do you want to allow" everytime the mic is turned ON again
            if (!isApple) {   annyang.abort();  }
            clearInterval(tryToAbortEveryThreeSeconds);
            if (changeEventIsNotSupported) {
              const micPermissionPromise = navigator.permissions.query({name:'microphone'});
              micPermissionPromise.then(function(result3) { // Handle Windows & Android ...mainly Chrome
                console.log("User's answer was NOT detected by any change event but a timeout");
                if (result3.state == 'prompt') { console.log("User did not answer"); }
                else { // Was either allowed or denied
                  localStorage.allowMicrophoneDialogHasAlreadyBeenDisplayed = "yes";
                  if (result3.state == 'granted') { willUserTalkToSpeechRecognition = true; console.log("User has chosen OK for microphone"); } // In case user is on an unknown browser that supports "Speech Recognition"
                  if (result3.state == 'denied') { willUserTalkToSpeechRecognition = false; console.log("User has chosen NO for microphone "); } // Even if user's browser supports it
                }
                removeAllowMicrophoneBlinkerSoftly(); // With nice animation » Should work both on mobile and desktop
                // The first lesson may start in 1502ms
                setTimeout(function () {     startTeaching(nameOfButtonIsWhatWillBeTaught);     },2002);
              });
            }
          }
        },3000);
    } // End of what to do for fresh users who have seen the app first time ever
  } // End of if (annyang)
  else { // No annyang,,, REMEMBER: Opera and Edge lie and return true even though they don't support it (2022).
    // A crude alert box is shown if speech recognition is not supported.
    setTimeout(function () {
      const filePath = "/user_interface/text/"+userInterfaceLanguage+"/0-if_speech_recognition_is_not_working.txt"; // "Better if you use Chrome" msg
      fetch(filePath,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){  alert(contentOfTheTxtFile);  });
    },500);
    // New policy: The app won't proceed without annyang (except for the two liars i.e. Opera and Edge)
  }
}
/**/
