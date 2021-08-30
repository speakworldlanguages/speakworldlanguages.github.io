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
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetPathsAndGUI+"/level_1/unit_1/lesson_3/give.mp3";
if (parent.theLanguageUserIsLearningNowToSetPathsAndGUI=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetPathsAndGUI+"/level_1/unit_1/lesson_3/give_water.mp3";
if (parent.theLanguageUserIsLearningNowToSetPathsAndGUI=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetPathsAndGUI+"/level_1/unit_1/lesson_3/give_water_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetPathsAndGUI=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
let sayLastlyPath = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetPathsAndGUI+"/level_1/unit_1/lesson_3/thank_you.mp3";
if (parent.theLanguageUserIsLearningNowToSetPathsAndGUI=="ar" && parent.genderOfTheUser=="female") { sayLastlyPath = sayLastlyPath.split(".")[0] + "_female.mp3"; }
const sayLastly = new parent.Howl({  src: [sayLastlyPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/click_on_glass.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  clickTone.unload();
  sayLastly.unload();
  say3.unload();
  say2.unload();
  say1.unload();
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

// ALWAYS: Use window load to be safe with timing
window.addEventListener('load', function(){   loadingIsCompleteFunction();   }, { once: true });

function loadingIsCompleteFunction()
{
  // Stop and notify the user if necessary; otherwise just continue.
  startTheLesson();
}

function startTheLesson()
{
  setTimeout(goFromAtoB,1400); // last frame starts showing at t=1300 milliseconds
}

var looping; // Declare it here, outside any {} to make it global. // Try using var instead of let to see if it will fix the issue in Safari.
let counter = 1;
// const speedInThisLesson = ((parent.speedAdjustmentCoefficient + 1)/2); // DON'T USE CONST: When range input is changed the timing must also chanğe.
function goFromAtoB()
{
  imgA.style.display = "none"; // From static last frame
  imgB.style.display = "initial"; // To the looping animation. One cycle is 8250 ms
  // Action one at 2640,,, action two at 7920,,, total time 66ms x 125frames = 8250 ms loop ... 8250 x 2 = 16500 -> 1 cycle of slow fast slow fast
  // Actually maybe it is better if it doesn't sync
  looping = setInterval(loopFunction,24750*((parent.speedAdjustmentCoefficient + 1)/2)); // 8250x2 = 16500 but it feels like it needs to be slower than that.
  function loopFunction() {
    if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([0,2640,25,5255,25,305]);} // Vibrate makes Safari (in 2021) freeze.
    setTimeout(function () {  say1.play();  },3500*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say2.play();  },8500*((parent.speedAdjustmentCoefficient + 1)/2)); // 8250+3000 = 11250 // Tweaking a little more.
    setTimeout(function () {  say3.play();  },17700*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter == 3) {  clearInterval(looping);  }
    counter++;
  }
  loopFunction();

  // touchstart is the mobile equivalent of mousedown

  if (parent.deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromBtoC,{once:true}); // NECESSARY: Because mousedown doesn't fire until the screen is released by user's finger.
  } else {
    clickableArea.addEventListener("mousedown",goFromBtoC,{once:true});
  }

}

function goFromBtoC()
{
  clearInterval(looping); say1.fade(1,0,1500); say2.fade(1,0,1500); say3.fade(1,0,1500);
  clickTone.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate(22);}
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(function () { successTone.play(); },2250); // Actual time of last frame is 1848 milliseconds
  setTimeout(function () { sayLastly.play(); putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB; },5000);
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideIt");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealIt");
  },7500); // 9000-1500 = 7500 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },8900); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../lesson_4/index.html"; },9000);
}
