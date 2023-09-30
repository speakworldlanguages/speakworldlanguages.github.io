"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// UNAUTHORIZED MODIFICATION IS PROHIBITED: You may not change this file without consent
function acceptAndHandleMouseClicks(theCardThatIsAlreadyFlipped) {


  let counter = 0;
  allCards.forEach((element) => {
    if (element != theCardThatIsAlreadyFlipped) {
      element.addEventListener("mouseenter",addClassWhenHovered);
      element.addEventListener("mouseleave",removeClassWhenUnhovered);
      element.addEventListener("mousedown", niceClick,{once:true});
      counter++;
      console.log("mouse events are ready for " + counter + " elements");
    }
  });


  function addClassWhenHovered(event) {
    mouseEnterTouchStartSound.play();
    const card = event.target; card.classList.add("scaleUp");
  }
  function removeClassWhenUnhovered(event) {  event.target.classList.remove("scaleUp");  } // WARNING: scaleUp must be removed manually after mousedown

  function niceClick(event) {
    mouseDownTouchEndSound.play();
    const card = event.target;
    card.classList.add("whenItIsClicked");
    console.log(card.parentNode.style.zIndex);
    // Save original zIndex to be able to revert
    card.parentNode.style.zIndex = "100";
    fullVpDarkBlue.style.display = "block";
    let appearTime;
    switch (parent.speedAdjustmentSetting) {   case "slow": appearTime = 3; break; case "fast": appearTime = 1; break; default: appearTime = 2;   }
    fullVpDarkBlue.classList.add("darkenLightenBackground"); fullVpDarkBlue.style.animationDuration = String(appearTime*2)+"s"; // 4s for default speed
    new SuperTimeout(function(){ fullVpDarkBlue.style.animationPlayState = "paused"; }, appearTime*1000); // Paused at halfway » 2000ms at default speed
    allCards.forEach((element) => {
      element.removeEventListener("mouseenter",addClassWhenHovered);
      element.removeEventListener("mouseleave",removeClassWhenUnhovered);
      element.removeEventListener("mousedown", niceClick);
    });
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
        const zIndexReversion = card.parentNode.style.zIndex;
        whenCorrectColorIsUtteredForThe_FIRST_Card(card,zIndexReversion);
      } else {
        const zIndexReversion = card.parentNode.style.zIndex;
        whenCorrectColorIsUtteredForThe_SECOND_Card(card,zIndexReversion);
      }

    }, sayTime*2);

  } // End of nice click
}
