// IDEA: Could get network speed and make some "fine adjustments" but that would be an overkill.
// REVIEW AND MODIFICATION 1: This used to be for handling the iframed-lesson-htmls only. But it turned out that the parent-container-htmls need this as well.
// REVIEW AND MODIFICATION 2: We will just make this parents-only...
// REMEMBER: Relative paths are SAFE with DEEP-iFRAMING.

// Defer or NOT defer.
var preloadHandlingDiv; // Will be called from bread.js, water.js etc
let preloadGlobeImg; // Won't be called from anywhere else but here only.
window.addEventListener("DOMContentLoaded",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadHandlingDiv = document.getElementById('idOfThePreloadHandlingDiv'); /* LET THE CREATION OF THIS DIV BE DONE IMMEDIATELY INSIDE HTML FILES and not here */
  preloadGlobeImg = document.getElementById('globeFrameZeroImgID');
}, { once: true });
window.addEventListener("load",function() { // Parents ONLY! Will fire 1 time when the app loads for the first time and never again
  preloadGlobeImg.src = "user_interface/images/rotating_globe_100x150.webp"; // Change the low KB single frame webp with the animated one.
  preloadHandlingDiv.classList.add("addThisClassToHideIt"); // See css_for_every_single_html
}, { once: true });

// See js_for_all_iframed_lesson_htmls
