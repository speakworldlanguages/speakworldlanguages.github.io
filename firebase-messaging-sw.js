importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAOwWE-tkgCG6ZShYOVSI5QN6TDONAIwHo",
  authDomain: "swl-firebase.firebaseapp.com",
  projectId: "swl-firebase",
  storageBucket: "swl-firebase.appspot.com",
  messagingSenderId: "419361717894",
  appId: "1:419361717894:web:b25d27d6646a7b70cc9b07",
  measurementId: "G-DRM4QVGLCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  return self.registration.showNotification();
});
