"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson112() {

  const cacheSlot0 = await caches.open('primary-assets-for-1-1-2');
  const cacheSlot1 = await caches.open('secondary-assets-for-1-1-2');

  let firstList = [
    "/lessons_in_iframes/level_1/unit_1/lesson_2/1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c4.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c5.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c6.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c7.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c8.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c9.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/c10.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/water.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5."+parent.audioFileExtension
  ];
  if (parent.isApple || parent.detectedBrowser.name == "Firefox") {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_h264.mp4",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_h264.mp4"/*,
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.mp3"*/
    );
  } else {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v1_vp9.webm",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/v2_vp9.webm"/*,
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_2.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_3.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_4.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_2/what_water_sounds_like_5.ogg"*/
    );
  }

  const secondList = [
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_1-2."+parent.audioFileExtension,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_3."+parent.audioFileExtension,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_4-5."+parent.audioFileExtension,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_6."+parent.audioFileExtension,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_7-8."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_2/waterfall1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_2/waterfall2.webp"
  ];
  /*if (isApple) {
    secondList.push(
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_1-2.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_3.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_4-5.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_6.mp3",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_7-8.mp3"
    );
  } else {
    secondList.push(
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_1-2.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_3.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_4-5.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_6.ogg",
      "/audio_files_for_listening/"+langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_2/water_7-8.ogg"
    );
  }*/

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-2 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-2 were cached successfully");
      localStorage.loadFiles112WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson112

cacheAssetsOfLesson112();
// Turns out async functions cannot be exported anyway but still note that
// Android webview doesn't support the [default] keyword with export -> that is -> according to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
