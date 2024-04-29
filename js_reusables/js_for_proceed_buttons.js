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
    window.addEventListener('beforeunload', function () {
      hoverOrTouchSoundForSectionElementAsButton.unload();
    });

    // -
    let k;
    for (k = 0; k < allSectionButtonElementsAreInThisArray.length; k++) {
      if (deviceDetector.isMobile) {
        allSectionButtonElementsAreInThisArray[k].addEventListener("touchstart", hoverOrTouchStartSection);
      } else {
        allSectionButtonElementsAreInThisArray[k].addEventListener("mouseenter", hoverOrTouchStartSection);
      }
    }
    function hoverOrTouchStartSection() {  hoverOrTouchSoundForSectionElementAsButton.play();  } // financial_thirdparty_hover completes in 261ms

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
    function hoverOrTouchStartAddress() {  hoverSoundForAddressElementAsButton.play();  }
    function mouseDownOrTouchEndAddress() {  clickSoundForAddressElementAsButton.play();  } // 470ms
  } else {
    // DO NOTHING as there are no address elements in the document
  }
  // End of ADDRESS button handling




}, { once: true });
