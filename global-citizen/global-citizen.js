let hoverSoundFinancials;
let clickSoundFinancials;
let hoverSoundNavigation;
let clickSoundNavigation;
window.addEventListener('DOMContentLoaded', function(){
  hoverSoundFinancials = new Howl({  src: ['../user_interface/sounds/financial_thirdparty_hover.mp3']  });
  clickSoundFinancials = new Howl({  src: ['../user_interface/sounds/financial_thirdparty_click.mp3']  });
  hoverSoundNavigation = new Howl({  src: ['../user_interface/sounds/monthly_or_onetime_hover.mp3']  });
  clickSoundNavigation = new Howl({  src: ['../user_interface/sounds/monthly_or_onetime_click.mp3']  });
  // REMEMBER: Wait for “userInterfaceLanguage” variable to be ready. See js_for_every_single_html.js
  // ------- Fill the divs with text depending on the user interface language --------
  const filePathForTitle = "../user_interface/text/"+userInterfaceLanguage+"/global-citizen_title.txt";
  const filePathForIntroductionText = "../user_interface/text/"+userInterfaceLanguage+"/global-citizen_select.txt";
  const filePathForPatreonText = "../user_interface/text/"+userInterfaceLanguage+"/global-citizen_patreon.txt";
  const filePathForGoBackToInfoText = "../user_interface/text/"+userInterfaceLanguage+"/global-citizen_go_back_to_info.txt";
  /* TRICK: Although it is wrong to use the same ID for 3 elements (desktop,tablet,phone) this works because two of them are removed with removeChild() before this runs*/
  fetch(filePathForTitle,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.title = document.title +" "+ contentOfTheTxtFile; });
  fetch(filePathForIntroductionText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('introductionP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForPatreonText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('globalCitizenBelowPatreonOptionP').innerHTML = contentOfTheTxtFile; });
  fetch(filePathForGoBackToInfoText,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ document.getElementById('goBackToInfoP').innerHTML = contentOfTheTxtFile; });
}, { once: true });

window.addEventListener('load', function(){

  const globalCirculation = document.getElementById('globalCirculationID');
  if (deviceDetector.device == "tablet") {
      globalCirculation.src = onePixelTransparentGif;
      globalCirculation.src = "../user_interface/images/global_circulation_tablet.webp";
  } else if(deviceDetector.device == "phone") {
      globalCirculation.src = onePixelTransparentGif;
      globalCirculation.src = "../user_interface/images/global_circulation_phone.webp";
  } else {
      globalCirculation.src = onePixelTransparentGif;
      globalCirculation.src = "../user_interface/images/global_circulation_desktop.webp";
  }

  // Prevent overloading of hover sounds until first click to avoid Howler explosion!
  // REMEMBER: Other htmls also need this. Handle separately.
  // If user arrives from somewhere else (in Chrome at least) the sounds will be blocked until first click as the new window is not clicked yet. (No problem if this opens in self of previous)
  var fromWhere = document.referrer;
  var folderName = fromWhere.substring(fromWhere.length-12,fromWhere.length-1);
  if (folderName != "information") {
    hoverSoundFinancials.volume(0.25); hoverSoundNavigation.volume(0.25);
  }
  if (deviceDetector.isMobile){
    hoverSoundFinancials.volume(0); hoverSoundNavigation.volume(0);
  }
  window.addEventListener("mousedown",function () {
    setTimeout(function () {
      if (deviceDetector.device == "desktop"){
        hoverSoundFinancials.volume(1); // Back to normal in case it was lowered to prevent a Howler explosion!
        hoverSoundNavigation.volume(1); // Back to normal in case it was lowered to prevent a Howler explosion!
      } else {
        hoverSoundFinancials.volume(0); // Stay quiet on mobiles.
        hoverSoundNavigation.volume(0); // Stay quiet on mobiles.
      }
    },4000); // About four thousand ms
  }, {once:true}); // firstTimeUserGestureHasHappened
  // Handle button events
  const financialButton1 = document.getElementById('financialButton1ID');
  const navigationButton = document.getElementById('navigateBackToInfoID');
  setTimeout(function () {   financialButton1.addEventListener("mouseenter", function(){ hoverSoundFinancials.play(); });  },6000);
  setTimeout(function () {   navigationButton.addEventListener("mouseenter", function(){ hoverSoundNavigation.play(); });  },8000);

  financialButton1.addEventListener("mousedown", function(){
    clickSoundFinancials.play();
    financialButton1.classList.add("simulateKeyPress");
    setTimeout(function () {  financialButton1.classList.remove("simulateKeyPress");  },121);
  });
  navigationButton.addEventListener("mousedown", function(){
    clickSoundNavigation.play();
    desktopDisplay.classList.add("niceFadeOutSlow");
    tabletDisplay.classList.add("niceFadeOutSlow");
    phoneDisplay.classList.add("niceFadeOutSlow");
  });
  navigationButton.addEventListener("click", function(){
    setTimeout(function () {  document.location.href = '../information/';  },4500);
  });
  financialButton1.addEventListener("click", function(){
    setTimeout(function () {  window.open("https://patreon.com/terranationalbonocracy");  },200);
  });

}, { once: true });
// END OF FIRINGS WITH LOAD EVENT
