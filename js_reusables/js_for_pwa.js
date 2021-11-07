/* ____ PWA ____ */
const installButton = document.getElementById('footerInstallID');
const allowNotificationButton = document.getElementById('footerNotificationID'); // Same thing is named clickToSubscribe in notify_**.js
const containerFooter = document.getElementsByTagName('FOOTER')[0];
if (deviceDetector.device == "tablet") {
  installButton.children[0].style.display = "none"; installButton.children[1].style.display = "block"; // Tablet img instead of desktop
} else if (deviceDetector.device == "phone") {
  installButton.children[0].style.display = "none"; installButton.children[2].style.display = "block"; // Phone img instead of desktop
}
if (deviceDetector.isMobile) {
  installButton.children[3].style.display = "none"; installButton.children[4].style.display = "block"; // Touch txt instead of click for install
  allowNotificationButton.children[1].style.display = "none"; allowNotificationButton.children[2].style.display = "block"; // Touch txt instead of click for notification
  containerFooter.classList.remove("footerDesktop"); containerFooter.classList.add("footerTabletAndPhone");
}

// Convert from Notification to Installation IF CAN INSTALL
// WATCH: display flex
let doYouWantToInstallprompt;
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault(); // Chrome 67 and earlier needs this
  doYouWantToInstallprompt = e;
  allowNotificationButton.style.display = "none";
  installButton.style.display = "flex";
  console.log("beforeinstallprompt fired");
});


const checkUrlToSeeLaunchingOrigin = window.location.href;
const searchResult = checkUrlToSeeLaunchingOrigin.search("installed"); // The search() method returns -1 if no match is found. See manifest_**.json

if (searchResult != -1) { // The app is running standalone
  // switchFromInstallToNotification(); // The app has been started from Desktop OR Homescreen // See manifest_**.json start_url
} else { // The app is in the browser; not in standalone mode
  if (localStorage.appInstallationAccepted) { // App is installed BUT
    // switchFromInstallToNotification(); // for some reason user is viewing the app on the browser even though he/she could have used the desktop or Homescreen version
  }
}

if (localStorage.isSubscribedToNotifications) {
  // allowNotificationButton.parentNode.removeChild(allowNotificationButton); // Could this ever cause an IT DOESN'T EXIST error?
}

function switchFromInstallToNotification() {
  // Never show the install button
  // installButton.parentNode.removeChild(installButton);
  // Show notification switch instead
  // allowNotificationButton.style.display = "block";
  // But if notifications API is not supported show nothing at all -> leave the user with the browser
  if ('Notification' in window) {  /* API supported*/  } else {
    // allowNotificationButton.parentNode.removeChild(allowNotificationButton);
  }
}

/* __ PWA __ install prompt __ */
let installationIsSupported = false;



window.addEventListener("load",checkInstallabilityF,{once:true}); // This happens too early! When installation
function checkInstallabilityF() {
  if (!installationIsSupported) {
    // switchFromInstallToNotification();
  }
}

function showInstall_PWA_prompt() {

    doYouWantToInstallprompt.prompt();
    doYouWantToInstallprompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        // On desktops there is a special case for the very first install
        // In this case the app doesn't actually restart but is just detached as an independent tab from the main window
        installButton.children[0].style.display = "none"; installButton.children[1].style.display = "none"; installButton.children[2].style.display = "none";
        installButton.children[3].style.display = "none"; installButton.children[4].style.display = "none";
        if (deviceDetector.device == "desktop") { // Desktop Chrome automatically switches to standalone mode.
          // switchFromInstallToNotification();
        } else { // Mobile Chrome doesn't.
          installButton.children[5].style.display = "block"; // Reads: You can close this and start the app from Home screen
          installButton.onclick = function(){ window.close(); }; // Overwrite default onclick -> showInstall_PWA_prompt()
        }

        localStorage.appInstallationAccepted = "yes"; // Use this to check if user is viewing the app in a browser tab DESPITE having installed it

        // On Windows it auto closes the tab and auto switches to the new window
        // On Android it does not auto close and does not switch

      } else {
        // If user [cancel]s (does not allow the installation)
        // switchFromInstallToNotification();
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
