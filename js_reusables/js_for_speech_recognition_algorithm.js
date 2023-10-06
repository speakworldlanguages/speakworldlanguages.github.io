"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
let aMatchWasFound;
// Sound player (Howler) exists in the parent html
// Find soundFileFormat in js_for_all_iframed_lesson_htmls
const notificationDingTone = new parent.Howl({  src: ["/user_interface/sounds/ding."+soundFileFormat]  });

function seeIfUserIsAbleToPronounce(anyOneOfTheWordsInThisArray,withinThisTimeLimit,beforeThisManyRetriesHappen,withoutPlayingTheDING) {
  return new Promise((resolve, reject) => { // Avoid using reject for timelimit-failures and retry-failures BECAUSE syntax errors also get caught in catch block
      aMatchWasFound = false;
      // Notes about handling non-English string characters
      // BULGULAR: toLowerCase() Windows'ta büyük Ş yi küçük ş ye çeviriyor ama Mac OS üzerinde çevirmiyor
      // Onun yerine toLocaleLowerCase() kullanılırsa büyük I İngilizcedeki gibi küçük i ye dönüşmek yerine küçük ı ya dönüşüyor
      // Seçenek1: toLocaleLowerCase() KULLANMAYIP speech_recognition_answer_key içindeki cevapları buna dikkat ederek girmek
      // Seçenek2: tr için özel koşul yazmak -> OLMADI NEDEN ÇÜNKÜ büyük [İ] yi [i̇] ye yanlış dönüştürüyor. İki farklı küçük i çıkıyor ve ("i̇" == "i") false veriyor
      // Note: We don't need toLocaleLowerCase() for Cyrillic script (confirmed on Windows), toLowerCase() does the job right already

      if (parent.annyang) { parent.console.log("Starting speech recognition for: "+anyOneOfTheWordsInThisArray[0]);
        // October 2022 UPDATE: Stop using commands object with annyang
        // DEPRECATED parent.annyang.addCommands(commands);

        // Use withoutPlayingTheDING where necessary » As of October2023 it's never used
        // IDEA: We could replace withoutPlayingTheDING with something like typeOfTheDING to choose from different sounds
        if (!isAndroid && !withoutPlayingTheDING) { // See js_for_different_browsers_and_devices AND js_for_all_iframed_lesson_htmls
            notificationDingTone.play(); // Android has its native DING tone. So let this DING tone play only on non-Android platforms i.e. desktops and iOS devices.
        }

        // Start listening (on Android first check if it is already ON and TURN IT OFF IF IT WAS ON)
        if (isAndroid && parent.annyang.isListening()) { // UNCERTAIN: Maybe we shouldn't rely on parent.annyang.isListening()
          parent.console.warn("ON ANDROID: annyang was already listening » Check js_for_speech_recognition_algorithm");
          parent.annyang.abort(); // Try to avoid the «SpeechRecognition is already listening» error
          new SuperTimeout(startSpeechRecognition,2000);
          // NOTE_THAT: If mic is idle but is TURNED ON due to previous getUserMedia activity THERE MIGHT still be a problem with starting SpeechRecognition on Android!
        } else {
          startSpeechRecognition(); // BETTER START WITHOUT ANY DELAY
        }

        function startSpeechRecognition() {
          parent.annyang.start({ autoRestart: true }); // NOTE: annyang.resume() equals annyang.start()
        }

        // New method of detecting matches
        parent.annyang.addCallback('result', compareAndSeeIfTheAnswerIsCorrect);
        function compareAndSeeIfTheAnswerIsCorrect(phrasesArray) {
          parent.console.log('Speech recognized. Possibly said: '+phrasesArray); // SpeechRecognition actually returns a confidence value for each of its guessed-catches but we as of October2023 there is no use for it in the app
          // Check if there is a match
          let j;
          for(j=0;j<anyOneOfTheWordsInThisArray.length;j++) {
            // NOTE THAT: There is also the option of using includes() to perform phrase to phrase comparison // Remember that it's not contains() » It's includes()
            // BUT we want to split phrases into words and perform word to word comparison
            let k;
            for (k = 0; k < phrasesArray.length; k++) {
              // Which method is better?
              // if (phrasesArray[k].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) >= 0) // This will return true if user utters 'underwater' instead of 'water'
              // if (phrasesArray[k].toLowerCase() == anyOneOfTheWordsInThisArray[j].toLowerCase()) // Only with interimResults TURNED ON, this will return true if user utters 'Water is the liquid form of H2O' but false for 'underwater' and also false for 'under water'
              // if (phrasesArray[k].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) == 0) // Accept user's utterance if it starts with the "correct word or phrase" even if interimResults option is turned off like 'watermelon'.
              // To accept 'under water' while rejecting 'underwater' we need to extract individual words from phrases

              const fromPhraseToSingleWords = phrasesArray[k].split(" "); // Note that in "spaceless" languages like Renmen-Hito phrases will not be split into words
              let z;
              for (z = 0; z < fromPhraseToSingleWords.length; z++) {

                // Now we can reject 'underwater' and accept 'under water' // NOTE: With interimResults enabled it’s probably impossible to reject 'watermelon'
                let searchResult = false;
                if (fromPhraseToSingleWords[z].toLowerCase() == anyOneOfTheWordsInThisArray[j].toLowerCase()) { searchResult = true; } // For some reason this fails for Arabic in Safari >>> Works without any problems in Chrome though
                else if (isApple) {
                  if (parent.annyang.getSpeechRecognizer().lang == "ar") { parent.console.warn("Listening for Arabic on Safari/Apple");
                    // Use string search to try and find it within the phrase and not individual words
                    if (phrasesArray[k].search(anyOneOfTheWordsInThisArray[j]) >= 0) { searchResult = true; }
                  }
                }
                else if (parent.targetLanguageIsWrittenWithoutSpaces) { // Let's also accept an utterance like 我要喝水(I am going to drink water) as a correct answer since it includes 水(water)
                  // Event though it means we will also accept ミミズ(earthworm) when waiting for 水(water) !!!
                  if (fromPhraseToSingleWords[z].toLowerCase().search(anyOneOfTheWordsInThisArray[j].toLowerCase()) >= 0) { searchResult = true; }
                  // ALSO NOTE THAT: Unfortunately SpeechRecognition can ignore user's speech when the utterance is too short consisting of only one syllable
                  // In that case we show a prompt like "It's OK to skip" » See annyang.js numberOfRestartsDespiteDetectionOfAudioInput » See /user_interface/text/??/0-if_something_is_not_working.txt
                }
                // -
                if (!aMatchWasFound && searchResult) { // Note that compareAndSeeIfTheAnswerIsCorrect usually fires multiple times
                  aMatchWasFound = true; // By using this, we make sure that this block will fire only and only once
                  if (parent.annyang.getSpeechRecognizer().interimResults) { parent.console.log("Correct answer detected with interimResults enabled");
                    setTimeout(function () { notificationDingTone.unload(); resolve("pass"); /*OLDER METHOD USED TO BE stopListeningAndProceedToNext();*/ }, 250); // Interim results is or can be too quick (especially on Windows)
                  } else { parent.console.log("Correct answer detected without interimResults");
                    notificationDingTone.unload(); resolve("pass"); /*OLDER METHOD USED TO BE stopListeningAndProceedToNext();*/
                  }
                } else {
                  // Prevent a possible second firing (or any further firings) of stopListeningAndProceedToNext by doing nothing
                }
              } // End of for z
            } // End of for k
          } // End of for j
        } // END OF compareAndSeeIfTheAnswerIsCorrect
      } // END OF if parent.annyang


      if (withinThisTimeLimit) {
        parent.console.log("Correct answer is expected before countdown completes in "+withinThisTimeLimit+"ms");
        new SuperTimeout(function () { notificationDingTone.unload(); resolve("fail"); }, withinThisTimeLimit);
      }

      if (beforeThisManyRetriesHappen) {
        parent.console.log("Correct answer is expected in a maximum of "+beforeThisManyRetriesHappen+" retries");
        if (parent.annyang) {
          parent.annyang.getSpeechRecognizer().onaudioend = () => {
            if (parent.numberOfStartsAndRestartsRegardlessOfAudioInput>=beforeThisManyRetriesHappen) {
              parent.console.log("Correct answer was not detected despite "+beforeThisManyRetriesHappen+" retries");
              // CANCEL: For lesson 134 reject used to trigger the .finally() by which stopSpeechRecognitionSession will abort annyang
              // parent.numberOfStartsAndRestartsRegardlessOfAudioInput will be reset back to 0 as abort fires in annyang.js
              parent.annyang.getSpeechRecognizer().onaudioend = null; // Remove the event listener
              notificationDingTone.unload();
              resolve("fail");
            }
          };
        }
      }


  }); // End of new Promise
} // End of seeIfUserIsAbleToPronounce
