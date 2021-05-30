// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-2-4.txt";
//const filePathB = "";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
//let textB;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
//fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
let sayAPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink.mp3";
if (parent.theLanguageUserIsLearningNow=="ar" && parent.genderOfTheUser=="female") { sayAPath = sayAPath.split(".")[0] + "_female.mp3"; }
const sayA = new parent.Howl({  src: [sayAPath]  });
let sayBPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink_water.mp3";
if (parent.theLanguageUserIsLearningNow=="ar" && parent.genderOfTheUser=="female") { sayBPath = sayBPath.split(".")[0] + "_female.mp3"; }
const sayB = new parent.Howl({  src: [sayBPath]  });
let sayCPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_2/lesson_4/drink_water_from_the_glass.mp3";
if (parent.theLanguageUserIsLearningNow=="ar" && parent.genderOfTheUser=="female") { sayCPath = sayCPath.split(".")[0] + "_female.mp3"; }
const sayC = new parent.Howl({  src: [sayCPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/click_to_drink.mp3'] });
const videoSoundTrack = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/drink_water_from_glass_state_b.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_2/lesson_4/successfully_drank_water.mp3'] });
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
var looping;
let counter = 1;
function loadingIsCompleteFunction()
{
  // Display notifications if there are any.
  startTheLesson();
}

function startTheLesson()
{
  // In this case the audio loop doesn’t have to sync with the visual animation loop.
  looping = setInterval(loopFunction,21500);
  function loopFunction() {
    setTimeout(function () {  sayA.play();  },2200);
    setTimeout(function () {  sayB.play();  },8000);
    setTimeout(function () {  sayC.play();  },16000);
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

function goFromAtoB()
{
  clearInterval(looping); sayA.fade(1,0,1500); sayB.fade(1,0,1500); sayC.fade(1,0,1500);
  clickTone.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([7,99,9,88,11,77,13,77,15,77,13,77,11,77,9,77,7,77,5,77,3,77,1]);} // As user taps on the glass.
  setTimeout(function () { videoSoundTrack.play();  },3250); // IMPORTANT! Timing must be accurate.
  imgA.style.display = "none";
  imgB.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML = " ";
  setTimeout(function () { successTone.play();  },9500); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { postloaderWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },14500); // -500ms from ending
  setTimeout(function () { postloaderHiddenGlobeInsideWhitecover.classList.add("postloaderInInteractablesGetTotallyVisible") },14750); // -250ms from ending
  // See js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../../unit_3/lesson_1/index.html";  },15000);
}
