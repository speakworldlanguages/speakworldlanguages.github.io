// IDEA: Could get network speed and make some "fine adjustments" but that would -in most cases- be an overkill.
// REVIEW AND MODIFICATION 1: This used to be for handling the iframed-lesson-htmls only. But it turned out that the parent-container-htmls need this as well.
// REVIEW AND MODIFICATION 2: We have just made this "parents-only" and now everything will be handled from the containers.
// REMEMBER: Relative paths are SAFER than absolute root paths. But caching is done with root paths so...

// Defer or NOT defer.
/* PROBABLY: Not necessary anymore,,,
var preloadCoverIsShowingNow = false; // LOOKS LIKE: This isn't used anywhere (as of July 2022)
// let isItTakingTooLongToLoad;
// NOT IMPLEMENTED FOR SIMPLICITY: let slowConnectionTryAgainOrWaitText = "Try reloading the app?"; // Default msg,,, this will be overwritten by fetch once the msg in userInterfaceLanguage is loaded
function setPreloadCoverIsShowingNowToTrue() { // See js_for_app_initialization_in_parent (wherever ayFreym.src is changed)
  preloadCoverIsShowingNow = true; // See js_for_the_sliding_navigation_menu for its usage. WAIT there is nothing in that js file about it
  // Check and handle slow-connection or app-is-frozen problem
  // Ask if the user wants to try a refresh every ?? seconds.
}
*/
/* NEED something better than this
isItTakingTooLongToLoad = setInterval(function(){
  if (confirm(slowConnectionTryAgainOrWaitText)) {
    //"User has pressed OK!";
    window.location.reload(); // Refresh
    // IDEA: HOW ABOUT REFRESHING THE IFRAME ONLY???
  } // No need for "else"
}, 35000);
*/
/* PROBABLY: Not necessary anymore
function setPreloadCoverIsShowingNowToFalse() { // See js_for_app_initialization_in_parent (window load + iframe load). Will fire whenever an iframe load happens. PROBABLY including blank.html
  preloadCoverIsShowingNow = false; // See js_for_the_sliding_navigation_menu for its usage. WAIT there is nothing in that js file about it
  // Handle slow connection or load-freezing problem
  // clearInterval(isItTakingTooLongToLoad); // NEED something better than this
}
*/

/*
window.addEventListener("DOMContentLoaded",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  // fetch slowConnectionTryAgainOrWaitText

  //const filePathForResetTheAppText = "/user_interface/text/"+userInterfaceLanguage+"/0-do_you_want_to_reset.txt";
  //fetch(filePathForResetTheAppText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ slowConnectionTryAgainOrWaitText = contentOfTheTxtFile; });

}, { once: true });

window.addEventListener("load",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again

  // setTimeout(function () {   setPreloadCoverIsShowingNowToFalse();   },505);
}, { once: true });
*/
// See js_for_all_iframed_lesson_htmls
/*
function handleFadingAndNavigation(srcPath) {
  ayFreym.classList.add("everyThingFadesToBlack"); // Why not get rid of this and just fade the orbiting animation in over it
  const orbitingCircles =  document.getElementById('orbitingCirclesDivID');
  setTimeout(function () {   orbitingCircles.style.display = "flex";   },701); // From display none;
  setTimeout(function() {
    ayFreym.addEventListener('load',frameIsLoadedByProgressChartNav,{ once: true });
    setTimeout(function() {   ayFreym.src = srcPath;  },100);
    function frameIsLoadedByProgressChartNav() {
      orbitingCircles.style.display = "none";
      ayFreym.classList.remove("everyThingFadesToBlack");  ayFreym.classList.add("everyThingComesFromBlack");
      setTimeout(function() {   ayFreym.classList.remove("everyThingComesFromBlack");   },2701); // 701ms was not enough???
    }
  },750);
}
*/
