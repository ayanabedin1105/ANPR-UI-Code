// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhVSU7QTMP-4MiFStqaWQMZR9RT1-Kgyk",
  authDomain: "anpr-data.firebaseapp.com",
  databaseURL: "https://anpr-data-default-rtdb.europe-west1.firebasedatabase.app",
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

document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    // Simple validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      document.getElementById("error-message").innerText =
        "Please fill in all fields";
      return;
    }

    if (password !== confirmPassword) {
      document.getElementById("error-message").innerText =
        "Passwords do not match";
      return;
    }

    // Here you can perform further validation and submit the form data to the server
    // For simplicity, this example does not include form submission to the server
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        // Clear form fields
        document.getElementById("signup-form").reset();
        /// Display success message
        displayMessage("Account created successfully! Redirecting......", "success");

         // Redirect to dashboard or home page after a delay
         setTimeout(function () {
            window.location.href = "/login";
          }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        displayMessage(errorMessage);
      });
  });

function displayMessage(message, messageType = "error", duration = 3000) {
  var formMessage = document.getElementById("form-message");
  formMessage.innerText = message;
  formMessage.className = "form-message " + messageType;
  setTimeout(function () {
    formMessage.innerText = "";
    formMessage.className = "form-message";
  }, duration);
}
