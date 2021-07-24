// This is included in parent htmls only. Not in lesson htmls.
// Even though this is deferred, looks like we still need to wait for the load event before we call a function from another js file.
var hasGoneFullscreen = false;
// Go fullscreen by touching anywhere on the screen.
window.addEventListener("load",function() {
  var iframe = document.getElementById('theIdOfTheIframe'); // Actually the exact same thing was defined with const iFrameScriptAccess in js_for_all_container_parent_htmls.js

  // GO FULLSCREEN ON MOBILE AS SOON AS THE USER SELECTS WHICH LANGUAGE HE/SHE WANTS TO LEARN
  // AND RETURN TO FULLSCREEN WITH THE FIRST TOUCH IF USER NAVIGATES AWAY FROM THE APP AND COMES BACK
  if (deviceDetector.isMobile) {
    // With every click/touch/tap, will try to go fullscreen unless it is not fullscreen already.
    // document.addEventListener("touchstart",openFullscreen); // We don't need this, do we?
    // iframe.onload = function() {    iframe.contentWindow.addEventListener("touchstart", function () {   if (!hasGoneFullscreen) {  openFullscreen();  }   });    };
  }
  // THE RIGHT CLICK METHOD ON DESKTOPS
  else {
    var currentSrcParsed;
    // Every time the iframe is loaded, add the custom context menu to either the parent document or the framed document.
    iframe.onload = function() {
      currentSrcParsed = iframe.src.substring(iframe.src.length - 10, iframe.src.length-5); // Get the name of the html file from a string like "/user_interface/blank.html"
      // When user is viewing the main menu
      if (currentSrcParsed == "blank") {
        document.addEventListener('contextmenu', rightClickHandlerFunction);
        document.addEventListener('mousedown', coordinatesF);
        window.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        document.addEventListener('mousedown', toggleRightClickMenuOff);
        document.addEventListener('dblclick', toggleFullScreen);
      }
      // When user is viewing a lesson
      else {
        iframe.contentWindow.document.addEventListener('contextmenu', rightClickHandlerFunction);
        iframe.contentWindow.document.addEventListener('mousedown', coordinatesF);
        iframe.contentWindow.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        iframe.contentWindow.addEventListener('mousedown', toggleRightClickMenuOff);
        iframe.contentWindow.addEventListener('dblclick', toggleFullScreen);
      }

    }; // This line is the end of iframe.onload = function(){}; for DESKTOPS
  } // End of “else”

},{ once: true });


var rightClickMenu = document.createElement("DIV");
var goFullscreenWebp = document.createElement("IMG");
var exitFullscreenWebp = document.createElement("IMG");
// AVOID: Do not use reference to root with "/" as it could be uncertain what the root is in case of deep-iframing for domain masking.
goFullscreenWebp.src = "user_interface/images/right_click_go_for_fullscreen.webp";
exitFullscreenWebp.src = "user_interface/images/right_click_no_more_fullscreen.webp";
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
