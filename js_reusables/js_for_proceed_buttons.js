"use strict";
// Code written by Manheart Earthman=B. A. Bilgekılınç Topraksoy=土本 智一勇夫剛志
// This file MAY NOT BE MODIFIED WITHOUT CONSENT i.e. OFFICIAL AUTHORIZATION

// USE SECTION & ADDRESS elements as new/other TYPES OF BUTTONS
// April 2024 UPDATE: SECTION ELEMENT is no longer used for author's notice screen
/* ADDRESS element is turned into the button for [See how you can help] in we_are_working_for_new_levels */
/* SECTION element is turned into the buttons in 1-3-4 */
let hoverSoundForAddressElementAsButton;
let clickSoundForAddressElementAsButton;

let hoverOrTouchSoundForSectionElementAsButton;

window.addEventListener('DOMContentLoaded', function(){




  //_______ See lesson 1-3-4
  const allSectionButtonElementsAreInThisArray = document.getElementsByTagName("SECTION");
  // See if any section elements exist by checking array length » The value of zero means false in ECMAScript
  if (allSectionButtonElementsAreInThisArray.length) {
    hoverOrTouchSoundForSectionElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/financial_thirdparty_hover."+soundFileFormat]  });
    // Normally, unique lesson sounds get unloaded when beforeunload in js_for_all_iframed_lesson_htmls fires unloadTheSoundsOfThisLesson
    // Here we must EITHER add these sounds to the unique sound list of the lesson OR create a dedicated unloader function
    window.addEventListener('beforeunload', function () {      hoverOrTouchSoundForSectionElementAsButton.unload();     });
    // -
    if (deviceDetector.isMobile) {
      //stopPropagation to prevent conflict with sliding nav menu
      let p;
      for (p = 0; p < allSectionButtonElementsAreInThisArray.length; p++) {
          allSectionButtonElementsAreInThisArray[p].addEventListener('touchstart',stopPropagation); // Block sliding-nav-menu swipe
          allSectionButtonElementsAreInThisArray[p].addEventListener('touchmove',stopPropagation); // Block sliding-nav-menu swipe
          function stopPropagation(event) { event.stopPropagation(); event.preventDefault(); }
      }

      window.addEventListener('touchstart',checkWhatIsTouched);
      window.addEventListener('touchmove',checkWhatIsTouched);
      window.addEventListener('touchend',handleTouchEndForAllSectionButtons);
      let lastTouchedElement = null;
      function checkWhatIsTouched(event) { event.preventDefault(); // We want to let propagation be through the document to allow sliding-nav-menu swipe
        // Get the touch position
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        // Use elementFromPoint to find the element at the touch position
        lastTouchedElement = document.elementFromPoint(touchX, touchY);
        let k;
        for (k = 0; k < allSectionButtonElementsAreInThisArray.length; k++) {
          if (lastTouchedElement == allSectionButtonElementsAreInThisArray[k]) {
            hoverOrTouchSoundForSectionElementAsButton.play();
            allSectionButtonElementsAreInThisArray[k].classList.add('sectionTouchstart');
          }
        }
      }
      function handleTouchEndForAllSectionButtons(event) { event.preventDefault(); // We want to let propagation be through the document to allow sliding-nav-menu swipe
        lastTouchedElement = null;
        // Remove hover simulation class from all section elements
        let m;
        for (m = 0; m < allSectionButtonElementsAreInThisArray.length; m++) {
          allSectionButtonElementsAreInThisArray[m].classList.remove('sectionTouchstart'); // It is OK to NOT CHECK whether the class exists before trying to remove it
        }
      }

    } else {
      let n;
      for (n = 0; n < allSectionButtonElementsAreInThisArray.length; n++) {
          allSectionButtonElementsAreInThisArray[n].addEventListener("mouseenter", ()=>{ hoverOrTouchSoundForSectionElementAsButton.play(); });
      }
    }
    // -
    /* DEPRECATE
    let thatWhichWasTouched = null;
    function hoverOrTouchStartSection(event) {  //event.stopPropagation();  event.preventDefault();
      hoverOrTouchSoundForSectionElementAsButton.play();
      thatWhichWasTouched = event.target;
      parent.console.log("touchstart works, add sectionTouchstart class to");
      parent.console.log(thatWhichWasTouched);
      thatWhichWasTouched.classList.add('sectionTouchstart');
    } // financial_thirdparty_hover.webm/mp3 completes in 261ms

    function touchEndSection(event) {  //event.stopPropagation();  event.preventDefault();
      thatWhichWasTouched.classList.remove('sectionTouchstart');
      thatWhichWasTouched = null;
    }
    */
  } else {
    // DO NOTHING as there are no section elements in the document
  }
  // End of SECTION button handling






  //_______ See » /lessons_in_iframes/we_are_working_for_new_levels/index.html
  const allAddressButtonElementsAreInThisArray = document.getElementsByTagName("ADDRESS");
  // See if any address elements exist by checking array length » The value of zero means false in ECMAScript
  if (allAddressButtonElementsAreInThisArray.length) { // Load the sounds only and only if there are address elements found in this lesson
    // soundFileFormat exists in js_for_all_iframed_lesson_htmls where it is copied from the parent in js_for_different_browsers_and_devices
    hoverSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_hover."+soundFileFormat]  });
    clickSoundForAddressElementAsButton = new parent.Howl({  src: ["/user_interface/sounds/address_as_button_click."+soundFileFormat]  });
    // Normally, unique lesson sounds get unloaded when beforeunload in js_for_all_iframed_lesson_htmls fires unloadTheSoundsOfThisLesson
    // Here we must EITHER add these sounds to the unique sound list of the lesson OR create a dedicated unloader function
    window.addEventListener('beforeunload', function () {
      hoverSoundForAddressElementAsButton.unload();
      clickSoundForAddressElementAsButton.unload(); // There must be enough time to play the sound to the end before navigating away » Check /lessons_in_iframes/we_are_working_for_new_levels/index.html » April 2024: 700ms will be enough
    });

    // -
    let i;
    for (i = 0; i < allAddressButtonElementsAreInThisArray.length; i++)
    {
      if (deviceDetector.device == "desktop") {
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseenter", hoverOrTouchStartAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", mouseDownOrTouchEndAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("mouseup", timeToMove); // Playstation style disappear
      } else {
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchstart", hoverOrTouchStartAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", mouseDownOrTouchEndAddress);
        allAddressButtonElementsAreInThisArray[i].addEventListener("touchend", timeToMove,{once:true});
      }
    }
    // -
    function timeToMove(event) {
      if (deviceDetector.device == "desktop") {
        event.target.classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html
      } else {
        let j;
        for (j = 0; j < allAddressButtonElementsAreInThisArray.length; j++) {
          allAddressButtonElementsAreInThisArray[j].classList.add('addThisToAButtonForPlayStationStyleClick'); // See css_for_every_single_html ,,, completes in 0.6s
        }
      }
    }
    // stopPropagation???
    function hoverOrTouchStartAddress(event) {  event.stopPropagation();  event.preventDefault();  hoverSoundForAddressElementAsButton.play();  }
    function mouseDownOrTouchEndAddress(event) {  event.stopPropagation();  event.preventDefault();  clickSoundForAddressElementAsButton.play();  } // 470ms
  } else {
    // DO NOTHING as there are no address elements in the document
  }
  // End of ADDRESS button handling




}, { once: true });
