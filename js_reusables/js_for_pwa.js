/* ____ PWA ____ */
const footerAsInstallButton = document.getElementById('footerInstallID');
const footerAsNotificationButton = document.getElementById('footerNotificationID');
if (deviceDetector.device == "tablet") {
  footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[1].style.display = "block"; // Tablet instead of desktop
} else if (deviceDetector.device == "phone") {
  footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[2].style.display = "block"; // Phone instead of desktop
}
if (deviceDetector.isMobile) {
  footerAsInstallButton.children[3].style.display = "none"; footerAsInstallButton.children[4].style.display = "block"; // Touch instead of click for install
  footerAsNotificationButton.children[1].style.display = "none"; footerAsNotificationButton.children[2].style.display = "block"; // Touch instead of click for notification
  footerAsInstallButton.classList.remove("footerDesktop"); footerAsInstallButton.classList.add("footerTabletAndPhone");
  footerAsNotificationButton.classList.remove("footerDesktop"); footerAsNotificationButton.classList.add("footerTabletAndPhone");
}

const checkUrlToSeeLaunchingOrigin = window.location.href;
const searchResult = checkUrlToSeeLaunchingOrigin.search("installed"); // The search() method returns -1 if no match is found. See manifest_**.json

if (searchResult != -1) { // The app is running standalone
  switchFromInstallToNotification(); // The app has been started from Desktop OR Homescreen // See manifest_**.json start_url
} else { // The app is in the browser; not in standalone mode
  if (localStorage.appInstallationAccepted) { // App is installed BUT
    switchFromInstallToNotification(); // for some reason user is viewing the app on the browser even though he/she could have used the desktop or Homescreen version
  }
}

if (localStorage.isSubscribedToNotifications) {
  footerAsNotificationButton.parentNode.removeChild(footerAsNotificationButton); // Could this ever cause an IT DOESN'T EXIST error?
}

function switchFromInstallToNotification() {
  // Never show the install button
  footerAsInstallButton.parentNode.removeChild(footerAsInstallButton);
  // Show notification switch instead
  footerAsNotificationButton.style.display = "block";
  // But if notifications API is not supported show nothing at all -> leave the user with the browser
  if ('Notification' in window) {  /* API supported*/  } else {
    footerAsNotificationButton.parentNode.removeChild(footerAsNotificationButton);
  }
}

/* __ PWA __ install prompt __ */
let installationIsSupported = false;
var doYouWantToInstallprompt;
window.addEventListener("beforeinstallprompt",(e)=>{ // This doesn't fire on phone???
  installationIsSupported = true; // beforeinstallprompt doesn't always fire or maybe fires only once in a lifetime ???
  e.preventDefault(); // Chrome 67 and earlier needs this
  doYouWantToInstallprompt = e;
  // Guess this won't fire anymore once the app is installed
});

window.addEventListener("load",checkInstallabilityF,{once:true}); // Hopefully this will fire AFTER beforeinstallprompt
function checkInstallabilityF() {
  if (!installationIsSupported) {
    switchFromInstallToNotification();
  }
}

function showInstall_PWA_prompt() {

    doYouWantToInstallprompt.prompt();
    doYouWantToInstallprompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        // On desktops there is a special case for the very first install
        // In this case the app doesn't actually restart but is just detached as an independent tab from the main window
        footerAsInstallButton.children[0].style.display = "none"; footerAsInstallButton.children[1].style.display = "none"; footerAsInstallButton.children[2].style.display = "none";
        footerAsInstallButton.children[3].style.display = "none"; footerAsInstallButton.children[4].style.display = "none";
        if (deviceDetector.device == "desktop") { // Desktop Chrome automatically switches to standalone mode.
          switchFromInstallToNotification();
        } else { // Mobile Chrome doesn't.
          footerAsInstallButton.children[5].style.display = "block"; // Reads: You can close this and start the app from Home screen
          footerAsInstallButton.onclick = function(){ window.close(); }; // Overwrite default onclick -> showInstall_PWA_prompt()
        }

        localStorage.appInstallationAccepted = "yes"; // Use this to check if user is viewing the app in a browser tab DESPITE having installed it

        // On Windows it auto closes the tab and auto switches to the new window
        // On Android it does not auto close and does not switch

      } else {
        // If user [cancel]s (does not allow the installation)
        switchFromInstallToNotification();
      }
      doYouWantToInstallprompt = null;
    });

}

/* appinstalled FIRES ONLY ONCE DURING THE LIFETIME OF THE APP */ /* Side note: Clearing local storage from the browser will clear the app's data too */
/* MDN says, appinstalled is deprecated and according to support table it fires only on Chrome and Edge */
/*
window.addEventListener("appinstalled",(evt)=>{   });
*/

// See manifest_**.json and use window.location.href to search() for installed
