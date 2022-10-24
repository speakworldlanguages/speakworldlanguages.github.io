"use strict";
/*______*/
// Check if the domain and browser language is different
// If so, then offer redirecting to the clone whose UI language matches user's browser language
// ALSO: Domain locking against forks etc.
/* --- SEE js_for_every_single_html.js TO FIND browserLanguage AND userInterfaceLanguage --- */
const firstSevenCharactersOfTheAddress = window.location.hostname.substring(0,7);
switch (window.location.hostname) {
  case "speakworldlanguages.github.io": // ALLOW AND... // Even though it will hopefully redirect to speakworldlanguages.app by GitHub pages
  case "speakworldlanguages.app": // ALLOW AND...
    if (browserLanguage == "en") { /*Nothing to handle; UI language and browser language is the same*/ }
    else {   whatIfUserInterfaceLangAndBrowserLangAreDifferent();   }
    break;
  case "dilogrenherkeslekonus.github.io": // ALLOW AND...
  case "dilogrenherkeslekonus.com":
    if (browserLanguage == "tr") { /*Nothing to handle; UI language and browser language is the same*/ }
    else {   whatIfUserInterfaceLangAndBrowserLangAreDifferent();   }
    break;
  case "hanaserutoiidesuyone.github.io":
  case "hanaserutoiidesuy.one": // ALLOW AND...
    if (browserLanguage == "ja") { /*Nothing to handle; UI language and browser language is the same*/ }
    else {   whatIfUserInterfaceLangAndBrowserLangAreDifferent();   }
    break;
  case "tingdongshijiederenmen.github.io":
  case "tingdongshijiederenmen.com": // ALLOW AND...
    if (browserLanguage == "zh") { /*Nothing to handle; UI language and browser language is the same*/ }
    else {   whatIfUserInterfaceLangAndBrowserLangAreDifferent();   }
    break;
  case "localhost": // ALLOW
    break;

  default:
    if (firstSevenCharactersOfTheAddress=="192.168") { // ALLOW
      // Do nothing
    } else {
      document.body.style.display = "none"; document.body.style.opacity = "0";
      setTimeout(function () {
        alert(location.hostname + " is UNAUTHORIZED!\n1 - DO NOT modify the source code!\n2 - DELETE this fork from your repositories!");
      }, 2000);
    }
}

function whatIfUserInterfaceLangAndBrowserLangAreDifferent() {
  // Check if there is an available domain where UI language is user's browser language
  switch (browserLanguage) {
    case "en":
      // Ask if user wants to go to speakworldlanguages.app or stay
      break;
    case "tr":
      // Ask if user wants to go to dilogrenherkeslekonus.com or stay // Soru: Türkçe + UI language » Seçenekler: Örneğin UI "en" imişse 1-[No, don't change](UI) 2-[Evet, Türkçe olsun](browser)
      break;
    case "ja":
      // Ask if user wants to go to hanaserutoiidesuy.one or stay
      break;
    case "zh": // TAIWAN is zh-TW, no?
      // Ask if user wants to go to tingdongshijiederenmen.com or stay
      break;

    default:
      // A clone in user's browser language is not available yet; so do nothing and stay
  }
}

/*______*/
// Do not allow embedding of this app (no re-serving through an alien iframe)
if (self === top) {
    // Display normally
} else {
    /*top.location = self.location; » This kind of redirection doesn’t work because of browser policies. Gets blocked as a pop-up window. Use a confirm box before redirecting. */
    document.body.style.opacity = "0.1";
    setTimeout(function () {
      if (confirm("(×_×) → (⌒▽⌒) ?")) {
        top.location = self.location;
      }
    },7000);
}