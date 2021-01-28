// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-4a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-4b.txt";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
var textB;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
const say1NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_4/take_bread_normal.ogg";
const say1Natural = new parent.Howl({  src: [say1NaturalPath]  });
const say1SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_4/take_bread_slow.ogg";
const say1Slow = new parent.Howl({  src: [say1SlowPath]  });
const say2NaturalPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_4/eat_normal.ogg";
const say2Natural = new parent.Howl({  src: [say2NaturalPath]  });
const say2SlowPath = "audio_files_from_teachers/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_1/lesson_4/eat_slow.ogg";
const say2Slow = new parent.Howl({  src: [say2SlowPath]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/click_on_bread.ogg'] });
const bite1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite1.ogg'] });
const bite2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite2.ogg'] });
const bite3 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite3.ogg'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bread_is_eaten.ogg'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  bite3.unload();
  bite2.unload();
  bite1.unload();
  clickTone.unload();
  say2Slow.unload();
  say2Natural.unload();
  say1Slow.unload();
  say1Natural.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");

const clickableArea = document.getElementById("idOfTheLittleInvisibleClickableDiv");

function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
}
// SPECIAL CASE: No postloader at the end because notice_0 comes next.

// ALWAYS: Use window load to be safe with timing.
window.addEventListener('load', function(){    loadingIsCompleteFunction();    }, { once: true });

function loadingIsCompleteFunction() {
  setTimeout(goFromAtoB,2750); /* CRITICAL! Exact timing is necessary.*/
}
let looping1; // Declare it here, outside any {} to make it global.
let counter1 = 1;
function goFromAtoB() {
  imgA.style.display = "none";
  imgB.style.display = "initial"; // Loop duration is 4800 ms
  function loopFunction1() {
    setTimeout(function () {  say1Natural.play();  },1000);
    setTimeout(function () {  say1Slow.play();  },1000+4800*2);
    if (counter1 == 4) {  clearInterval(looping1);  }
    counter1++;
  }
  loopFunction1();
  looping1 = setInterval(loopFunction1,4800*4);
  // touchstart is the equivalent of mousedown for mobile
  if (parent.deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromBtoC,{once:true});
  } else {
    clickableArea.addEventListener("mousedown",goFromBtoC,{once:true});
  }
}

function goFromBtoC() {
  clearInterval(looping1); say1Natural.fade(1,0,1500); say1Slow.fade(1,0,1500);
  clickTone.play();
  parent.navigator.vibrate(10);
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(goFromCtoD,7300); // CRITICAL! Exact timing is necessary.
}
let looping2; // Declare it here, outside any {} to make it global.
let counter2 = 1;
function goFromCtoD() {
  setTimeout(function () { putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB; },1000);
  imgC.style.display = "none";
  imgD.style.display = "initial"; // Loop duration is 88 ms x 8 frames = 704 ms
  clickableArea.style.left="42%";
  clickableArea.style.top="26%";
  clickableArea.style.width="35vmin";
  // Loop 2
  function loopFunction2() {
    setTimeout(function () {  say2Natural.play();  },2000);
    setTimeout(function () {  say2Slow.play();  },8000);
    if (counter2 == 4) {  clearInterval(looping2);  }
    counter2++;
  }
  loopFunction2();
  looping2 = setInterval(loopFunction2,704*20);
  // Add clickability
  if (parent.deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromDtoE,{once:true});
  } else {
    clickableArea.addEventListener("mousedown",goFromDtoE,{once:true});
  }
}
var fadeThisOutInsteadOfPostloader = document.getElementById('thisTimeUseFadeOutInsteadOfPostLoader');
function goFromDtoE() {
  clearInterval(looping2); say2Natural.fade(1,0,1500); say2Slow.fade(1,0,1500);
  parent.navigator.vibrate(20);
  imgD.style.display = "none";
  imgE.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML=" ";
  parent.navigator.vibrate([0,2300,10,100,10,200,10,100,10,200,10,100,10,200,10,100,9,200,8]); // Bread is being eaten.
  setTimeout(function () { bite1.play();  },2228); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { bite2.play();  },2728); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { bite3.play();  },3228); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { successTone.play(); },4728); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { fadeThisOutInsteadOfPostloader.classList.add("addThisToFadeOut"); },7400); //
  // /*Move to js_for_all_iframed...*/ setTimeout(function() { unloadTheSoundsOfThisLesson(); unloadTheImagesOfThisLesson(); },9400); // Caution: Playing sounds must not be cut in the middle.
  setTimeout(function () { self.location.href = "../notice_0/index.html";  },9500); //
}
