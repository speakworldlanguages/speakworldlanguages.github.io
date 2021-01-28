// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-3b.txt";
let textA; // Warning: Returns UNDEFINED before fetch() actually gets the file. Must wait until fetch() is done reading so keep the innerHTML change INSIDE the fetch().
let textB;
// Should fetch happen after dom content loaded?
window.addEventListener('DOMContentLoaded', function(){
  fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA;  });
  fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });
}, { once: true });
/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const sayNaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_3/give_water_normal.ogg";
const sayNatural = new parent.Howl({  src: [sayNaturalPath]  });
const saySlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_3/give_water_slow.ogg";
const saySlow = new parent.Howl({  src: [saySlowPath]  });
const sayLastlyPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_3/thank_you.ogg";
const sayLastly = new parent.Howl({  src: [sayLastlyPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/click_on_glass.ogg'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.ogg'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  clickTone.unload();
  sayLastly.unload();
  saySlow.unload();
  sayNatural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
}
const postloaderWhitecover = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const postloaderHiddenGlobeInsideWhitecover = document.getElementById('theGlobeInsideTheWhiteOutroID');

// ALWAYS: Use window load to be safe with timing
window.addEventListener('load', function(){   loadingIsCompleteFunction();   }, { once: true });

function loadingIsCompleteFunction() {
  setTimeout(goFromAtoB,1400); // last frame starts showing at t=1300 milliseconds
}
let looping; // Declare it here, outside any {} to make it global.
let counter = 1;
function goFromAtoB() {
  imgA.style.display = "none"; // From static last frame
  imgB.style.display = "initial"; // To looping animation. One cycle is 8250 ms
  // Action one at 2640,,, action two at 7920,,, total time 66ms x 125frames = 8250 ms loop ... 8250 x 2 = 16500 -> 1 cycle of slow fast slow fast
  function loopFunction() {
    parent.navigator.vibrate([0,2640,20,5260,20,310]);
    setTimeout(function () {  sayNatural.play();  },3000);
    setTimeout(function () {  saySlow.play();  },8250+3000);
    if (counter == 4) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();
  looping = setInterval(loopFunction,8250*2);
  // touchstart is the mobile equivalent of mousedown
  if (parent.deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromBtoC,{once:true}); // NECESSARY: Because mousedown doesn't fire until the screen is released by user's finger.
  } else {
    clickableArea.addEventListener("mousedown",goFromBtoC,{once:true});
  }
}

function goFromBtoC() {
  clearInterval(looping); sayNatural.fade(1,0,1500); saySlow.fade(1,0,1500);
  clickTone.play();
  parent.navigator.vibrate(15);
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(function () { successTone.play(); },2250); // Actual time of last frame is 1848 milliseconds
  setTimeout(function () { sayLastly.play(); putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB; },5000);
  /* END OF ACTIONS */
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },8500);
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },8750);
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson(); },8900); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () { self.location.href = "../lesson_4/index.html"; },9000);
}
