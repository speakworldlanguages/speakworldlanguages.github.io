"use strict";
const leftText1 = document.getElementById('leftText1pID'); const rightText1 = document.getElementById('rightText1pID');

let leftTextWithoutInteraction;
const filePathForLeftTextWithoutInteraction = "/user_interface/text/"+userInterfaceLanguage+"/0-you_are_learning_"+parent.langCodeForTeachingFilePaths+".txt";
fetch(filePathForLeftTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  leftTextWithoutInteraction = contentOfTheTxtFile;
  leftText1.innerHTML = leftTextWithoutInteraction;
});// See js_for_every_single_html.js for the headers thingy.

let rightTextWithoutInteraction;
const filePathForRightTextWithoutInteraction = "/user_interface/text/"+parent.langCodeForTeachingFilePaths+"/0-you_are_learning_"+parent.langCodeForTeachingFilePaths+".txt";
fetch(filePathForRightTextWithoutInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
  rightTextWithoutInteraction = contentOfTheTxtFile;
  rightText1.innerHTML = rightTextWithoutInteraction;
});

let leftTextUponInteraction;
const filePathForLeftTextUponInteraction = "/user_interface/text/"+userInterfaceLanguage+"/0-learn_another_language.txt";
fetch(filePathForLeftTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ leftTextUponInteraction = contentOfTheTxtFile; });

let rightTextUponInteraction;
const filePathForRightTextUponInteraction = "/user_interface/text/"+parent.langCodeForTeachingFilePaths+"/0-learn_another_language.txt";
fetch(filePathForRightTextUponInteraction,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ rightTextUponInteraction = contentOfTheTxtFile; });

let sleepAdviceA, sleepAdviceB;
const filePathForsleepAdviceA = "/user_interface/text/"+userInterfaceLanguage+"/0-author_gives_sleep_advice.txt";
const filePathForsleepAdviceB = "/user_interface/text/"+parent.langCodeForTeachingFilePaths+"/0-author_gives_sleep_advice.txt";
fetch(filePathForsleepAdviceA,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceA = contentOfTheTxtFile; });
fetch(filePathForsleepAdviceB,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ sleepAdviceB = contentOfTheTxtFile; });

if (deviceDetector.isMobile) {
  /*MOBILES*/
  leftText1.parentNode.addEventListener("touchend",eitherTouch1F,{once:true});
  rightText1.parentNode.addEventListener("touchend",eitherTouch1F,{once:true});
  function eitherTouch1F() {
    leftText1.parentNode.classList.add("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
    // Get ready for second touch
    leftText1.parentNode.addEventListener("touchend",eitherTouch2F); // Don't use [once:true] because confirm box may be cancelled
    rightText1.parentNode.addEventListener("touchend",eitherTouch2F); // Don't use [once:true] because confirm box may be cancelled
  }
  function eitherTouch2F() {
    setTimeout(function () { goBackToWelcomeScreenLanguageSelection();  }, 75); // Confirm box must not block touchend in preventTouchConflictWithTheSlidingNavMenu
  }
  /* Don't need these when using stopPropagation INLINE
  leftText1.parentNode.addEventListener("touchstart",preventConflict);
  rightText1.parentNode.addEventListener("touchstart",preventConflict);
  function preventConflict(event) { event.preventDefault(); event.stopPropagation(); // CAN: Quit using event.stopPropagation(); if it must bubble
    // Solve touch conflict with INLINE stopPropagation instead of parent.preventTouchConflictWithTheSlidingNavMenu(leftText1.parentNode); // Either is OK, since they are parented by the same thing. See js_for_the_sliding_navigation_menu
  }
  */
} else {
  /*DESKTOPS*/
  document.getElementById('containerID').addEventListener("mouseenter",eitherHoverF); // Parent of parent
  function eitherHoverF() {
    leftText1.parentNode.classList.add("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextUponInteraction;
    rightText1.parentNode.classList.add("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextUponInteraction;
  }
  document.getElementById('containerID').addEventListener("mouseleave",eitherUnhoverF);
  function eitherUnhoverF() {
    leftText1.parentNode.classList.remove("bilingualLongButtonMouseEnter");   leftText1.innerHTML = leftTextWithoutInteraction;
    rightText1.parentNode.classList.remove("bilingualLongButtonMouseEnter");  rightText1.innerHTML = rightTextWithoutInteraction;
  }
  leftText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  rightText1.parentNode.addEventListener("mousedown",eitherClickF,{once:true});
  function eitherClickF() {
    goBackToWelcomeScreenLanguageSelection();
  }
}

function goBackToWelcomeScreenLanguageSelection() {
  /* Remove THE HOME ceramic nav button */
  if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToMainMenuDiv)) { // Guarantee that the app won't break
    parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToGoToMainMenuDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
  }

  if (confirm(sleepAdviceA+"\n\n"+sleepAdviceB)) { // INSTEAD OF: alert(sleepAdviceA+"\n\n"+sleepAdviceB);
    parent.ayFreym.classList.add("everyThingFadesToBlack"); // 700ms this css class must exist at parent level » NOT in this document's css
    setTimeout(function() {
      parent.ayFreym.classList.remove("everyThingFadesToBlack"); // Just this once do it without a fade in; a jump in with remove() will be enough or is even better?
      ////TURNS OUT WE DON'T NEED: parent.itIsCertainlyNotTheNativeGoBackButtonThatIsNavigating = true; // See blank.html & js_for_the_sliding_navigation_menu

      parent.ayFreym.src = "/user_interface/blank.html";
      parent.document.getElementsByTagName('MAIN')[0].style.left = "0px"; // Was hidden with 8000px
      ////parent.theStudyHasStarted = false;

      // We must bring the sliding nav menu back to its initial FIXED state
      // It looks like confirm box was creating a conflict with touchend in preventTouchConflictWithTheSlidingNavMenu
      // so we were (then) fixing that manually
      /*
      Probably don't need these when using stopPropagation method instead of preventTouchConflictWithTheSlidingNavMenu
      parent.topContainerDivOfTheSlidingNavMenuForMobiles.style.bottom = "0vh";
      ////parent.swipeNavMenuIsLocked = false;
      */
      // ALSO DON'T NEED this because it is handled by blank.html » parent.makeTheNavMenuComeUpOnMobiles(); // Function checks if the menu was up already,,, so it's safe
      // Sliding nav menu will be fixed (i.e. it won't move) on welcome screen as there are no touch listeners on parent.window
    },1111); // Should we wait long enough to allow touchend to happen in preventTouchConflictWithTheSlidingNavMenu???

  } else {
    // Canceled » User changed his/her mind and wants to stay
  }

}
