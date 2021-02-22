// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-3-4.txt";
/*There is no textB in this lesson*/
let textA; // Warning! Returns UNDEFINED before fetch() actually gets the file.
/*There is no textB in this lesson*/
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
/*There is no textB in this lesson*/

/* ___AUDIO ELEMENTS___ */
let sayNaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_3/lesson_4/play_in_the_garden_normal.mp3";
if (parent.theLanguageUserIsLearningNow=="ar" && parent.genderOfTheUser=="female") { sayNaturalPath = sayNaturalPath + "_female"; }
const sayNatural = new parent.Howl({  src: [sayNaturalPath]  });
let saySlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_3/lesson_4/play_in_the_garden_slow.mp3";
if (parent.theLanguageUserIsLearningNow=="ar" && parent.genderOfTheUser=="female") { saySlowPath = saySlowPath + "_female"; }
const saySlow = new parent.Howl({  src: [saySlowPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/click_on_garden.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/garden_sound.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/success_in_garden.mp3'] });
const actionSound1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/ball_hit.mp3'] });
const actionSound2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/bubbles.mp3'] }); // 12850 + 2360
const actionSound3 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_3/lesson_4/pop.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  actionSound3.unload();
  actionSound2.unload();
  actionSound1.unload();
  successTone.unload();
  videoSoundTrack.unload();
  clickTone.unload();
  saySlow.unload();
  sayNatural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
}
const postloaderWhitecover = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const postloaderHiddenGlobeInsideWhitecover = document.getElementById('theGlobeInsideTheWhiteOutroID');

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){  loadingIsCompleteFunction();  }, { once: true });
var looping;
let counter = 1;
function loadingIsCompleteFunction() {
  // No syncing necessary in this case. The timing must just feel nice enough!
  looping = setInterval(loopFunction,19500);
  function loopFunction() {
    setTimeout(function () {  sayNatural.play();  },3000);
    setTimeout(function () {  saySlow.play();  },12500);
    if (counter == 3) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();

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
  videoSoundTrack.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([14,99,11,88,8,77,5]);} // As a response to user's tap
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  const imgDivLayerAboveB = document.getElementById('divIdForBallPlayAnimationContainer');
  setTimeout(function () { imgDivLayerAboveB.classList.add("ballPlayersRopeJumpersEtcFadeInToFullOpacity");   },2200); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound1.play();   if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([60,60,20,60,10]);}    },4000); // As players hit the ball
  setTimeout(function () { actionSound1.play();   if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([60,60,20,60,10]);}    },6000); // As players hit the ball
  setTimeout(function () { successTone.play(); },4800); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { successTone.play(); },6800); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { imgB.style.display = "none"; imgC.style.display = "initial"; },10200); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { imgC.style.display = "none"; imgD.style.display = "initial"; },15000); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound2.play(); },13900); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { actionSound3.play(); },16650); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },16400); // -500ms from ending
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },16650); // -250ms from ending
  // See js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../../unit_4/lesson_1/index.html";  },16900);
}
