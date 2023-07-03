// function navigateTo(url) {
//   window.location.href = url;
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjIW7Upo-Fg8FpuIPv6k-HG3_LvxPweQw",

  authDomain: "test-project-53a38.firebaseapp.com",

  projectId: "test-project-53a38",

  storageBucket: "test-project-53a38.appspot.com",

  messagingSenderId: "945205431071",

  appId: "1:945205431071:web:dc5e009673b6627f667e2a",

  measurementId: "G-N5FRSM4XJ9",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const fname = document.getElementById("fname").value;
  const number = document.getElementById("number").value;
  const plate = document.getElementById("plate").value;
  const model = document.getElementById("model").value;
  const password = document.getElementById("password").value;

  // Sign up with Firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(number, password)
    .then((userCredential) => {
      // Handle successful sign-up
      const user = userCredential.user;
      // Additional logic to store the user data in your database or perform other tasks
      // ...

      // Redirect the user to the home page after successful sign-up
      window.location.href = "HomePage.html";
    })
    .catch((error) => {
      // Handle sign-up error
      const errorCode = error.code;
      const errorMessage = error.message;
      // Display error message to the user
      // ...
    });
});
