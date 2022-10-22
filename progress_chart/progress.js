"use strict";
// Either defer or use DOMContentLoaded: DEFERRED

/* Deprecated - MOVED THIS TASK TO js_for_all_iframed_lesson_htmls: Remove PAUSE THE APP ceramic nav button */
// if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Don't break the app
//   parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); // TESTED: It works. ,,, also see we_are_working_for_new_levels
// }
/*
  SWIPE MENU handling is in js_for_all_iframed_lesson_htmls
*/

const allNavElements = document.getElementsByTagName('NAV');
const hoverProgress = new parent.Howl({  src: ["/user_interface/sounds/progress_chart_hover."+parent.audioFileExtension]  });
const clickProgress = new parent.Howl({  src: ["/user_interface/sounds/progress_chart_click."+parent.audioFileExtension]  });
let local_i_in_progress; // var i was already or could be declared somewhere else
for (local_i_in_progress = 0; local_i_in_progress < allNavElements.length; local_i_in_progress++)
{
  if (deviceDetector.device == "desktop") {
    allNavElements[local_i_in_progress].addEventListener("mouseenter", mouseEnterProgressF);
    allNavElements[local_i_in_progress].addEventListener("mousedown", mouseDownProgressF);
  } else {
    allNavElements[local_i_in_progress].addEventListener("touchstart", touchStartProgressF);
    allNavElements[local_i_in_progress].addEventListener("touchend", touchEndProgressF);
  }
}
function mouseEnterProgressF() { hoverProgress.play(); } // Must display "YOUR PREVIOUS PROGRESS HAS BEEN LOADED" to unlock sound and prevent [sound flood-explosions]
function mouseDownProgressF()  { clickProgress.play(); }
function touchStartProgressF(event) { event.preventDefault(); // See stopPropagation INLINE
  hoverProgress.play();
  //// const theOneThatWasTouched = event.targetTouches[0].target; // Use stopPropagation instead » See inline ontouchstart on container elements
  //// parent.preventTouchConflictWithTheSlidingNavMenu(theOneThatWasTouched); // Use stopPropagation instead » See inline ontouchstart on container elements
} // Use mouseenter sound for touchstart
function touchEndProgressF(event)   { event.preventDefault(); // See stopPropagation INLINE
  clickProgress.play();
}

/* ---
DON'T UNLOAD: In this case click sound needs time to finish playing.
window.addEventListener("beforeunload",unloadSoundsF); // TESTED: On desktops it really fires as expected
function unloadSoundsF() { hoverProgress.unload(); clickProgress.unload(); }
--- */

/* ___ Viewing the progress_chart RESETS difficulty adjustment for whatever game user was trying to pass ___ */
sessionStorage.userHasTriedToWinThisManyTimesAlready = "1"; // Used for the first time in GIVEMEWATERONEMORETIME challenge

/* ___See js_for_every_single_html.js to find how MEMORY CARD IS READ___ */
const studiedLangCode = parent.langCodeForTeachingFilePaths;
const mainInProgress = document.getElementsByTagName('MAIN')[0];
const lesson111 = document.getElementById('1_1_1');
const lesson112 = document.getElementById('1_1_2');
const lesson113 = document.getElementById('1_1_3');
const lesson114 = document.getElementById('1_1_4');

if (parent.savedProgress[studiedLangCode].lesson_BREAD_IsViewed) {  lesson111.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_BREAD_IsCompleted) {  lesson111.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

if (parent.savedProgress[studiedLangCode].lesson_WATER_IsViewed) {  lesson112.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_WATER_IsCompleted) {  lesson112.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

if (parent.savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsViewed) {  lesson113.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_GIVEMEWATER_IsCompleted) {  lesson113.classList.add("thisLessonHasBeenCompleted");  } // Override background-color

if (parent.savedProgress[studiedLangCode].lesson_TAKEBREAD_IsViewed) {  lesson114.classList.add("thisLessonHasBeenViewedButNotCompleted");  }
if (parent.savedProgress[studiedLangCode].lesson_TAKEBREAD_IsCompleted) {  lesson114.classList.add("thisLessonHasBeenCompleted");  } // Override background-color
/*__Handle Mobile and Desktop separately__*/
// See js_for_all_iframed_lesson_htmls to find how the "everyThingFadesToBlack" class is removed with "load"
// 700ms "everyThingFadesToBlack" css class must exist at parent level » NOT in this document's css
// See DEPRECATEDjs_for_preload_handling to find handleFadingAndNavigation
/*!!! IDEA: touchstart=hover touchend=click*/
// handleFadingAndNavigation is in js_for_app_initialization_in_parent ,,, as of september 2022
if (deviceDetector.isMobile) {
  lesson111.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_1/index.html"); });
  lesson112.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_2/index.html"); });
  lesson113.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_3/index.html"); });
  lesson114.addEventListener("touchend",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_4/index.html"); });
} else {
  lesson111.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_1/index.html"); });
  lesson112.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_2/index.html"); });
  lesson113.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_3/index.html"); });
  lesson114.addEventListener("mouseup",function () { window.parent.handleFadingAndNavigation("/lessons_in_iframes/level_1/unit_1/lesson_4/index.html"); });
}

/* MOVED THIS TO js_for_preload_handling because load event doesn't fire as src change terminates the script execution
MUCH LATER: when js_for_preload_handling became DEPRECATED and this function had to be revised and relocated to ...
function handleFadingAndNavigation(srcPath) {
  window.parent.ayFreym.classList.add("everyThingFadesToBlack");
  const orbitingCircles = window.parent.document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701);
  setTimeout(function() {
    window.parent.ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {  window.parent.ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      alert("work?");
      orbitingCircles.style.display = "none";
      window.parent.ayFreym.classList.remove("everyThingFadesToBlack"); window.parent.ayFreym.classList.add("everyThingComesFromBlack");
      setTimeout(function() {  window.parent.ayFreym.classList.remove("everyThingComesFromBlack");  },2701); // 701ms was not enough???
    }
  },750);
}
*/
