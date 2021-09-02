// IMPORTANT! Everything below will run in PARALLEL both on PARENT and iFRAME.
var onePixelTransparentGif = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // Use wherever needed. Like in resetting webp animation playback.
/*___________________________________*/
// Must give the user the option to change the user interface language and allow him/her to choose any available language other than the browser's language if necessary.
// Until that time, UI language will automatically take the browser's language.

var browserLanguage = navigator.language.substring(0,2).toLowerCase();

// These variables will exist both in parent html and in frame html separately at the same time.
var userInterfaceLanguage;
var userReadsLeftToRightOrRightToLeft; /*Use this to flip the arrow signs etc with transform rotate 180deg or scaleX -1 if UI is in Arabic or another rtl language*/
var needLatinFonts = false;
var needHitoicJapaneseFonts = false;

// BEST PRACTICE: Check if browser language and IP-geolocation match. Ask the user which language he/she wants for the GUI if the location and language is different.
switch (browserLanguage) {
  case "ja":
    userInterfaceLanguage = "ja";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needHitoicJapaneseFonts = true;
    break;
  case "tr": /*case "uz": case "ug": case "tk": case "ky": case "kk": case "az":*/
    userInterfaceLanguage = "tr";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needLatinFonts = true;
    break;
  default:
    userInterfaceLanguage = "en";
    userReadsLeftToRightOrRightToLeft = "ltr";
    needLatinFonts = true;
}
/*___________________________________*/
// Get all the cool fonts for BOTH PARENT HTML AND IFRAME HTML
// Use individual if()s instead of else-if()s. This way multiple fonts can be made available if it becomes necessary to do so.
// if window.navigator.path ...substring == "lessons_in_iframes"
// else
if (needLatinFonts) {
  /*GET FONTS*/
  let titilliumFont;
  titilliumFont = new FontFace('Titillium Web Light', 'url(/user_interface/fonts/TitilliumWeb-Light.ttf)');
  titilliumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.log("Unable to get the font!");  });

  let oxaniumFont;
  oxaniumFont = new FontFace('Oxanium SemiBold', 'url(/user_interface/fonts/Oxanium-SemiBold.ttf)');
  oxaniumFont.load().then(function(loaded_face) {
      document.fonts.add(loaded_face);
  }).catch(function(error) {    console.log("Unable to get the font!");  });
  /*SET FONTS*/
  document.body.style.fontFamily = '"Titillium Web Light", sans-serif';

  let allButtons = document.getElementsByTagName("BUTTON");
  let i;
  for (i = 0; i < allButtons.length; i++) {  allButtons[i].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
  /* Use all ASIDE elements as a second type of button*/
  let allAsides = document.getElementsByTagName("ASIDE"); /*See css_for_all_iframed_lesson_htmls.css*/
  let j;
  for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Oxanium SemiBold", sans-serif';  }
}

if (needHitoicJapaneseFonts) {
    /*GET FONTS*/
    let kosugiFont;
    kosugiFont = new FontFace('Kosugi Maru', 'url(/user_interface/fonts/KosugiMaru-Regular.ttf)'); // NOTE: File size is about 2.5 MB
    kosugiFont.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {      console.log("Unable to get the font!");    });
    /*SET FONTS*/
    document.body.style.fontFamily = '"Kosugi Maru", sans-serif';
    // In this case (JA) the buttons use the same font with the body
    let allButtons = document.getElementsByTagName("BUTTON"); // IS THIS NECESSARY? Or will it auto inherit from body on every browser?
    let i;
    for (i = 0; i < allButtons.length; i++) {
    allButtons[i].style.fontFamily = '"Kosugi Maru", sans-serif'; }
    /* Use all ASIDE elements as a second type of button*/ // Auto inherits from body
    //let allAsides = document.getElementsByTagName("ASIDE");
    //let j;
    //for (j = 0; j < allAsides.length; j++) {  allAsides[j].style.fontFamily = '"Kosugi Maru", sans-serif';  }
}
