"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson113() {

  const cacheSlot0 = await caches.open('primary-assets-for-1-1-3');
  const cacheSlot1 = await caches.open('secondary-assets-for-1-1-3');

  const firstList = [
    "/lessons_in_iframes/level_1/unit_1/lesson_3/0_glass.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b0.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_b2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_d.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water_state_e.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/give_me_water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/move_the_mouse.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/nice_arrow_down.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/nice_arrow_left.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_hand_give_me.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/speech_bubble_water.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/tray_without_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_1."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_2."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_on_porcelain."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_3/hover_on_the_glass."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_3/mousedown_touchstart."+parent.audioFileExtension
  ];
  /*if (isApple) {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_2.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_on_porcelain.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/hover_on_the_glass.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/mousedown_touchstart.mp3"
    );
  } else {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/drag_the_glass_loop_2.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/glass_on_porcelain.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/he_gets_the_water.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/hover_on_the_glass.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_3/mousedown_touchstart.ogg"
    );
  }*/
  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_normal."+parent.audioFileExtension;
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_slow."+parent.audioFileExtension;
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_normal."+parent.audioFileExtension;
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_slow."+parent.audioFileExtension;
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/thank_you."+parent.audioFileExtension;
  if (parent.mustUseFemaleConjugationForCommandVerbs) { // See js_for_app_initialization_in_parent
    item1 = item1.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item2 = item2.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item3 = item3.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item4 = item4.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item5 = item5.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  }
  const secondList = [
    item1,    item2,    item3,    item4,    item5,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give."+parent.audioFileExtension
  ];
  /*if (isApple) {
    secondList.push(
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_normal.mp3",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_slow.mp3",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_normal.mp3",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_slow.mp3",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give.mp3",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/thank_you.mp3"
    );
  } else {
    secondList.push(
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_normal.ogg",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_1_slow.ogg",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_normal.ogg",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give_me_water_2_slow.ogg",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/give.ogg",
      "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_3/thank_you.ogg"
    );
  }*/

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-3 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-3 were cached successfully");
      localStorage.loadFiles113WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson113

cacheAssetsOfLesson113();
