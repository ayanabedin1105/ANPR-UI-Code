// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhVSU7QTMP-4MiFStqaWQMZR9RT1-Kgyk",
  authDomain: "anpr-data.firebaseapp.com",
  databaseURL:
    "https://anpr-data-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "anpr-data",
  storageBucket: "anpr-data.appspot.com",
  messagingSenderId: "322530228772",
  appId: "1:322530228772:web:74a312647e7f3d591876b1",
  measurementId: "G-K133MM61G6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const userEmail = user.email;
    // Display the user's email on the webpage
    document.getElementById("userEmail").textContent = `Hello,  ${userEmail}`;
  } else {
    // No user is signed in
    document.getElementById("userEmail").textContent = "No user signed in";
  }
});

$(document).ready(function () {
  // Event listener for clicking the run script button
  $("#runScriptBtn").click(function () {
    $.ajax({
      type: "GET",
      url: "/run_script",
      success: function (response) {
        alert(response);
      },
      error: function (xhr, status, error) {
        alert("Error occurred while executing script: " + error);
      },
    });
  });
});
