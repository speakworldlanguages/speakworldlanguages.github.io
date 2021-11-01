/* self does not refer to the DOM window here */
/* self is the service-worker itself */
self.addEventListener("install", event => {
  //console.log("SW install OK");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});
self.addEventListener("activate", event => { console.log("SW activate OK"); });
self.addEventListener("fetch", event => {
  //console.log("fetch olayı oldu, " + event.request.url);
  event.respondWith( caches.match(event.request)
    .then( cachedResponse => {
      return cachedResponse || fetch(event.request);
    } )
  );
});

const cacheName = "cache-november2021";
const resourcesToPrecache = [
  "/",
  "index.html",
  /*custom cursor if desktop??? array push???*/
  "css_reusables/css_for_every_single_html.css",
  "css_reusables/css_for_all_container_parent_htmls.css",
  "css_reusables/css_for_sliding_navigation_menu.css",
  "css_reusables/css_for_latin_font_rules.css",

  "third_party_js/annyang.min.js",
  "third_party_js/ua-parser.min.js",
  "third_party_js/howler.min.js",
  /* ONLY on desktops??? array push???
  "third_party_js/wavesurfer.microphone.min.js",
  "third_party_js/wavesurfer.microphone.min.js.map",
  */
  "third_party_js/wavesurfer.min.js",
  "third_party_js/wavesurfer.min.js.map",

  "js_reusables/js_for_preload_handling.js",
  "js_reusables/js_for_every_single_html.js",
  "js_reusables/js_for_handling_fullscreen_mode.js",
  "js_reusables/js_for_all_container_parent_htmls.js",
  "js_reusables/js_for_browser_device_issues_in_parents.js",
  /* No browser tab when opened as PWA???
  "js_reusables/js_for_icon_animation.js",
  */
  "js_reusables/js_for_the_sliding_navigation_menu.js",

  "user_interface/blank.html",
  /*Fonts depending on Latin or Kanji CKJ */

  /* No browser tab when opened as PWA???
  "user_interface/icon/animated_globe_icon_39.png",
  */
  "user_interface/16x16_anti_sleep_mode.mp4"
  /*ADD: user interface images an sounds*/
  /*Sounds ogg except iOS & Mac OS - mp3 only on iOS & Mac OS ??? */

  /*progress chart*/
];
