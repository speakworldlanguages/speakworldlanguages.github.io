// This is included in parent htmls only. Not in lesson htmls.
// Even though this is deferred, looks like we still need to wait for the load event before we call a function from another js file.

// See js_for_different_browsers_and_devices ... Also see js_for_the_sliding_navigation_menu
var deactivationSound1, activationSound1, errorSound;

var hasGoneFullscreen = false;
// Go fullscreen by touching anywhere on the screen.
window.addEventListener("load",function() {
  deactivationSound1 = new Howl({  src: ["/user_interface/sounds/thingy_one_deactivate."+audioFileExtension]  }); // Desktops: FULLSCREEN,,, Mobiles: NAVIGATION MENU
  activationSound1 = new Howl({  src: ["/user_interface/sounds/thingy_one_activate."+audioFileExtension]  }); // Desktops: FULLSCREEN,,, Mobiles: NAVIGATION MENU
  errorSound = new Howl({  src: ["/user_interface/sounds/thingy_two_error."+audioFileExtension]  }); // Mobiles only: Touch once - Touch twice distinction

  const iFrameLocalConst = document.getElementsByTagName('IFRAME')[0]; // Used to be .getElementById('theIdOfTheIframe'); // Check js_for_all_container_parent_htmls.js prevent conflicts
  const iDocWindow = iFrameLocalConst.contentWindow || iFrameLocalConst.contentDocument;

  // HOW TO GO AND STAY IN FULLSCREEN ON MOBILES
  /**/
  // See js_for_all_container_parent_htmls to find how o-p-e-n-F-u-l-l-s-c-r-e-e-n() is called.
  // DEPRECATED: o-p-e-n-F-u-l-l-s-c-r-e-e-n() is called via handleTheFirstGoingFullscreenOnMobiles() when either of these two things happen,
  // 1- when user taps on a button in the main menu (language selection menu) 2- when user taps the "return to the last saved point" button
  // But ALSO must RETURN TO FULLSCREEN WITH THE FIRST TOUCH if user navigates away from the app and comes back and THE REASON is
  // BECAUSE most browsers won't allow going fullscreen without a user gesture... That means calling o-p-e-n-F-u-l-l-s-c-r-e-e-n() with Onblur Onfocus or document.visibilitychange won't work.
  // So here is how we do it...

  if (deviceDetector.isMobile) {
    // We cannot directly add an event listener for touchstart/mousedown on the iframe. So instead add it to the documentSmthSmth in the iFrame.
    iFrameLocalConst.addEventListener("load",iframeHasBeenLoadedOnMobileBrowser); // Try not using once:true
    function iframeHasBeenLoadedOnMobileBrowser() {
      // Try touchend instead of touchstart to see if it will fix the console error » "fullscreen error"
      iDocWindow.document.addEventListener("touchend", handleTouchForFullscreen); // Tried to removeEventListener with 'unload' but neither 'unload' nor 'hashchange' fires on the iframe.
    }
    function handleTouchForFullscreen() {
      if (!hasGoneFullscreen){  openFullscreen();  } // This works but it gives an error for the first touch. Was able to turn the error into something useful by adding errorSound.play();
    }
  } else {
    // THE RIGHT CLICK METHOD ON DESKTOPS
    var currentSrcParsed;
    // Every time the iframe is loaded, add the custom context menu to either the parent document or the framed document.
    iFrameLocalConst.addEventListener("load",iframeHasBeenLoadedOnDesktopBrowser,{once:true});
    function iframeHasBeenLoadedOnDesktopBrowser() {
      // DEPRECATED: currentSrcParsed = iFrameLocalConst.src.substring(iFrameLocalConst.src.length - 10, iFrameLocalConst.src.length-5); // Get the name of the html file from a string like "/user_interface/blank.html"
      const currentSrc = iFrameLocalConst.src;
      // When user is viewing the main menu
      if (currentSrc.search("blank.html") >= 0) {
        document.addEventListener('contextmenu', rightClickHandlerFunction);
        document.addEventListener('mousedown', coordinatesF);
        window.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        document.addEventListener('mousedown', toggleRightClickMenuOff);
        document.addEventListener('dblclick', toggleFullScreen);
      } else { // When user is viewing a lesson
        iFrameLocalConst.contentWindow.document.addEventListener('contextmenu', rightClickHandlerFunction);
        iFrameLocalConst.contentWindow.document.addEventListener('mousedown', coordinatesF);
        iFrameLocalConst.contentWindow.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        iFrameLocalConst.contentWindow.addEventListener('mousedown', toggleRightClickMenuOff);
        iFrameLocalConst.contentWindow.addEventListener('dblclick', toggleFullScreen); // NOTE: dblclick means either left double-click or right double-click
      }

    } // This line is the end of iframeHasBeenLoadedOnDesktopBrowser()
  } // End of “else”

},{ once: true });


var rightClickMenu = document.createElement("DIV");
var goFullscreenWebp = document.createElement("IMG");
var exitFullscreenWebp = document.createElement("IMG");
// AVOID: Do not use reference to root with "/" as it could be uncertain what the root is in case of deep-iframing for domain masking.
goFullscreenWebp.src = "/user_interface/images/right_click_go_for_fullscreen.webp";
exitFullscreenWebp.src = "/user_interface/images/right_click_no_more_fullscreen.webp";
rightClickMenu.appendChild(goFullscreenWebp);
rightClickMenu.appendChild(exitFullscreenWebp);
rightClickMenu.classList.add("rightClickMenuWithWebpsInside"); // See css_for_every_single_html.css

var isContextMenuDisplayed = false;

var x,y;
function coordinatesF(event) {   x=event.clientX;  y=event.clientY;     }

function rightClickHandlerFunction(event) {

  event.preventDefault();
  if (!hasGoneFullscreen) {
    goFullscreenWebp.style.display = "block";
    exitFullscreenWebp.style.display = "none";
  } else {
    goFullscreenWebp.style.display = "none";
    exitFullscreenWebp.style.display = "block";
  }
  rightClickMenu.style.left = String(x)+"px";
  rightClickMenu.style.top = String(y)+"px";
  document.body.appendChild(rightClickMenu);
  isContextMenuDisplayed = true;
  rightClickMenu.addEventListener("mousedown",toggleFullScreen,{ once: true });
}

function toggleFullScreen() { // Note: It double fires during a lesson if main menu was already fullscreened before arriving at the lesson.
  if (!hasGoneFullscreen) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function toggleRightClickMenuOff() {
  if (isContextMenuDisplayed) {
    document.body.removeChild(rightClickMenu);
    isContextMenuDisplayed = false;
  }
}

var theWholeDocument = document.documentElement;
/* Function to open fullscreen mode */
function openFullscreen() {
  /* There is a weird thing on Android as fullscreen permission is not granted before the second touch event. It still works though. */
  if (theWholeDocument.requestFullscreen) {
    theWholeDocument.requestFullscreen();
  } else if (theWholeDocument.mozRequestFullScreen) { /* Firefox */
    theWholeDocument.mozRequestFullScreen();
  } else if (theWholeDocument.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    theWholeDocument.webkitRequestFullscreen();
  } else if (theWholeDocument.msRequestFullscreen) { /* IE/Edge */
    theWholeDocument = window.top.document.body; //To break out of frame in IE
    theWholeDocument.msRequestFullscreen();
  }
  /* DEPRECATED: Used to handle audio on mobile with RESIZE*/ // See js_for_the_sliding_navigation_menu.js //
  if (deviceDetector.device=="desktop") {
    activationSound1.play();
  } else {

    // activationSound2.play(); // See js_for_different_browsers_and_devices.js
    // Handle audio according to the "weird two touches problem" without creating conflict with iOS
    if (detectedOS.name != "iOS") { errorSound.play(); } // No need for DOMContentLoaded etc???
  }
}

/* Function to close fullscreen mode */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    window.top.document.msExitFullscreen();
  }
  /*Handle audio on mobile with RESIZE*/ // See js_for_the_sliding_navigation_menu.js
  if (deviceDetector.device=="desktop") {
    deactivationSound1.play(); // Let it be heard only on desktops,,, Actually: This wouldn't play on mobiles even if wasn't inside an "if-desktop" since on mobiles exiting fullscreen happens without closeFullscreen().
  } else { // What happens when fullscreen is closed on tablets and phones
    // deactivationSound2.play(); // See js_for_different_browsers_and_devices.js
    if (typeof swipeMenuIsDisabled == "boolean") { // Check if it exists even if they are both at parent level
      swipeMenuIsDisabled = false; // Enable it (it could have been disabled because of a game-input-conflict) See js_for_the_sliding_navigation_menu.js
    }
  }
}

/* Change boolean hasGoneFullscreen every time fullscreen is opened or closed*/
document.addEventListener("fullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    // console.log("fullscreenchange event fired! and now it is fullscreen");
  } else {
    hasGoneFullscreen = false;
    // console.log("fullscreenchange event fired! and now it is back to default view");
  }
});
document.addEventListener("mozfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
document.addEventListener("webkitfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
document.addEventListener("msfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
