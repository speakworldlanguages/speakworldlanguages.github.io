// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-3-3.txt";
/* This lesson has no textB*/
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
/* This lesson has no textB*/
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
/* This lesson has no textB*/

/* ___AUDIO ELEMENTS___ */
const sayNaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_3/lesson_3/go_to_sleep_in_the_house_normal.mp3";
const sayNatural = new parent.Howl({  src: [sayNaturalPath]  });
const saySlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_3/lesson_3/go_to_sleep_in_the_house_slow.mp3";
const saySlow = new parent.Howl({  src: [saySlowPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/click_on_house.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/night_time_crickets.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_3/sleep_success_and_clock_tick.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  videoSoundTrack.unload();
  clickTone.unload();
  saySlow.unload();
  sayNatural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
}

const postloaderWhitecover = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const postloaderHiddenGlobeInsideWhitecover = document.getElementById('theGlobeInsideTheWhiteOutroID');

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
let looping;
let counter = 1;
function loadingIsCompleteFunction() {
  // No syncing necessary.
  function loopFunction() {
    setTimeout(function () {  sayNatural.play();  },3000);
    setTimeout(function () {  saySlow.play();  },12500);
    if (counter == 3) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();
  looping = setInterval(loopFunction,19500);
  // Add clickability AFTER the instructions are given!
  setTimeout(function () {
      // touchstart is the equivalent of mousedown for mobile
      if (parent.deviceDetector.isMobile) {
        clickableArea.addEventListener("touchstart",goFromAtoB,{once:true});
      } else {
        clickableArea.addEventListener("mousedown",goFromAtoB,{once:true});
      }
   },5000);
}

function goFromAtoB() {
  clearInterval(looping); sayNatural.fade(1,0,1500); saySlow.fade(1,0,1500);
  clickTone.play();
  parent.navigator.vibrate([10,60,10,60,10,60,10]);
  videoSoundTrack.play();
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () { successTone.play();  },8800); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },19000); // -500ms from the end.
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },19250); // -250ms from the end.
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson();  },19400); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () { self.location.href = "../lesson_4/index.html";  },19500);
}
