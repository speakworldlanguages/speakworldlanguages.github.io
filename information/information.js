let hoverSound;
let clickSound;
window.addEventListener('DOMContentLoaded', function(){
  hoverSound = new Howl({  src: ['../user_interface/sounds/monthly_or_onetime_hover.ogg']  });
  clickSound = new Howl({  src: ['../user_interface/sounds/monthly_or_onetime_click.ogg']  });
  // ------- Fill the divs with text depending on the user interface language --------
  const filePathForLicense = "../LICENSE";
  fetch(filePathForLicense,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ const keepTheNiceLineBreaks = contentOfTheTxtFile.replace(/\n\s*/g, "<br>"); document.getElementById('putTheLicenseIntoThisP').innerHTML = keepTheNiceLineBreaks; });

  const filePathForTitle = "../user_interface/text/"+userInterfaceLanguage+"/info_index_html_title.txt";
  const filePathForNameOfAuthor = "../user_interface/text/"+userInterfaceLanguage+"/info_name_of_author.txt";
  const filePathForNameOfLicense = "../user_interface/text/"+userInterfaceLanguage+"/info_name_of_license.txt";
  const filePathForViewLicenseButton = "../user_interface/text/"+userInterfaceLanguage+"/info_view_license_button.txt";
  const filePathForGoBackButton = "../user_interface/text/"+userInterfaceLanguage+"/info_go_back_button.txt";
  const filePathForMonthlyFinance = "../user_interface/text/"+userInterfaceLanguage+"/info_monthly_option.txt";
  const filePathForOneTimeFinance = "../user_interface/text/"+userInterfaceLanguage+"/info_onetime_option.txt";
  const filePathForViewSourceCode = "../user_interface/text/"+userInterfaceLanguage+"/info_about_resources.txt";
  /* TRICK: Although it is wrong to use the same ID for 3 elements (desktop,tablet,phone) this works because two of them are removed with removeChild() before this runs*/
  fetch(filePathForTitle,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.title = document.title +" "+ contentOfTheTxtFile; }); // Keep the default and add the text next to it.
  fetch(filePathForNameOfAuthor,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('authorsNameP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForNameOfLicense,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutLicenseP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForViewLicenseButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToViewP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForGoBackButton,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('clickToGoBackP').innerHTML = contentOfTheTxtFile;  });
  fetch(filePathForMonthlyFinance,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('idOfMonthlyOptionP').innerHTML = contentOfTheTxtFile; });
  // CAUTION: ERROR happens if idOfOneTimeOptionP is removed before fetch can try to put text inside it.
  fetch(filePathForOneTimeFinance,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('idOfOneTimeOptionP').innerHTML = contentOfTheTxtFile; });
  /*NOTE: Error has been fixed which happened due to inexistence of aboutResourcesP on mobiles; see if(deviceDetector.device == "desktop").*/
  if (deviceDetector.device == "desktop") {
    fetch(filePathForViewSourceCode,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('aboutResourcesP').innerHTML = contentOfTheTxtFile; });
  }
}, { once: true });
// REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
window.addEventListener('load', function(){

  const monthlyOpt = document.getElementById('idOfMonthlySupportOptionDiv'); // The 2 other duplicates will have been removed by the time this gets executed.
  const oneTimeOpt = document.getElementById('idOfOneTimeDonationOptionDiv'); // The 2 other duplicates will have been removed by the time this gets executed.

  /* Remove the one-time button if it is not usable yet due to the actual availability of regional financial methods, localized transaction possibilities */
  // GOOD PRACTICE: It would be good if we could “SILENTLY” get the location of the user via IP detection (without device GPS because that pops another “allow-block” prompt).
  switch (userInterfaceLanguage) {
    /* HIDE-UNHIDE THE LOCAL TRANSACTION OPTION UNTIL IT BECOMES AVAILABLE FOR OUR ORGANIZATION */
    case "tr":
      monthlyOpt.style.display = "none";
      oneTimeOpt.style.display = "none";
      break;
    case "ja":
      monthlyOpt.style.display = "none";
      oneTimeOpt.style.display = "none";
      break;
    default:// "en" or none of the above
      monthlyOpt.style.display = "none";
      oneTimeOpt.style.display = "none";
  }

  if (needLatinFonts) {
    if (deviceDetector.isMobile) { /* Use device detector in order not to cause a NOT FOUND error, the reason is */
      document.getElementById('aboutLicenseP').classList.add("kanit");
    } else {
      document.getElementById('aboutLicenseP').classList.add("kanit");
      document.getElementById('aboutResourcesP').classList.add("alegreya"); /* because, view source link does not exist on mobiles, so this is desktop-only.*/
    }
  }
  // Prevent hover sounds until first click to avoid Howler explosion!
  // REMEMBER: Other htmls also need this. Handle separately.
  if (deviceDetector.device == "desktop") {
    hoverSound.volume(0.25); // Lower to prevent a Howler explosion!
  } else {
    hoverSound.volume(0);  // Mute on mobiles.
  }
  window.addEventListener("mousedown",function () {
    setTimeout(function () {
      if (deviceDetector.device == "desktop") {
        hoverSound.volume(1); // Back to normal in case it was lowered to prevent a Howler explosion!
      } else {
        hoverSound.volume(0);  // Stay quiet on mobiles.
      }
    },400); // About four hundred ms
  }, {once:true}); // firstTimeUserGestureHasHappened
  // addEventListeners for button sounds
  monthlyOpt.addEventListener("mouseenter", function(){ hoverSound.play(); });
  oneTimeOpt.addEventListener("mouseenter", function(){ hoverSound.play(); });
  monthlyOpt.addEventListener("mousedown", function(){
    clickSound.play();
    document.getElementById('moveAllOfThisToLeftID').classList.add("niceFadeOutInfoSlow"); // See information.css
  });
  oneTimeOpt.addEventListener("mousedown", function(){
    clickSound.play();
    document.getElementById('moveAllOfThisToLeftID').classList.add("niceFadeOutInfoSlow"); // See information.css
  });
  // addEventListeners to buttons to open relevant pages in _self
  monthlyOpt.addEventListener("click", function(){
    setTimeout(function () {  document.location.href = '../global-citizen/';  },4500);
  });
  oneTimeOpt.addEventListener("click", function(){
    setTimeout(function () {  document.location.href = '../grateful-user/';  },4500);
  });

  /* __ Detect device and make the buttons blink on mobiles. __ */
  let clearThisIntervalIfNeedBe;
  if (deviceDetector.isMobile) {
    clearThisIntervalIfNeedBe = setInterval(function () {
              monthlyOpt.classList.add("blinkByAddingRemovingThis");
              setTimeout(function () {
                monthlyOpt.classList.remove("blinkByAddingRemovingThis");
              },500);
              setTimeout(function () {
                oneTimeOpt.classList.add("blinkByAddingRemovingThis");
                setTimeout(function () {     oneTimeOpt.classList.remove("blinkByAddingRemovingThis");   },500);
              },1500);
    },5500);
  }
  /*function stopBlinking() { // Actually this is unnecessary if all links open in a SELF tab. But will leave it here just in case for the future.
    clearInterval(clearThisIntervalIfNeedBe);
    monthlyOpt.classList.remove("blinkByAddingRemovingThis");
    oneTimeOpt.classList.remove("blinkByAddingRemovingThis");
  }*/

}, { once: true });
// END OF FIRINGS WITH LOAD EVENT

/* ___ MAKE ARROW BUTTONS FUNCTION - SWITCHING SCREENS ___ */
function bigSlideTowardsLeft() {
  document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItSlideTowardsLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItSlideFromRight");
  document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItReturnFromLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItReturnToRight");
}
function returnWithBigSlideTowardsRight() {
  document.getElementById('moveAllOfThisToLeftID').classList.add("addThisToMakeItReturnFromLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.add("addThisToMakeItReturnToRight");
  document.getElementById('moveAllOfThisToLeftID').classList.remove("addThisToMakeItSlideTowardsLeft");
  document.getElementById('bringAllOfThisFromRightID').classList.remove("addThisToMakeItSlideFromRight");
}
