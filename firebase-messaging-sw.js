importScripts("https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js");
// importScripts("https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js"); // Don't need the database
importScripts("https://www.gstatic.com/firebasejs/9.3.0/firebase-messaging.js");

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging();