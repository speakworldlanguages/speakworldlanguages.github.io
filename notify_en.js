// MODULE OR NO MODULE ???
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js"; // No need: get, child, update, remove
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-messaging.js";

const brokenApiKey = "IzaSyDYBQrC1GFMYtsWtR8tOTanfE09I4alX50";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "A"+brokenApiKey,
  authDomain: "using-firebase-service.firebaseapp.com",
  databaseURL: "https://using-firebase-service-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "using-firebase-service",
  storageBucket: "using-firebase-service.appspot.com",
  messagingSenderId: "624023469269",
  appId: "1:624023469269:web:2116d2ffa20b3394f1765c",
  measurementId: "G-C23BKN622X"
};

// Initialize Firebase
// let app, analytics, messaging, db;
// window.addEventListener("load",startFirebase,{once:true});
// function startFirebase() {
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();
const db = getDatabase();
// }
var index = new Date();
var tokenToBeSaved = "0";
function insertData() {
  set(ref(db,"en/"+index.toUTCString()),{"Token":tokenToBeSaved}).then(()=>{console.log("token is saved");}).catch((error)=>{console.log("couldn't save token: "+error);});
}
const brokenVapidKey = "B7_p1Mfhfo4YbGkmKRDjemU0tPEGcZ3zzysITjcrPMzjR3x38cKyRmzG1T7ID3YdXC-QqSRgxLntBmAJ8tkn04";

const clickToSubscrise = document.getElementById('footerNotificationID');
clickToSubscrise.addEventListener("click",subscribeUser); // Do we need once:true???

function subscribeUser() {
  Notification.requestPermission().then(permission=>{
    if (permission == "granted") {
      getToken(messaging, {vapidKey:"B"+brokenVapidKey}).then((currentToken) => {
        tokenToBeSaved = currentToken;
        insertData();
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    }
  });
}
