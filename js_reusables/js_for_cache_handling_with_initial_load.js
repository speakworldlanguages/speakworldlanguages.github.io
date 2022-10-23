"use strict";
// Note that: If service-worker.js was feeding custom responses it may need to stop doing so after things are updated here i.e. adding/removing/changing files/assets
// Some of the caching below is to shorten the waiting time between lessons
// And some are only for offline mode or to make the app start faster at the second visit/run
/*https://stackoverflow.com/questions/73237370/how-to-chain-caching-cache-your-assets-set-by-set-according-to-their-priority*/
window.addEventListener("DOMContentLoaded",getTheseSoundsReadyFirst,{once:true});
async function getTheseSoundsReadyFirst() {
  const urgentCache = await caches.open('asap');
  const topPriorityfiles = [
    "/user_interface/sounds/ceramic_button_click.webm",
    "/user_interface/sounds/ceramic_button_hover.webm",
    "/user_interface/sounds/fullscreen_exit.webm",
    "/user_interface/sounds/fullscreen_open.webm",
    "/user_interface/sounds/illuminant_button_click.webm",
    "/user_interface/sounds/notification3_appear.webm",
    "/user_interface/sounds/notification3_close.webm",
    "/user_interface/sounds/user_is_away.webm",
    "/user_interface/sounds/user_is_back.webm"
  ];
  let errorHappened = false;
  try {
    console.log("Begin caching the most urgent assets");
    await urgentCache.addAll(topPriorityfiles);
  } catch(err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("Urgent assets cached successfully");
      localStorage.mustBeLoadedASAPFilesCachedSuccessfully = "cool"; // UNCLEAR will the browser redownload the set of files even if the files are there and we still try to addAll() // Do we need adderAll() by Talat Er???
    }
  }
}
window.addEventListener("load",welcomeScreenCacheHandling,{once:true}); // Run at least after DOMContentLoaded because -> js_for_different_browsers_and_devices.js
function welcomeScreenCacheHandling() {
  setTimeout(afterSomeMilliseconds,500);
  function afterSomeMilliseconds() {
    if (!localStorage.loadFilesDuringWelcomeScreenWasSuccessful) { // Condition: Either no previous attempt exists or none of the previous attempts were successful
      loadFilesDuringWelcomeScreen(); // Try
    }
  }
}

let errorHappenedIn_loadFilesDuringWelcomeScreen = false;

async function loadFilesDuringWelcomeScreen() {

  // Create the folder-like storage slots
  const myCache0 = await caches.open('primary-assets-for-running-the-app');
  const myCache1 = await caches.open('primary-assets-for-1-1-1');
  const myCache2 = await caches.open('primary-assets-for-information-and-about');
  const myCache3 = await caches.open('primary-assets-for-progress-chart');
  const myCache4 = await caches.open('secondary-assets-for-running-the-app');
  const myCache5 = await caches.open('not-for-speed-but-for-offline-support');

  // List of what to download and store in advance
  const groupZero = [
    // "/", // New buttons are expected to be added so we want the latest thing to show i.e. don't keep serving a stale outdated version while a fresh thing is available
    // "/index.html", // New buttons are expected to be added so we want the latest thing to show i.e. don't keep serving a stale outdated version while a fresh thing is available
    "/user_interface/html_icon/animated_globe_icon_39.png",
    "/css_reusables/css_for_all_iframed_lesson_htmls.css",
    "/css_reusables/css_for_displaying_translation_help.css",
    "/css_reusables/css_for_every_single_html.css",
    "/css_reusables/css_for_info_boxes_in_lessons.css",
    "/css_reusables/css_for_info_boxes_in_parent.css",
    "/css_reusables/css_for_lessons_with_interactables.css",
    "/css_reusables/css_for_photos_and_videos_teach_a_new_word.css",
    "/css_reusables/css_for_preloader_and_orbiting_circles.css",
    "/css_reusables/css_for_proceed_buttons.css",
    "/css_reusables/css_for_sliding_navigation_menu.css",
    "/css_reusables/css_for_the_container_parent_html.css",
    "/css_reusables/css_for_the_glassy_give_up_button.css",
    "/css_reusables/css_for_wavesurfer_microphone_divs.css",

    // CONSIDER: if these js files are mature enough to be cached then cache them,,, otherwise let the browser get the latest/freshest version from the server
    // If frequently updated files must be cached for offline support then we must use cache versioning and delete the older ones

    "/js_reusables/js_for_all_iframed_lesson_htmls.js",
    // "/js_reusables/js_for_app_initialization_in_parent.js", // Could be updated frequently
    // WARNING: NEVER CACHE THE js_for_handling_cache.js FILE and such files!!!
    // "/js_reusables/js_for_different_browsers_and_devices.js", // Could be updated even though rarely
    "/js_reusables/js_for_displaying_translation_help.js",
    // "/js_reusables/js_for_every_single_html.js", // Could be updated occasionally

    "/js_reusables/js_for_handling_fullscreen_mode.js",
    "/js_reusables/js_for_handling_speech_give_up.js",
    "/js_reusables/js_for_hover_simulation_and_scrollglobe.js",
    "/js_reusables/js_for_icon_and_title_animation.js",
    "/js_reusables/js_for_info_boxes_in_lessons.js",
    "/js_reusables/js_for_info_boxes_in_parent.js",
    "/js_reusables/js_for_microphone_input_visualization.js",
    "/js_reusables/js_for_proceed_buttons.js",
    // "/js_reusables/js_for_redirection_to_the_proper_domain.js", // Let's skip this one because it is expected to be updated many times and we want updates to take effect immediately
    "/js_reusables/js_for_the_sliding_navigation_menu.js",

    "/third_party_js/annyang.min.js",
    "/third_party_js/howler.min.js",
    "/third_party_js/ua-parser.min.js",
    "/third_party_js/wavesurfer.microphone.min.js",
    "/third_party_js/wavesurfer.microphone.min.js.map",
    "/third_party_js/wavesurfer.min.js",
    "/third_party_js/wavesurfer.min.js.map"
  ];

  let firstGroup = [
    "/lessons_in_iframes/level_1/unit_1/lesson_1/1_c1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/bread.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c7.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c8.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c9.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/c10.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.webm",
    "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.webm"
  ];
  if (isApple || detectedBrowser.name == "Firefox") {
    firstGroup.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_h264.mp4"/*,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.mp3"*/
    );
  } else {
    firstGroup.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/v2_vp9.webm"/*,
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_1/what_bread_sounds_like_2.ogg"*/
    );
  }

  const secondGroup = [
    "/information/index.html",
    "/information/information.css",
    "/information/information.js",
    "/information/long_arrow.png",
    "/information/topraksoy_earthman_tsuchimoto.webp",
    "/about/about.css",
    "/about/about.js",
    // "/about/index.html", -> We don't want to cache this as it is expected to be updated once in a while
    "/LICENSE"
  ];

  const thirdGroup = [
    "/progress_chart/images/bread.webp",
    "/progress_chart/images/givemewater1.webp",
    "/progress_chart/images/takebread1.webp",
    "/progress_chart/images/water.webp",
    "/progress_chart/bilinguals.css",
    // "/progress_chart/index.html", -> We don't want to cache this as it is expected to be updated regularly
    "/progress_chart/js_for_the_bilingual_return_button.js",
    "/progress_chart/progress.css"
    // "/progress_chart/progress.js" -> We don't want to cache this as it is expected to be updated regularly
  ];

  let fourthGroup = [
    "/user_interface/sounds/address_as_button_click.webm",
    "/user_interface/sounds/address_as_button_hover.webm",


    "/user_interface/sounds/ding.webm",
    "/user_interface/sounds/financial_thirdparty_click.webm",


    "/user_interface/sounds/glass_button_click.webm",
    "/user_interface/sounds/glass_button_hover.webm",

    "/user_interface/sounds/looping_bgm_stereo_therapy.webm",
    "/user_interface/sounds/notification1_appear.webm",
    "/user_interface/sounds/notification1_close.webm",
    "/user_interface/sounds/notification2_appear.webm",
    "/user_interface/sounds/notification2_close.webm",


    "/user_interface/sounds/progress_chart_click.webm",
    "/user_interface/sounds/progress_chart_hover.webm",
    "/user_interface/sounds/section_as_button_click.webm",
    "/user_interface/sounds/section_as_button_hover.webm",
    "/user_interface/sounds/success1.webm",
    "/user_interface/sounds/success2.webm"
  ];
  fourthGroup.push(
    "/user_interface/text/"+userInterfaceLanguage+"/0-about_saving_loading_users_progress.txt"
  );


  const p = "/user_interface/images/scrolly_globe_frames/250px_white_globe_";
  let fifthGroup = [
    p+"00.webp",p+"01.webp",p+"02.webp",p+"03.webp",p+"04.webp",p+"05.webp",p+"06.webp",p+"07.webp",p+"08.webp",p+"09.webp",
    p+"10.webp",p+"11.webp",p+"12.webp",p+"13.webp",p+"14.webp",p+"15.webp",p+"16.webp",p+"17.webp",p+"18.webp",p+"19.webp",
    p+"20.webp",p+"21.webp",p+"22.webp",p+"23.webp",p+"24.webp",p+"25.webp",p+"26.webp",p+"27.webp",p+"28.webp",p+"29.webp",
    p+"30.webp",p+"31.webp",p+"32.webp",p+"33.webp",p+"34.webp",p+"35.webp",p+"36.webp",p+"37.webp",p+"38.webp",p+"39.webp",
    p+"40.webp",p+"41.webp",p+"42.webp",p+"43.webp",p+"44.webp",p+"45.webp",p+"46.webp",p+"47.webp",p+"48.webp",p+"49.webp",
    p+"50.webp",p+"51.webp",p+"52.webp",p+"53.webp",p+"54.webp",p+"55.webp",p+"56.webp",p+"57.webp",p+"58.webp",p+"59.webp",
    p+"60.webp",p+"61.webp",p+"62.webp",p+"63.webp",p+"64.webp",p+"65.webp",p+"66.webp",p+"67.webp",p+"68.webp",p+"69.webp",
    p+"70.webp",p+"71.webp",p+"72.webp",p+"73.webp",p+"74.webp",p+"75.webp",p+"76.webp",p+"77.webp",p+"78.webp",p+"79.webp"
  ];

  try {
    console.log("loadFilesDuringWelcomeScreen() will try to cache 6 groups of files...");
    // load group zero first
    await myCache0.addAll(groupZero);
    // then load group 1
    await myCache1.addAll(firstGroup);
    // then load group 2
    await myCache2.addAll(secondGroup);
    // then load group 3
    await myCache3.addAll(thirdGroup);
    // then load group 4
    await myCache4.addAll(fourthGroup);
    // then load group 5
    await myCache5.addAll(fifthGroup);

  } catch(err) {
    // error handling goes here
    console.error(err);
    errorHappenedIn_loadFilesDuringWelcomeScreen = true;
  } finally {
    if (!errorHappenedIn_loadFilesDuringWelcomeScreen) {
      console.log("...and all 6 groups have been cached successfully");
      localStorage.loadFilesDuringWelcomeScreenWasSuccessful = "cool";
      // Anything else to do?
    }
  }

}

// This must not fire before langCodeForTeachingFilePaths in js_for_app_initialization_in_parent has a value set and ready
async function loadTheVoiceOfTheTeacherInLesson111() { // See setLangCodeForFilePathsOfTeachingAssets function in js_for_app_initialization_in_parent

  const myCache = await caches.open('secondary-assets-for-1-1-1'); // Create a new slot

  const listOfFiles = [
    // fix this after tests // "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_1-2.webm",
    // fix this after tests // "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_3.webm",
    // fix this after tests // "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_4-5.webm",
    // fix this after tests // "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_6.webm",
    // fix this after tests // "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_7-8.webm"
  ];
  /*if (isApple) {
    listOfFiles.push(
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_1-2.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_3.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_4-5.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_6.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_7-8.mp3"
    );
  } else {
    listOfFiles.push(
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_1-2.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_3.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_4-5.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_6.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_1/bread_7-8.ogg"
    );
  }*/
  let errorHappened = false;
  try {
    console.log("Begin caching secondary-assets-for-1-1-1");
    await myCache.addAll(listOfFiles);
  } catch(err) {
    console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      console.log("secondary-assets-for-1-1-1 cached successfully");
      localStorage.lesson111VoiceFilesCachedSuccessfully = "cool"; // So that it won't try to recache » See js_for_app_initialization_in_parent and find setLangCodeForFilePathsOfTeachingAssets
    }
  }

} // END OF loadTheVoiceOfTheTeacherInLesson111
