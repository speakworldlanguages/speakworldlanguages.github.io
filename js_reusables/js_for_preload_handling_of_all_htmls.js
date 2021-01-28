// IDEA: Could get network speed and make some "fine adjustments" but must not overkill.
// REVIEW AND MODIFICATION: This used to be for handling the iframed-lesson-htmls only. But it turned out that the parent-container-htmls need this as well.
// CAREFUL: File paths used to be relative to the iframed-lesson-htmls. But to be able to use this code for every html we will make the paths relative to the root like "/folder/file.ext"!
// REMEMBER: Relative paths are SAFE with DEEP-iFRAMING. So, we tried to avoid using absolute paths relative to the root "/".

// Defer or NOT defer.
window.addEventListener('DOMContentLoaded', function(){
    /* Inside the HTML there must be a full width full height div that is layered on top of the actual content to hide everything until all bytes are loaded then disappear to reveal the app */
    const preloadHandlingDiv = document.getElementById('idOfThePreloadHandlingDiv'); /* LET THE CREATION OF THIS DIV BE DONE IMMEDIATELY INSIDE HTML FILES and not here */

    // preloadHandlingDiv.classList.add("addThisClassToTheDivOfPreloadHandlingAsSoonAsItIsCreated"); /* NOT FAVORABLE. WILL DO INLINE FOR IMMEDIATE EFFECT */
    // NOTE THAT: Something like document.body.appendChild(WHATEVERITIS); must not happen before body is created in the DOM!

    // Create the video element and put it inside the preload handling div.
    // User must see a purely white screen until this gets executed and thus visuals are displayed.
    const loadingAnimationVideo = document.createElement("VIDEO");

    // Set video attributes.
    loadingAnimationVideo.width="100";
    loadingAnimationVideo.height="150";
    loadingAnimationVideo.style.width="100px";
    loadingAnimationVideo.style.height="150px";
    loadingAnimationVideo.style.objectFit = "scale-down";
    // Quit using poster because the image gets terribly distorted on mobile! Instead use 1px transparent image and display the graphic as an element background.
    // loadingAnimationVideo.poster = "../../../../user_interface/images/rotating_globe_100x150.webp";
    // See https://stackoverflow.com/questions/10826784/make-html5-video-poster-be-same-size-as-video-itself
    // loadingAnimationVideo.style.border="2px dotted black"; // Used during tests
    // loadingAnimationVideo.style.background="transparent url('../../../../user_interface/images/rotating_globe_100x150.webp') 50% 50% / cover no-repeat"; // In this case, have to use root instead.
    // Two ways to solve if a problem happens because of deep-iframing.
    // 1- Create a duplicate of this js file and make the file paths all relative again for each level of htmls.
    // 2- Create an if condition here to get the html file's level and make the file paths all relative again.
    loadingAnimationVideo.style.background="transparent url('/user_interface/images/rotating_globe_100x150.webp') 50% 50% / cover no-repeat";
    loadingAnimationVideo.poster = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // 1x1 pixel transparent gif
    // loadingAnimationVideo.src = "../../../../user_interface/images/rotating_globe_100x150.webm"; // In this case, have to use root instead.
    loadingAnimationVideo.src = "/user_interface/images/rotating_globe_100x150.webm";
    loadingAnimationVideo.autoplay = true;
    loadingAnimationVideo.loop = true;

    // Add it to the page (or should we say app).
    preloadHandlingDiv.appendChild(loadingAnimationVideo);

    // Make it disappear once all pictures etc are ready.
    window.addEventListener("load",function(){  preloadHandlingDiv.classList.add("addThisClassToHideIt");   }, { once: true }); // Had to move this class from “css_for_all_lesson_htmls” to “css_for_every_single_html”.
    // Test result: It works.

}, { once: true });
