// IDEA: Could get network speed and make some "fine adjustments" but that would -in most cases- be an overkill.
// REVIEW AND MODIFICATION 1: This used to be for handling the iframed-lesson-htmls only. But it turned out that the parent-container-htmls need this as well.
// REVIEW AND MODIFICATION 2: We have just made this "parents-only" and now everything will be handled from the containers.
// REMEMBER: Relative paths are SAFER than absolute root paths.

// Defer or NOT defer.
var preloadCoverIsShowingNow = false;
let isItTakingTooLongToLoad;
let slowConnectionTryAgainOrWaitText = "Reset?"; // Default msg
function setPreloadCoverIsShowingNowToTrue() { // See js_for_all_container_parent_htmls (wherever iFrameScriptAccess.src is changed)
  preloadCoverIsShowingNow = true; // See js_for_the_sliding_navigation_menu for its usage
  /*Check and handle slow-connection or app-is-frozen problem*/
  // Ask if the user wants to try a refresh every 14 seconds.
  isItTakingTooLongToLoad = setInterval(function(){
    if (confirm(slowConnectionTryAgainOrWaitText)) {
      //"User has pressed OK!";
      window.location.reload(); // Refresh
    } // No need for "else"
  }, 14000);
}
function setPreloadCoverIsShowingNowToFalse() { // See js_for_all_container_parent_htmls (window load + iframe load). Will fire whenever an iframe load happens.
  preloadCoverIsShowingNow = false; // See js_for_the_sliding_navigation_menu for its usage
  /*Handle slow connection or load-freezing problem*/
  clearInterval(isItTakingTooLongToLoad);
}

var preloadHandlingDiv; // Will be called from bread.js, water.js etc
let preloadGlobeImg; // Won't be called from anywhere else but here only.
window.addEventListener("DOMContentLoaded",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadHandlingDiv = document.getElementById('idOfThePreloadHandlingDiv'); /* LET THE CREATION OF THIS DIV BE DONE IMMEDIATELY INSIDE HTML FILES and not here */
  preloadGlobeImg = document.getElementById('globeFrameZeroImgID');
}, { once: true });
window.addEventListener("load",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadGlobeImg.src = "user_interface/images/rotating_globe_100x150.webp"; // Change the low KB single frame webp with the animated one.
  preloadHandlingDiv.classList.add("addThisClassToHideIt"); // See css_for_every_single_html
  // fetch slowConnectionTryAgainOrWaitText
  const filePathForResetTheAppText = "user_interface/text/"+userInterfaceLanguage+"/0-do_you_want_to_reset.txt";
  fetch(filePathForResetTheAppText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ slowConnectionTryAgainOrWaitText = contentOfTheTxtFile; });
}, { once: true });

// See js_for_all_iframed_lesson_htmls
