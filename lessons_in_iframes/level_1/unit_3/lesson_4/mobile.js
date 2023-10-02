"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
let elementFromPoint = null;
let lastHoveredElement = null;
function acceptAndHandleScreenTouches(theCardThatIsAlreadyFlipped) {
  parent.console.log("«....----Activating touch controls----....»");
/*
  let counter = 0;
  allCards.forEach((element) => {
    if (element != theCardThatIsAlreadyFlipped) {
      element.addEventListener("touchstart",addClassWhenHovered);
      element.addEventListener("touchend", whatToDoWithTheChosenCard,{once:true});
      main.addEventListener("touchmove",detectFingerHover);
      // element.addEventListener("mouseenter",addClassWhenHovered);
      // element.addEventListener("mousemove",addClassWhenHovered);
      // element.addEventListener("mouseleave",removeClassWhenUnhovered);
      // element.addEventListener("mousedown", whatToDoWithTheChosenCard,{once:true});
      counter++;
      parent.console.log("touch events are ready for " + counter + " elements");
    }
  });
*/
  //parent.console.log(touchArea.id);
  touchArea.addEventListener("touchstart",detectFingerHover); // TRY LETTING SLIDING NAV MENU stay usable BY LISTENIG on A DIV with height calc(100% - 20px)
  touchArea.addEventListener("touchmove",detectFingerHover);
  touchArea.addEventListener("touchend",detectFingerRelease);
  //containerOfTheWholeGame.addEventListener("touchstart",detectFingerHover);

/*
  function touchAreaWasTouched(event) { event.preventDefault(); event.stopPropagation();
    parent.console.log("Touch detected... touchArea");
  }
  function containerOfTheWholeGameWasTouched(event) { event.preventDefault(); event.stopPropagation();
    parent.console.log("Touch detected... containerOfTheWholeGameWasTouched");
  }
*/

  //touchArea.addEventListener("touchmove",detectFingerHover);
  //containerOfTheWholeGame.addEventListener("touchmove",detectFingerHover);

  // main.addEventListener("touchend",detectFingerRelease);

  // CAUTION: roundedColorCards and theCardsBackFace have pointer-events set to none so they are invisible to touches

  function detectFingerHover(event) { event.preventDefault(); event.stopPropagation();
    parent.console.log("Touch detected... on touchArea");
    let touch = event.touches[0];
    elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body
    // parent.console.log(elementFromPoint.id);
    // parent.console.log(elementFromPoint.classList);
    // parent.console.log(elementFromPoint.style.zIndex);

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

  function detectFingerRelease(event) { event.preventDefault(); event.stopPropagation();
    allCards.forEach((element) => { // Those who have containerForRoundedColorCards
      if (element.classList.contains("whenFingerIsOnIt")) {
        element.classList.remove("whenFingerIsOnIt");
        element.classList.add("whenFingerIsOffIt"); // Will it work without raf? Yes, it does.
      }
    });
    // --
    let touch = event.touches[0];
    elementFromPoint = document.elementFromPoint(touch.clientX, touch.clientY);
    // --
    if (elementFromPoint.classList.contains("containerForRoundedColorCards")) {
      whatToDoWithTheChosenCard(elementFromPoint);
    }
  }

/*
  function addClassWhenHovered(event) { event.preventDefault(); event.stopPropagation();
    const card = event.target;
    if (card.classList.contains("whenFingerIsOnIt")) { } // Already hovered » do nothing
    else {  mouseEnterTouchStartSound.play(); card.classList.add("whenFingerIsOnIt");  }
  }
*/
  //???function removeClassWhenUnhovered(event) {  event.target.classList.remove("whenFingerIsOnIt");  } // WARNING: scaleUp must be removed manually after ??? touch

  function whatToDoWithTheChosenCard(card) { //event.preventDefault(); event.stopPropagation();
    mouseDownTouchEndSound.play();
    //  const card = event.target;
    // POSSIBLE CASE: WHAT IF NEITHER ???mouseenter??? NOR ???mousemove??? HAPPENED SO FAR » Handle that one too
    // if (card.classList.contains("scaleUp")) { } // Already hovered » do nothing
    // else {  card.classList.add("scaleUp");  }
    // Anyhow
    card.classList.add("whenItIsClicked");
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
    /*
    allCards.forEach((element) => {
      element.removeEventListener("touchstart",addClassWhenHovered);
      element.removeEventListener("touchend", whatToDoWithTheChosenCard,{once:true});
      main.removeEventListener("touchmove",detectFingerHover);
      // element.removeEventListener("mouseenter",addClassWhenHovered);
      // element.removeEventListener("mousemove",addClassWhenHovered);
      // element.removeEventListener("mouseleave",removeClassWhenUnhovered);
      // element.removeEventListener("mousedown", whatToDoWithTheChosenCard);
    });
    */
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
      if (!theCardThatIsAlreadyFlipped) {
        whenCorrectColorIsUtteredForThe_FIRST_Card(card,zIndexReversion);
      } else {
        whenCorrectColorIsUtteredForThe_SECOND_Card(card,zIndexReversion);
      }
    }, sayTime*2);

  } // End of nice click


}
