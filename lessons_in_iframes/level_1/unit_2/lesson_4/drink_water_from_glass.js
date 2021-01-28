// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt";
//const filePathB = "";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
//let textB;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
//fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const sayAPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink.ogg";
const sayA = new parent.Howl({  src: [sayAPath]  });
const sayBPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink_water.ogg";
const sayB = new parent.Howl({  src: [sayBPath]  });
const sayCPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink_water_from_glass.ogg";
const sayC = new parent.Howl({  src: [sayCPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/click_to_drink.ogg'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/drink_water_from_glass_state_b.ogg'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/successfully_drank_water.ogg'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  videoSoundTrack.unload();
  clickTone.unload();
  sayC.unload();
  sayB.unload();
  sayA.unload();
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
  // In this case the audio loop doesn’t have to sync with the visual animation loop.
  function loopFunction() {
    setTimeout(function () {  sayA.play();  },2200);
    setTimeout(function () {  sayB.play();  },8000);
    setTimeout(function () {  sayC.play();  },16000);
    if (counter == 3) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();
  looping = setInterval(loopFunction,21500);
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
  clearInterval(looping); sayA.fade(1,0,1500); sayB.fade(1,0,1500); sayC.fade(1,0,1500);
  clickTone.play();
  parent.navigator.vibrate([9,99,8,88,7,77,7,77,7,77,7,77,6,77,5,77,4,77,3,77,2,77,1]); // As user taps on the glass.
  setTimeout(function () { videoSoundTrack.play();  },3250); // IMPORTANT! Timing must be accurate.
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () { successTone.play();  },9500); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },14500); // -500ms from ending
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },14750); // -250ms from ending
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson(); },14900); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () { self.location.href = "../../unit_3/lesson_1/index.html";  },15000);
}
