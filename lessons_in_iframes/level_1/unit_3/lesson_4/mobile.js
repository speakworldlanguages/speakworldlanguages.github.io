"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
let elementFromPoint = null;
let lastHoveredElement = null;
let whatShallNotRespondToTouchesAnymore = null;
function acceptAndHandleScreenTouches(theCardThatIsAlreadyFlipped) {

  whatShallNotRespondToTouchesAnymore = theCardThatIsAlreadyFlipped;

  parent.console.log("«*----Activating touch controls----*»");

  // ENHANCING UX: Let SLIDING-NAV-MENU stay usable BY LISTENIG on A DIV with height calc(100% - 40px)
  touchArea.addEventListener("touchstart",detectFingerHover);
  touchArea.addEventListener("touchmove",detectFingerHover);
  document.addEventListener("touchend",detectFingerRelease);

  // CAUTION: roundedColorCards and theCardsBackFace have pointer-events set to none so they are invisible to touches

  function detectFingerHover(event) { event.preventDefault(); event.stopPropagation();
    //parent.console.log("Touch detected... on touchArea");
    let touch = event.touches[0];
    elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body

    if (elementFromPoint.classList.contains("containerForRoundedColorCards")) {
      if (elementFromPoint.classList.contains("whenFingerIsOnIt"))      { } // Already hovered » do nothing
      else {
        mouseEnterTouchStartSound.play();
        elementFromPoint.classList.remove("whenFingerIsOffIt"); // It should be OK to skip checking if it contains
        elementFromPoint.classList.add("whenFingerIsOnIt");
      }
    } else {
      // parent.console.log("That which is touched is not a color card");
    }

    // Simulation of mouseleave
    if (lastHoveredElement) {
      if (lastHoveredElement != elementFromPoint) {
        if (lastHoveredElement.classList.contains("whenFingerIsOnIt")) {
          lastHoveredElement.classList.remove("whenFingerIsOnIt");
          lastHoveredElement.classList.add("whenFingerIsOffIt"); // Will it work without raf: Yes it does
        }
        else {   } // Already unhovered » do nothing
      }
    }
    lastHoveredElement = elementFromPoint;
  }

  function detectFingerRelease(event) { // event.preventDefault(); event.stopPropagation(); // Looks like we don't need to preventDefault or stopPropagation
    // parent.console.log("Touch END detected"); // Works but touch.clientX touch.clientY had some weird inaccuracy due to an unknown reason
    // Detect which card was chosen without touch.clientX touch.clientY
    if (whatShallNotRespondToTouchesAnymore) { // There exists one card that is already flipped
      if (elementFromPoint != whatShallNotRespondToTouchesAnymore) { // And it is not the one that was previously flipped
        checkIfReleaseHappenedOnACard();
      } else {
        // Ignore it if user touches a card that is already flipped
      }
    } else { // No card has been flipped yet
      checkIfReleaseHappenedOnACard();
    }
    // --
    function checkIfReleaseHappenedOnACard() {
      if (elementFromPoint.classList.contains("containerForRoundedColorCards")) {
        if (elementFromPoint.classList.contains("whenFingerIsOnIt")) {
          elementFromPoint.classList.remove("whenFingerIsOnIt");

          touchArea.removeEventListener("touchstart",detectFingerHover);
          touchArea.removeEventListener("touchmove",detectFingerHover);
          document.removeEventListener("touchend",detectFingerRelease);

          whatToDoWithTheChosenCard(elementFromPoint);

          // If the chosen card is the first one of two, then we make it invisible to touches ... until???
          if (!theCardThatIsAlreadyFlipped) {  whatShallNotRespondToTouchesAnymore = elementFromPoint;  }
          // Until
          // A-) Speech Recog fails to detect the name of the color and THAT ONE CARD is reset
          // B-) Two cards don't match and the game is reset
          // C-)
        }
      }
    }
  } // End of detectFingerRelease

  function whatToDoWithTheChosenCard(card) { //event.preventDefault(); event.stopPropagation();
    parent.console.log("The chosen card was: " + card.id);
    mouseDownTouchEndSound.play();
    // const card = event.target;
    // IMPOSSIBLE CASE: In desktop.js we asked: WHAT IF NEITHER ???mouseenter??? NOR ???mousemove??? HAPPENED SO FAR » Handle that one too
    // if (card.classList.contains("scaleUp")) { } // Already hovered » do nothing
    // else {  card.classList.add("scaleUp");  }
    // Anyhow
    card.classList.add("whenItIsTouched");
    parent.console.log("z-index when touch event fired: "+card.parentNode.style.zIndex);
    // Save original zIndex to be able to revert
    const zIndexReversion = card.parentNode.style.zIndex;
    card.parentNode.style.zIndex = zIndexReversion+"0";
    parent.console.log("z-index has been changed into: "+card.parentNode.style.zIndex);
    fullVpDarkBlue.style.display = "block";
    let appearTime;
    switch (parent.speedAdjustmentSetting) {   case "slow": appearTime = 3; break; case "fast": appearTime = 1; break; default: appearTime = 2;   }
    fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(appearTime*2)+"s"; // 4s for default speed
    new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, appearTime*1000); // Paused at halfway » 2000ms at default speed
    // ....
    // Play teacher's voice
    let sayTime;
    switch (parent.speedAdjustmentSetting) {
      case "slow": sayTime = 4000; break;
      case "fast": sayTime = 1000; break;
      default:     sayTime = 2500;
    }
    new SuperTimeout(function () {
      switch (card.id) {
        case "white":  sayWhite2.play();  break;
        case "green":  sayGreen2.play();  break;
        case "blue":   sayBlue2.play();   break;
        case "yellow": sayYellow2.play(); break;
        case "red":    sayRed2.play();    break;
        case "black":  sayBlack2.play();  break;
        default:
      }
    }, sayTime);
    new SuperTimeout(function () {
      // Start speech recognition

      // Let speechRecognition session either resolve or reject

      // Do these if it resolves
      if (!theCardThatIsAlreadyFlipped) { // Such a card doesn't exist
        whenCorrectColorIsUtteredForThe_FIRST_Card(card,zIndexReversion);
      } else { // There exists a previously flipped card and that which was just chosen is the second
        whatShallNotRespondToTouchesAnymore = null; // Let all visible cards be touchable&selectable
        whenCorrectColorIsUtteredForThe_SECOND_Card(card,zIndexReversion); // Will either «not match and fail» or «match and disappear»
      }
      // Do these if it rejects


    }, sayTime*2);

  } // End of whatToDoWithTheChosenCard


} // End of acceptAndHandleScreenTouches
