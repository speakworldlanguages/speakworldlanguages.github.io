"use strict";

if (localStorage.getItem("lesson132CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 132 already cached"); }
else { cacheLesson132CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson132FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 132 already cached"); }
else { cacheLesson132AssetsForTheTargetLanguage(); }


async function cacheLesson132CommonAssetsForAllLanguages() {
  const cacheForAllLanguages_1_3_2 = await caches.open('1-3-2-assets-for-all-languages-August2023');
  // ---
  let listOfFilesForAllLanguages_1_3_2 = [
    "/lessons_in_iframes/level_1/unit_3/lesson_2/background.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/bgrepeatx.avif",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/cloud1.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/cloud2.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/elder_pictogram_eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/fish_jumps_1.webm",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/fish_jumps_2.webm",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/fish_jumps_minified.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/fish_swimming_in_water_minified.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/fishswim_loop.webm",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/index.html",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/ripple_sprite_minified.png",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/river_mask.png",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/successfully_observed_the_fish.webm",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/there_is_a_fish.css",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/there_is_a_fish.js",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_between_b_c.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_a.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_b.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_c_finish.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_c_rtl.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_c.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_d_finish.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_d.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_e.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/two_pictograms_state_f.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/waterfall_loop.webm",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/waterfall_minified.webp",
    "/lessons_in_iframes/level_1/unit_3/lesson_2/younger_pictogram_eyes_blinking_naturally.webp",
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-2.txt", // See js_for_every_single_html to find userInterfaceLanguage
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_vocabulary_outro_p1_p2.txt",
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-2_vocabulary_p1_p2.txt"
  ];
  // -
  if (deviceDetector.isMobile) {
    listOfFilesForAllLanguages_1_3_2.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_2/touchscreen_button_arrow_idle.avif",
      "/lessons_in_iframes/level_1/unit_3/lesson_2/touchscreen_button_arrow_pressed.avif",
      "/lessons_in_iframes/level_1/unit_3/lesson_2/touchscreen_exact_amount_of_space.png"
    );
  } else { // desktop
    listOfFilesForAllLanguages_1_3_2.push(
      "/lessons_in_iframes/level_1/unit_3/lesson_2/keyboard_left_right_arrow.webp",
      "/lessons_in_iframes/level_1/unit_3/lesson_2/keyboard_up_arrow.webp",
      "/lessons_in_iframes/level_1/unit_3/lesson_2/keyboard_whole.webp"
    );
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching common files for 1-3-2 ..."); // eruda console displays either the parent window only or the iframe window only
    await cacheForAllLanguages_1_3_2.addAll(listOfFilesForAllLanguages_1_3_2); parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and common files for 1-3-2 are ready");
      localStorage.setItem("lesson132CommonFilesCachedSuccessfully", "astounding");
    }
  } // End of try-catch-finally

} // END OF cacheLesson132CommonAssetsForAllLanguages


async function cacheLesson132AssetsForTheTargetLanguage() {
  const cacheForTargetLanguage_1_3_2 = await caches.open('1-3-2-assets-for-'+parent.langCodeForTeachingFilePaths+'-August2023');
  // ---
  let itemA = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_listenbox.webm";
  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/huh.webm";
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/it_is_a_fish.webm";
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_a_fish_in_the_water.webm";
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_something_slow.webm";
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/there_is_something.webm";
  let itemZ = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_3/lesson_2/something_listenbox.webm";
  /* No commands given to user in this lesson
  if (parent.userIsFemaleSoUseFemaleConjugation) { // See js_for_the_parent_all_browsers_all_devices
    item1 = item1.split(".")[0] + "_tofemale.webm";
    item2 = item2.split(".")[0] + "_tofemale.webm";
    item3 = item3.split(".")[0] + "_tofemale.webm";
    item4 = item4.split(".")[0] + "_tofemale.webm";
    item5 = item5.split(".")[0] + "_tofemale.webm";
  }
  */
  let listOfFilesForTargetLanguage_1_3_2 = [
    itemA,
    item1,    item2,    item3,    item4,    item5,
    itemZ
  ];
  const u = "/user_interface/text/"+userInterfaceLanguage; // Works without "parent." notation » See js_for_every_single_html
  switch (parent.langCodeForTeachingFilePaths.substring(0,2)) { // Using substring, we trim "tr_istanbul" to "tr", "zh_putonghua" to "zh" etc
    case "ar":
      listOfFilesForTargetLanguage_1_3_2.push(u+"/1-3-2_arabic_ma_shayunma.txt");
      break;
    case "en":
      listOfFilesForTargetLanguage_1_3_2.push(u+"/1-3-2_eng_singular_plural.txt");
      break;
    case "ja":
      listOfFilesForTargetLanguage_1_3_2.push(u+"/1-3-2_hito_animals_plants_inanimates.txt");
      break;
    default: // Nothing
  }
  // ---
  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-3-2 "+parent.langCodeForTeachingFilePaths+" ...");
    await cacheForTargetLanguage_1_3_2.addAll(listOfFilesForTargetLanguage_1_3_2); parent.console.log("done");
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-3-2 "+parent.langCodeForTeachingFilePaths+" are ready");
      localStorage.setItem("lesson132FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully", "superb");
    }
  } // End of try-catch-finally

} // END OF cacheLesson132AssetsForTheTargetLanguage
