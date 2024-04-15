"use strict";

if (localStorage.getItem("authorsNotice3FilesCachedSuccessfully")) {  }
else { cacheAuthorsNotice3Assets(); }

/* waiting for the next lesson to be ready
if (localStorage.getItem("lesson121CommonFilesCachedSuccessfully")) { parent.console.log("Common files for 121 already cached"); }
else { cacheLesson121CommonAssetsForAllLanguages(); }

if (localStorage.getItem("lesson121FilesFor-"+parent.langCodeForTeachingFilePaths+"-CachedSuccessfully")) { parent.console.log("Files for "+parent.langCodeForTeachingFilePaths+" 121 already cached"); }
else { cacheLesson121AssetsForTheTargetLanguage(); }
*/




let triesForNotice3Assets = 0;
async function cacheAuthorsNotice3Assets() {
  const cacheSlot = await caches.open('assets-for-bakernotice3-October2023');
  let list = [
    "/lessons_in_iframes/level_1/unit_3/notice_3/earthman_topraksoy_tsuchimoto.webp",
    "/lessons_in_iframes/level_1/unit_3/notice_3/index.html",
    "/lessons_in_iframes/level_1/unit_3/notice_3/notice.css",
    "/lessons_in_iframes/level_1/unit_3/notice_3/notice.js",
    "/user_interface/text/"+userInterfaceLanguage+"/1-3-notice_author_says.txt"
    // FOLLOWING FILES ARE USED both in notice1 and notice2 and notice3 but they are cached by cacheCommonFilesForAllLessons in js_for_cache_handling/0_parent_initial_load_and_111
    // "/user_interface/sounds/looping_bgm_stereo_therapy."+soundFileFormat
    // "/user_interface/sounds/section_as_button_hover."+soundFileFormat
    // "/user_interface/sounds/section_as_button_click."+soundFileFormat
  ];
  if (deviceDetector.device == "tablet") {
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_tablet.webp");
  } else if (deviceDetector.device == "phone") {
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_phone.webp");
  } else { // desktop
    list.push("/lessons_in_iframes/level_1/unit_3/notice_3/global_circulation_desktop.webp");
  }
  // ---
  let errorHappened = false;
  try {
    await cacheSlot.addAll(list);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      localStorage.setItem("authorsNotice3FilesCachedSuccessfully", "marvelous");
    } else {
      triesForNotice3Assets++;
      // Try again if the number of maximum retries is not reached
      // «maximumRetries» and «delayTimeBeforeTryingAgain» exists in 0_parent_initial_load_and_111.js
      if (triesForNotice3Assets<=parent.maximumRetries) {   setTimeout(function () {  cacheAuthorsNotice3Assets();  }, parent.delayTimeBeforeTryingAgain);   }
      else {   parent.console.warn("Gave up on trying to cache: cacheAuthorsNotice3Assets");   }
    }
  } // End of try-catch-finally
} // END OF cacheAuthorsNotice3Assets
