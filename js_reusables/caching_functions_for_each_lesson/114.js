"use strict";
// Turns out async functions cannot be exported, so, we will create a new script tag for each lesson and set its src to load a js file such as this one
async function cacheAssetsOfLesson114() {

  const cacheSlot0 = await caches.open('primary-assets-for-1-1-4');
  const cacheSlot1 = await caches.open('secondary-assets-for-1-1-4');

  const firstList = [
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite1.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite2.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite3.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_big_happy.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_blinking_naturally.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/eyes_closed_happy.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/far_bread.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/grab_the_loaf.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/index.html",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/keyboard_down_arrow.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/keyboard_whole.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/near_bread.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_pinch.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_swipe_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/phone_swipe_b.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_bread_and_arrow.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_bread_and_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/speech_bubble_eat.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_pinch.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_swipe_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/tablet_swipe_b.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_a.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_b.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread_state_c.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread.css",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/take_bread.js",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/teeth_lower.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/teeth_upper.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/the_ground_repeat_x.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/the_table.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/tray_without_hand.webp",
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread."+parent.audioFileExtension,
    "/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread."+parent.audioFileExtension
  ];
  /*if (isApple) {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread.mp3",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread.mp3"
    );
  } else {
    firstList.push(
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_0.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_1.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_2.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/bite_3.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_contacts_bread.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_has_eaten_bread.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_starts_dragging_bread.ogg",
      "/lessons_in_iframes/level_1/unit_1/lesson_4/user_takes_the_bread.ogg"
    );
  }*/

  let item1 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_normal."+parent.audioFileExtension;
  let item2 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_1_slow."+parent.audioFileExtension;
  let item3 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_normal."+parent.audioFileExtension;
  let item4 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take_bread_2_slow."+parent.audioFileExtension;
  let item5 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_normal."+parent.audioFileExtension;
  let item6 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_normal."+parent.audioFileExtension;
  let item7 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_slow."+parent.audioFileExtension;
  let item8 = "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/eat_bread_slow."+parent.audioFileExtension;
  if (parent.mustUseFemaleConjugationForCommandVerbs) { // See js_for_app_initialization_in_parent
    item1 = item1.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item2 = item2.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item3 = item3.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item4 = item4.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item5 = item5.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item6 = item6.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item7 = item7.split(".")[0] + "_tofemale."+parent.audioFileExtension;
    item8 = item8.split(".")[0] + "_tofemale."+parent.audioFileExtension;
  }
  const secondList = [
    item1,    item2,    item3,    item4,    item5,    item6,    item7,    item8,
    "/audio_files_for_listening/"+parent.langCodeForTeachingFilePaths+"/level_1/unit_1/lesson_4/take."+parent.audioFileExtension
  ];

  let errorHappened = false;
  try {
    parent.console.log("Caching files for 1-1-4 ...");
    await cacheSlot0.addAll(firstList);
    await cacheSlot1.addAll(secondList);
  } catch(err) {
    parent.console.error(err);
    errorHappened = true;
  } finally {
    if (!errorHappened) {
      parent.console.log("... and files for 1-1-4 were cached successfully");
      localStorage.loadFiles114WasSuccessful = "cool";
    }
  }

} // END OF cacheAssetsOfLesson114

cacheAssetsOfLesson114();
