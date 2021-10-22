// All settings here will depend on the content of the lesson
// See js_for_every_single_html.js for userInterfaceLanguage
const filePathA = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-4a.txt";
const filePathB = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-4b.txt";
let textA; // Warning. Returns UNDEFINED before fetch() actually gets the file.
var textB;
fetch(filePathA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textA = contentOfTheTxtFile; putTranslationIntoThisHelpAreaFromFileP.innerHTML = textA; });
fetch(filePathB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ textB = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */ //...Sound player (Howler) exists in the parent html. So the path must be relative to the parent html. Not to the framed html.
let say1Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/take.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say1Path = say1Path.split(".")[0] + "_female.mp3"; }
const say1 = new parent.Howl({  src: [say1Path]  });
let say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/take_bread.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say2Path = say2Path.split(".")[0] + "_female.mp3"; }
const say2 = new parent.Howl({  src: [say2Path]  });
let say3Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/take_bread_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say3Path = say3Path.split(".")[0] + "_female.mp3"; }
const say3 = new parent.Howl({  src: [say3Path]  });
let say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/eat.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say4Path = say4Path.split(".")[0] + "_female.mp3"; }
const say4 = new parent.Howl({  src: [say4Path]  });
let say5Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/eat_bread.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say5Path = say5Path.split(".")[0] + "_female.mp3"; }
const say5 = new parent.Howl({  src: [say5Path]  });
let say6Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNowToSetFilePaths+"/level_1/unit_1/lesson_4/eat_bread_slow.mp3";
if (parent.theLanguageUserIsLearningNowToSetFilePaths=="ar" && parent.genderOfTheUser=="female") { say6Path = say6Path.split(".")[0] + "_female.mp3"; }
const say6 = new parent.Howl({  src: [say6Path]  });
const clickTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/click_on_bread.mp3'] });
const bite1 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite1.mp3'] });
const bite2 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite2.mp3'] });
const bite3 = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bite3.mp3'] });
const successTone = new parent.Howl({  src: ['lessons_in_iframes/level_1/unit_1/lesson_4/bread_is_eaten.mp3'] });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  successTone.unload();
  bite3.unload();
  bite2.unload();
  bite1.unload();
  clickTone.unload();
  say6.unload();
  say5.unload();
  say4.unload();
  say3.unload();
  say2.unload();
  say1.unload();
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

function loadingIsCompleteFunction()
{
  if (parent.theLanguageUserIsLearningNowToSetFilePaths == "zh") { // How to say [Na] with correct intonation.
    const pathOfNotificationAboutRenIntonation = "../../../../user_interface/text/"+userInterfaceLanguage+"/1-1-4_special_case_for_zh.txt";
    fetch(pathOfNotificationAboutRenIntonation,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
      // Display notification instead of alert(contentOfTheTxtFile);
      createAndHandleNotificationBox(); // See js_for_all_iframed_lesson_htmls.js
      putNotificationTxtIntoThisP.innerHTML = contentOfTheTxtFile;
      // Continue when user clicks or touches OK
      // createAndHandleNotificationBox() will start the lesson 1.5 seconds after the button is clicked
      // ---
      // Put something like [OK], [Got it], [I see], [Oh really?], [Wow], [That's interesting] etc into the button.
      const pathOfOkCloseTheBox = "../../../../user_interface/text/"+userInterfaceLanguage+"/0-ok_i_understand.txt";
      fetch(pathOfOkCloseTheBox,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
        okButtonToCloseTheNotification.innerHTML = contentOfTheTxtFile;
      });
    });
  } else {
    startTheLesson(); // PERHAPS: It would be better to use async await in js_for_all_iframed_lesson_htmls
  }
}
function startTheLesson()
{
  setTimeout(goFromAtoB,2750); /* CRITICAL! Exact timing is necessary.*/
}
var looping1; // Declare it here, outside any {} to make it global. // Try using var instead of let to see if it will fix the issue in Safari.
let counter1 = 1;
function goFromAtoB() {
  imgA.style.display = "none";
  imgB.style.display = "initial"; // Loop duration is 4800 ms
  looping1 = setInterval(loopFunction1,22000*((parent.speedAdjustmentCoefficient + 1)/2)); // 4800x4 = 19200
  function loopFunction1() {
    setTimeout(function () {  say1.play();  },2000*((parent.speedAdjustmentCoefficient + 1)/2));
    setTimeout(function () {  say2.play();  },7000*((parent.speedAdjustmentCoefficient + 1)/2)); // 1000+4800x2 = 10600
    setTimeout(function () {  say3.play();  },14000*((parent.speedAdjustmentCoefficient + 1)/2));
    if (counter1 == 3) {  clearInterval(looping1);  }
    counter1++;
  }
  loopFunction1();

  // touchstart is the equivalent of mousedown for mobile
  if (deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromBtoC,{once:true});
  } else {
    clickableArea.addEventListener("mousedown",goFromBtoC,{once:true});
  }
}

function goFromBtoC() {
  clearInterval(looping1); say1.fade(1,0,1500); say2.fade(1,0,1500); say3.fade(1,0,1500);
  clickTone.play();
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate(20);}
  imgB.style.display = "none";
  imgC.style.display = "initial";
  setTimeout(goFromCtoD,7300); // CRITICAL! Exact timing is necessary.
}
var looping2; // Declare it here, outside any {} to make it global.
let counter2 = 1;
function goFromCtoD() {
  setTimeout(function () { putTranslationIntoThisHelpAreaFromFileP.innerHTML = textB; },1000);
  imgC.style.display = "none";
  imgD.style.display = "initial"; // Loop duration is 88 ms x 8 frames = 704 ms
  clickableArea.style.left="42%";
  clickableArea.style.top="26%";
  clickableArea.style.width="35vmin";
  // Loop 2
  looping2 = setInterval(loopFunction2,15000*parent.speedAdjustmentCoefficient); // 704x20 = 14080
  function loopFunction2() {
    setTimeout(function () {  say4.play();  },2000*parent.speedAdjustmentCoefficient);
    setTimeout(function () {  say5.play();  },6000*parent.speedAdjustmentCoefficient);
    setTimeout(function () {  say6.play();  },10000*parent.speedAdjustmentCoefficient);
    if (counter2 == 3) {  clearInterval(looping2);  }
    counter2++;
  }
  loopFunction2();

  // Add clickability
  if (deviceDetector.isMobile) {
    clickableArea.addEventListener("touchstart",goFromDtoE,{once:true});
  } else {
    clickableArea.addEventListener("mousedown",goFromDtoE,{once:true});
  }
}

function goFromDtoE() {
  clearInterval(looping2); say4.fade(1,0,1500); say5.fade(1,0,1500); say6.fade(1,0,1500);
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate(25);}
  imgD.style.display = "none";
  imgE.style.display = "initial";
  putTranslationIntoThisHelpAreaFromFileP.innerHTML=" ";
  if(parent.detectedOS.name != "iOS" && parent.detectedOS.name != "Mac OS") {parent.navigator.vibrate([0,2300,15,100,10,200,20,100,10,200,15,100,10,200,20,100,9,200,8]);}  // Bread is being eaten.
  setTimeout(function () { bite1.play();  },2228); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { bite2.play();  },2728); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { bite3.play();  },3228); // IMPORTANT! Timing must be accurate.
  setTimeout(function () { successTone.play(); },4728); // IMPORTANT! Timing must be accurate.
  /* END OF ACTIVITY */
  /* GET READY TO EXIT THIS LESSON */
  setTimeout(function() {
    parent.preloadHandlingDiv.classList.remove("addThisClassToHideThePreloader");
    parent.preloadHandlingDiv.classList.add("addThisClassToRevealThePreloader");
  },8000); // 9500-1500 = 8000 See css_for_every_single_html
  setTimeout(function() {
    unloadTheSoundsOfThisLesson();
    unloadTheImagesOfThisLesson();
  },9400); // Also see js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function () { self.location.href = "../notice_0/index.html";  },9500); //
}
