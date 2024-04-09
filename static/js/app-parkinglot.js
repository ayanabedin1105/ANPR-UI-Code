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

// Function to retrieve detected number plates from Firebase
function getDetectedPlatesFromFirebase() {
  return new Promise((resolve, reject) => {
    onValue(
      dbRef,
      function (snapshot) {
        var detectedPlates = [];
        snapshot.forEach(function (childSnapshot) {
          var plateData = childSnapshot.val().detected_text;
          detectedPlates.push(plateData);
        });
        resolve(detectedPlates);
      },
      function (error) {
        reject(error);
      }
    );
  });
}

// Function to fill parking slots with detected number plates
async function fillParkingSlots() {
  try {
    var detectedPlates = await getDetectedPlatesFromFirebase();
    var parkingSlots = document.querySelectorAll(".parking-slot ");
    if (detectedPlates.length > 0) {
      for (
        var i = 0;
        i < detectedPlates.length && i < parkingSlots.length;
        i++
      ) {
        var plate = detectedPlates[i];
        parkingSlots[i].textContent = plate;
        parkingSlots[i].classList.add("occupied");
        parkingSlots[i].classList.remove("vacant");
      }
    } else {
      // If no plates retrieved, show all parking slots in red color
      parkingSlots.forEach(function (slot) {
        slot.textContent = "No Plate";
        slot.classList.remove("occupied");
        slot.classList.add("vacant");
      });
    }
  } catch (error) {
    console.error("Error retrieving detected plates:", error);
  }
}

// Call the function to fill parking slots
fillParkingSlots();

// JavaScript function to go back to the previous page
const goBackBtn = document.querySelector("#back-btn");

// Add event listener for the button click
goBackBtn.addEventListener("click", () => {
  // Redirect to the desired page
  window.location.href = "/index";
});
