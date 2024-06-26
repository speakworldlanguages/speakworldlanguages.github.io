// NOTE THAT: Some modifications were applied to the original annyang.js file for speakworldlanguages.app
// 1 - Comments were removed to reduce the file size!
// 2 - Added link to https://webreflection.medium.com/taming-the-web-speech-api-ef64f5a245e1
// 3 - Added code to enable interimResults
// 4 - Added code to notify the user when SpeechRecognition fails to catch words despite the existence of valid audio input
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! annyang
//! version : 2.6.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/


// annyangRestartDelayTime is a MODIFICATION (feature for speakworldlanguages.app)
var annyangRestartDelayTime = 100; // Better if this is increased on Android » See js_for_different_browsers_and_devices
var annyangBetterIfInterimResultsAreDisabled = false;
let restartTimeout = null;
let silenceWasBroken = false;
let numberOfRestartsDespiteDetectionOfAudioInput = 0; // To handle «not being able to catch any words» on all devices
var numberOfStartsAndRestartsRegardlessOfAudioInput = 0; // ON ANDROID we make the game go back to its initial state after a certain number of retries » See js_for_speech_recognition_algorithm

(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD + global
    define([], function () {
      return root.annyang = factory(root);
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(root);
  } else {
    // Browser globals
    root.annyang = factory(root);
  }
})(typeof window !== 'undefined' ? window : undefined, function (root, undefined) {
  'use strict';



  var annyang;

  // Get the SpeechRecognition object, while handling browser prefixes
  var SpeechRecognition = root.SpeechRecognition || root.webkitSpeechRecognition || root.mozSpeechRecognition || root.msSpeechRecognition || root.oSpeechRecognition;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  if (!SpeechRecognition) {
    return null;
  }

  var commandsList = [];
  var recognition;
  var callbacks = { start: [], error: [], end: [], soundstart: [], result: [], resultMatch: [], resultNoMatch: [], errorNetwork: [], errorPermissionBlocked: [], errorPermissionDenied: [] };
  var autoRestart;
  var lastStartedAt = 0;
  var autoRestartCount = 0;
  var debugState = false;
  var debugStyle = 'font-weight: bold; color: #00f;';
  var pauseListening = false;
  var _isListening = false;


  // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
  var optionalParam = /\s*\((.*?)\)\s*/g;
  var optionalRegex = /(\(\?:[^)]+\))\?/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;
  var commandToRegExp = function commandToRegExp(command) {
    command = command.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
      return optional ? match : '([^\\s]+)';
    }).replace(splatParam, '(.*?)').replace(optionalRegex, '\\s*$1?\\s*');
    return new RegExp('^' + command + '$', 'i');
  };

  // This method receives an array of callbacks to iterate over, and invokes each of them
  var invokeCallbacks = function invokeCallbacks(callbacks) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    callbacks.forEach(function (callback) {
      callback.callback.apply(callback.context, args);
    });
  };

  var isInitialized = function isInitialized() {
    return recognition !== undefined;
  };

  // method for logging in developer console when debug mode is on
  var logMessage = function logMessage(text, extraParameters) {
    if (text.indexOf('%c') === -1 && !extraParameters) {
      console.log(text);
    } else {
      console.log(text, extraParameters || debugStyle);
    }
  };

  var initIfNeeded = function initIfNeeded() {
    if (!isInitialized()) {
      annyang.init({}, false);
    }
  };

  var registerCommand = function registerCommand(command, callback, originalPhrase) {
    commandsList.push({ command: command, callback: callback, originalPhrase: originalPhrase });
    if (debugState) {
      logMessage('Command successfully loaded: %c' + originalPhrase, debugStyle);
    }
  };

  var parseResults = function parseResults(results) {
    invokeCallbacks(callbacks.result, results);
    var commandText;
    // go over each of the 5 results and alternative results received (we've set maxAlternatives to 5 above)
    for (var i = 0; i < results.length; i++) {
      // the text recognized
      commandText = results[i].trim();
      if (debugState) {
        logMessage('Speech recognized: %c' + commandText, debugStyle);
      }

      // try and match recognized text to one of the commands on the list
      for (var j = 0, l = commandsList.length; j < l; j++) {
        var currentCommand = commandsList[j];
        var result = currentCommand.command.exec(commandText);
        if (result) {
          var parameters = result.slice(1);
          if (debugState) {
            logMessage('command matched: %c' + currentCommand.originalPhrase, debugStyle);
            if (parameters.length) {
              logMessage('with parameters', parameters);
            }
          }
          // execute the matched command
          currentCommand.callback.apply(this, parameters);
          invokeCallbacks(callbacks.resultMatch, commandText, currentCommand.originalPhrase, results);
          return;
        }
      }
    }
    invokeCallbacks(callbacks.resultNoMatch, results);
  };

  annyang = {


    init: function init(commands) { console.log("annyang.js » INIT ANNYANG");
      var resetCommands = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Abort previous instances of recognition already running
      if (recognition && recognition.abort) {
        recognition.abort();
      }

      // initiate SpeechRecognition
      recognition = new SpeechRecognition();

      // NOTE: See https://webreflection.medium.com/taming-the-web-speech-api-ef64f5a245e1

      // THE LINES FOR interimResults IS NOT PART OF ORIGINAL ANNYANG.JS
      // Maybe it's better if we turn off interimResults for all Android devices and not only on Samsung Browser
      if (annyangBetterIfInterimResultsAreDisabled) { // See js_for_different_browsers_and_devices
        // Do nothing since interimResults are turned off by default
        console.log("ANDROID: interimResults will not be activated");
      } else {
        console.log("interimResults will be activated to improve reaction times");
        recognition.interimResults = true; // THIS CAUSES an error in SAMSUNG BROWSER (bug) // SAYS: Failed to execute 'start' on 'SpeechRecognition', recognition has already started
      }


      // Set the max number of alternative transcripts to try and match with a command
      recognition.maxAlternatives = 5;

      // In HTTPS, turn off continuous mode for faster results.
      // In HTTP,  turn on  continuous mode for much slower results, but no repeating security notices
      recognition.continuous = root.location.protocol === 'http:';

      // Sets the language to the default 'en-US'. This can be changed with annyang.setLanguage()
      // WEIRD: For desktops it is possible to start without an initial default and yet on Android it looks like it doesn't work without an initial value
      // Or is it something else that is wrong -> LATER: It was probably because autoRestart wasn't set back to true after abort function set it to false
      // ANYHOW: Calling annyang.setLanguage() will force init SpeechRecognition
      // recognition.lang = 'en-US';

      recognition.onstart = function () { //console.log("annyang.js » Speech Recognition START event fired");
        _isListening = true;
        invokeCallbacks(callbacks.start);
        // Custom code for speakworldlanguages.app
        // DESPITE: annyang.js being listed in index.html before js_for_different_browsers_and_devices it should be OK to use global variables here
        // as this part will not execute immediately as the app launches
        // April 2024: Let's try showing it on all devices instead of just Android
        if (/*isAndroid && */microphoneOnOffVisualIndicator) { // See js_for_different_browsers_and_devices
          if (document.body.contains(microphoneOnOffVisualIndicator)) { console.warn("How can microphoneOnOffVisualIndicator already exist?"); }
          else { document.body.appendChild(microphoneOnOffVisualIndicator); } // Add safely

          // WARNING: On Android there seems to be a time gap after onstart fires where Speech Recognition HAS NOT ACTUALLY started !!!

        }
        // Count the number of all starts
        numberOfStartsAndRestartsRegardlessOfAudioInput++;
      };

      // Ideally the events must fire in the following order start » audiostart » soundstart » speechstart » speechend » soundend » audioend » result » end
      // In reality (as of 2023 Safari 17.0) iOS only fires start, audiostart, result and end
      // Neither soundstart nor speechstart is usable on Safari
      recognition.onsoundstart = function () { //console.log("annyang.js » Speech Recognition SOUNDSTART event fired");
        invokeCallbacks(callbacks.soundstart);
        silenceWasBroken = true; console.log("Audio input detected");
      };


      // According to taming-the-web-speech-api article only start and audiostart are logged on iOS
      // According to MDN
      // The audiostart event of the Web Speech API is fired when the user agent has started to capture audio for speech recognition
      // The soundstart event of the Web Speech API is fired when any sound — recognizable speech or not — has been detected.
      // The speechstart event of the Web Speech API is fired when sound recognized by the speech recognition service as speech has been detected.

      recognition.onerror = function (event) {
        invokeCallbacks(callbacks.error, event);
        switch (event.error) {
          case 'network':
            invokeCallbacks(callbacks.errorNetwork, event);
            break;
          case 'not-allowed':
          case 'service-not-allowed':
            // if permission to use the mic is denied, turn off auto-restart
            autoRestart = false;
            // determine if permission was denied by user or automatically.
            if (new Date().getTime() - lastStartedAt < 200) {
              invokeCallbacks(callbacks.errorPermissionBlocked, event);
            } else {
              invokeCallbacks(callbacks.errorPermissionDenied, event);
            }
            break;
        }
      };

      recognition.onend = function () {

        _isListening = false;
        invokeCallbacks(callbacks.end);
        // Custom code for speakworldlanguages.app
        // DESPITE: annyang.js being listed in index.html before js_for_different_browsers_and_devices it should be OK to use global variables here
        // as this part will not execute immediately as the app launches
        if (/*isAndroid && */microphoneOnOffVisualIndicator) { // See js_for_different_browsers_and_devices
          if (document.body.contains(microphoneOnOffVisualIndicator)) { document.body.removeChild(microphoneOnOffVisualIndicator); } // Remove safely
          else { } // Do nothing safely
        }

        // annyang will auto restart if it is closed automatically and not by user action.
        if (autoRestart) {
          // play nicely with the browser, and never restart annyang automatically more than once per second
          var timeSinceLastStart = new Date().getTime() - lastStartedAt;
          autoRestartCount += 1;
          if (autoRestartCount % 10 === 0) {
            if (debugState) {
              logMessage('Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips.');
            }
            // Apart from the mentioned situations in annyang documentation, one of these things could be happening
            // 1 - User is trying but speech recognition won't function nicely (It happens on Android and Windows when there is only one very short word like "Ki" in Hito)
            // 2 - User is away from the device and the mic hears nothing but silence
            // 3 - In Safari we try not to abort annyang and pause it instead which means auto-Restart-Count will never be reset
            // DECISION: We will try and see if 1 is happening and tell the user that it's not their fault but is a technical issue » [... Please skip ahead]
          }
          // Try to handle case 1: On Windows & Android user tries to pronounce but SpeechRecognition fails even though it perhaps shouldn't have.
          // Speech recognition ignores user's correct answer. This happens when the answer is too short i.e. consisting of only one syllable
          if (silenceWasBroken) {
            numberOfRestartsDespiteDetectionOfAudioInput++;
            if (numberOfRestartsDespiteDetectionOfAudioInput == 2 && !localStorage.maybeYouShouldSkipAlertHasAlreadyBeenDisplayed) {
              // Remember that we want to avoid alert boxes in Safari as it toggles Howler sounds ON and OFF due to some mysterious Safari bug
              // DESPITE: annyang.js being listed in index.html before js_for_different_browsers_and_devices it should be OK to use global variables here
              // as this part will not execute immediately as the app launches
              if (!isApple) { // LACK OF EXPERIMENT: As of April 2024 no tests performed on iOS. On MacOS it looks like it runs smoothly (unlike Chrome)
                // Display (English): If speech recognition is not functioning properly please skip it.
                const filePathForMaybeYouShouldSkip = "/user_interface/text/"+userInterfaceLanguage+"/0-if_something_is_not_working.txt";
                fetch(filePathForMaybeYouShouldSkip,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
                  alert(contentOfTheTxtFile.split("|")[2]);
                  localStorage.maybeYouShouldSkipAlertHasAlreadyBeenDisplayed = "yes";
                });
              }

            }
          }
          silenceWasBroken = false; // Reset to be able to detect it again
          // ---
          if (timeSinceLastStart < 1500) { // MODIFIED for SWL: Original annyang had different values
            restartTimeout = setTimeout(function () {
              if (autoRestart) { // Get double safe: Do not restart if aborted // in case clearTimeout fails to clear the timeout
                console.log("Restarting SpeechRecognition");
                annyang.start({ paused: pauseListening });
              }
            }, 1500 + annyangRestartDelayTime - timeSinceLastStart); // MODIFIED for SWL: Original annyang had different values
          } else {
            restartTimeout = setTimeout(function () {
              if (autoRestart) { // Get double safe: Do not restart if aborted // in case clearTimeout fails to clear the timeout
                console.log("Restarting SpeechRecognition");
                annyang.start({ paused: pauseListening });
              }
            }, 0 + annyangRestartDelayTime); // MODIFIED for SWL: Original annyang had different values
          }
        }
      };

      recognition.onresult = function (event) {
        if (pauseListening) {
          if (debugState) {
            logMessage('Speech heard, but annyang is paused');
          }
          return false;
        }

        // Map the results to an array
        var SpeechRecognitionResult = event.results[event.resultIndex];
        var results = [];
        for (var k = 0; k < SpeechRecognitionResult.length; k++) {
          results[k] = SpeechRecognitionResult[k].transcript;
        }

        parseResults(results);
      };

      // build commands list
      if (resetCommands) {
        commandsList = [];
      }
      if (commands.length) {
        this.addCommands(commands);
      }
    },


    start: function start(options) { //console.log("annyang.js » The start function of annyang fired");
      initIfNeeded();
      options = options || {};
      if (options.paused !== undefined) {
        pauseListening = !!options.paused;
      } else {
        pauseListening = false;
      }
      if (options.autoRestart !== undefined) {
        autoRestart = !!options.autoRestart;
      } else {
        autoRestart = true;
      }
      if (options.continuous !== undefined) {
        recognition.continuous = !!options.continuous;
      }

      lastStartedAt = new Date().getTime();
      try {
        recognition.start(); console.log("annyang.js » recognition.start() was successful");
      } catch (e) { console.warn("annyang.js » !!! recognition could not start !!!");
        console.error(e); console.warn(e.message);
        if (debugState) {          logMessage(e.message);        }
        // SAMSUNG DEVICE KEEPS throwing the error that says
        // Failed to execute 'start' on 'SpeechRecognition': recognition has already started
        try {
          /*setTimeout(function () { recognition.start(); console.log("Force aborted and then recognition.start() worked"); }, 1000);*/
          recognition.addEventListener("end",()=>{
            recognition.start(); console.log("After forced abort, recognition.start() worked");
          },{once:true});
          recognition.abort(); console.log("Force aborted");
        } catch (e) { console.warn("annyang.js » !!! Tried aborting and restarting BUT STILL recognition could not start!!!");
          try {
            // Change the continuous property and retry
            recognition.continuous = !recognition.continuous;
            recognition.addEventListener("end",()=>{
              setTimeout(function () { recognition.start(); console.log("After switching «continuous» to "+recognition.continuous+" recognition.start() worked"); }, 1000);
            },{once:true});
            recognition.abort(); console.log("Force aborted one more time");
          } catch (e) {
            console.error(e); console.warn("Tried switching «continuous» to "+recognition.continuous+" but that didn’t work either");
            alert("Cannot start speech recognition");
          }
        }
      }
    },


    abort: function abort() {
      // Start of MODIFICATION for SWL
      if (restartTimeout) {      clearTimeout(restartTimeout);      }
      numberOfStartsAndRestartsRegardlessOfAudioInput = 0; // Reset back to initial value
      numberOfRestartsDespiteDetectionOfAudioInput = 0; // Reset back to initial value
      // End of MODIFICATION for SWL
      autoRestart = false;
      autoRestartCount = 0;
      if (isInitialized()) {
        recognition.abort(); console.log("annyang.js » recognition.abort() was successful"); // Modification applied for SWL
      } else {
         console.warn("CANNOT abort because annyang isInitialized returned false"); // Modification applied for SWL
      }
    },


    pause: function pause() {
      pauseListening = true;
    },


    resume: function resume() {
      annyang.start();
    },


    debug: function debug() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      debugState = !!newState;
    },


    setLanguage: function setLanguage(language) {
      initIfNeeded();
      recognition.lang = language;
    },


    addCommands: function addCommands(commands) {
      var cb;

      initIfNeeded();

      for (var phrase in commands) {
        if (commands.hasOwnProperty(phrase)) {
          cb = root[commands[phrase]] || commands[phrase];
          if (typeof cb === 'function') {
            // convert command to regex then register the command
            registerCommand(commandToRegExp(phrase), cb, phrase);
          } else if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) === 'object' && cb.regexp instanceof RegExp) {
            // register the command
            registerCommand(new RegExp(cb.regexp.source, 'i'), cb.callback, phrase);
          } else {
            if (debugState) {
              logMessage('Can not register command: %c' + phrase, debugStyle);
            }
            continue;
          }
        }
      }
    },


    removeCommands: function removeCommands(commandsToRemove) {
      if (commandsToRemove === undefined) {
        commandsList = [];
      } else {
        commandsToRemove = Array.isArray(commandsToRemove) ? commandsToRemove : [commandsToRemove];
        commandsList = commandsList.filter(function (command) {
          for (var i = 0; i < commandsToRemove.length; i++) {
            if (commandsToRemove[i] === command.originalPhrase) {
              return false;
            }
          }
          return true;
        });
      }
    },


    addCallback: function addCallback(type, callback, context) {
      var cb = root[callback] || callback;
      if (typeof cb === 'function' && callbacks[type] !== undefined) {
        callbacks[type].push({ callback: cb, context: context || this });
      }
    },


    removeCallback: function removeCallback(type, callback) {
      var compareWithCallbackParameter = function compareWithCallbackParameter(cb) {
        return cb.callback !== callback;
      };
      // Go over each callback type in callbacks store object
      for (var callbackType in callbacks) {
        if (callbacks.hasOwnProperty(callbackType)) {
          // if this is the type user asked to delete, or he asked to delete all, go ahead.
          if (type === undefined || type === callbackType) {
            // If user asked to delete all callbacks in this type or all types
            if (callback === undefined) {
              callbacks[callbackType] = [];
            } else {
              // Remove all matching callbacks
              callbacks[callbackType] = callbacks[callbackType].filter(compareWithCallbackParameter);
            }
          }
        }
      }
    },


    isListening: function isListening() {
      return _isListening && !pauseListening;
    },


    getSpeechRecognizer: function getSpeechRecognizer() {
      return recognition;
    },


    trigger: function trigger(sentences) {
      if (!annyang.isListening()) {
        if (debugState) {
          if (!_isListening) {
            logMessage('Cannot trigger while annyang is aborted');
          } else {
            logMessage('Speech heard, but annyang is paused');
          }
        }
        return;
      }

      if (!Array.isArray(sentences)) {
        sentences = [sentences];
      }

      parseResults(sentences);
    }
  };

  return annyang;
});
