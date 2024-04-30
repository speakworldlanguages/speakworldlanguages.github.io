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

parent.console.log("DOM");


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

      let s;
      for (s = 0; s < allSectionButtonElementsAreInThisArray.length; s++) {
        parent.console.log("_section_");
        allSectionButtonElementsAreInThisArray[s].addEventListener("touchstart",touchstartSection);
        function touchstartSection(event) { event.preventDefault(); event.stopPropagation(); // stopPropagation to prevent conflict with sliding-navigation-menu
          event.target.classList.add("sectionTouchstart"); // See css_for_proceed_buttons
          hoverOrTouchSoundForSectionElementAsButton.play();
        }
      }

      document.addEventListener('touchmove',checkFingerPosition);
      // document.addEventListener('touchend',handleTouchEndForAllSectionButtons);
      let efp = null;
      function checkFingerPosition(event) { event.preventDefault();
        parent.console.log("finger move detected");
        let touch = event.touches[0];
        efp = document.elementFromPoint(touch.clientX, touch.clientY); // DON'T NEED: touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset // because there is no scrolling in window or body
        if(efp.tagName.toLowerCase() == "section" ) {

          if (efp.classList.contains("sectionTouchstart")) {
            // Already hovered
          } else { // simulate fingerenter
            efp.classList.add("sectionTouchstart"); // See css_for_proceed_buttons
            hoverOrTouchSoundForSectionElementAsButton.play();
            // CONSIDER: FOR BETTER UX - We can send the sliding-navigation-menu back to its hiding place
            // Could also lock it until fingerup but maybe it is better if we don't
            if (parent.navMenuIsUpAndVisible) { // See js_for_the_sliding_navigation_menu
              parent.makeTheNavMenuGoDownOnMobiles(); // See js_for_the_sliding_navigation_menu
            }
            // IMPROVMENT: Check the current efp against the previous one and see if finger jumped directly from one to another
            // What if it did: Remove sectionTouchstart from the previous one, THAT'S IT, FINISHED!

            
          }

        } else { // Try to detect finger-leave when touch is on empty space or on other non-section elements in-between buttons > TEST RESULT: Nice enough
          let z;
          for (z = 0; z < allSectionButtonElementsAreInThisArray.length; z++) {
            allSectionButtonElementsAreInThisArray[z].classList.remove("sectionTouchstart");
          }
        }
      } // End of checkFingerPosition











/*

      let sectionAsButtonThatWasTouchedPreviously = null;
      // let fingerWasOnOneOfThem = false;
      function checkWhatIsTouched(event) { event.preventDefault(); // We want to let propagation be through the document to allow sliding-nav-menu swipe
        // Get the touch position
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        // Use elementFromPoint to find the element at the touch position
        efp = document.elementFromPoint(touchX, touchY);
        parent.console.log("compare");
        parent.console.log(efp);
        parent.console.log("and");
        parent.console.log(allSectionButtonElementsAreInThisArray[0]);
        if (allSectionButtonElementsAreInThisArray.includes(efp)) {
            console.log("stopping propagation");
            event.stopPropagation(); // Prevent sliding-nav-menu
            // Let's find which one
            let k;
            for (k = 0; k < allSectionButtonElementsAreInThisArray.length; k++) {

              if (allSectionButtonElementsAreInThisArray[k] === efp) { // Finger is on the kth section-as-button
                parent.console.log("FINGER IS ON BUTTON NO "+k);
                // -
                if (sectionAsButtonThatWasTouchedPreviously !== efp) {  // Fresh new fingerenter
                  parent.console.log("FINGERENTER DETECTED");
                  if (sectionAsButtonThatWasTouchedPreviously) { // Cover the case where finger has jumped from one section-as-button to another
                      sectionAsButtonThatWasTouchedPreviously.classList.remove('sectionTouchstart'); // Simulate fingerleave for the one that was jumped from
                  }
                  efp.classList.add('sectionTouchstart'); // Simulate fingerenter event
                  hoverOrTouchSoundForSectionElementAsButton.play();
                  // fingerWasOnOneOfThem = true;
                } else {
                  // Finger is lingering on an already touched element
                }
                // -
                sectionAsButtonThatWasTouchedPreviously = efp;
              }

            }
        } else {
            handleTouchEndForAllSectionButtons();
        }



        // -
        // if (fingerWasOnOneOfThem) {
        //
        //
        // }
        // -
        // How do we detect and simulate fingerleave?
      }
      function handleTouchEndForAllSectionButtons() { //event.preventDefault(); // We want to let propagation be through the document to allow sliding-nav-menu swipe
        efp = null;
        sectionAsButtonThatWasTouchedPreviously = null;
        // fingerWasOnOneOfThem = false;
        // Remove hover simulation class from all section elements
        let m;
        for (m = 0; m < allSectionButtonElementsAreInThisArray.length; m++) {
          allSectionButtonElementsAreInThisArray[m].classList.remove('sectionTouchstart'); // It is OK to NOT CHECK whether the class exists before trying to remove it
        }
      }

*/



    } else { // Desktop
      // NOTE: For section-as-buttons USE mouseup IN THE LESSON's OWN js FOR NAVIGATION AND OTHER TASKS » Yields a way better UX than mousedown
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
