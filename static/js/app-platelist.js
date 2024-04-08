import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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
const db = getDatabase();

var dbRef = ref(db, "image_text_output");

// Listen for changes in the database
onValue(dbRef, (snapshot) => {
  var plateList = document.getElementById("plateList");
  plateList.innerHTML = ""; // Clear previous list

  // Iterate through each plate entry in the database
  snapshot.forEach(function (childSnapshot) {
    var plateData = childSnapshot.val();
    var detectedText = plateData.detected_text;
    var imageTakenTime = plateData.image_taken_time;

    // Create list item element
    var listItem = document.createElement("li");

    // Create paragraph element for detected text
    var textParagraph = document.createElement("p");
    textParagraph.textContent = "Number Plate: " + detectedText;

    // Create paragraph element for image taken time
    var timeParagraph = document.createElement("p");
    timeParagraph.textContent = "Time Captured: " + imageTakenTime;

    // Append image and text to list item
    listItem.appendChild(textParagraph);
    listItem.appendChild(timeParagraph);

    // Append list item to list
    plateList.appendChild(listItem);
  });
});

// JavaScript function to go back to the previous page
const goBackBtn = document.querySelector("#back-btn");

// Add event listener for the button click
goBackBtn.addEventListener("click", () => {
  // Redirect to the desired page
  window.location.href = "/index";
});
