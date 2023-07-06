const firebaseConfig = {
  apiKey: "AIzaSyBY-2F1aI_-jgamYBSo8uvMJT_1FF__8ks",

  authDomain: "speedometer-database.firebaseapp.com",

  databaseURL: "https://speedometer-database-default-rtdb.firebaseio.com",

  projectId: "speedometer-database",

  storageBucket: "speedometer-database.appspot.com",

  messagingSenderId: "879680607334",

  appId: "1:879680607334:web:dfbfc457951a3fbf3449a7",

  measurementId: "G-ZBM97T9WYD",
};

// initialze firebase
firebase.initializeApp(firebaseConfig);

// reference database
var overspeedingReportDB = firebase.database().ref("overspeeding-report");

function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          new Notification("Notification Enabled", {
            body: "You will now receive notifications when exceeding the speed limit.",
            icon: "notification-icon.png",
          });
        }
      })
      .catch((error) => {
        console.error("Error requesting notification permission:", error);
      });
  }
}

navigator.geolocation.watchPosition(successCallback);

function successCallback(position) {
  const speedInMetersPerSecond = position.coords.speed;

  if (speedInMetersPerSecond !== null) {
    // Convert speed from m/s to km/h
    const speedInKilometersPerHour = (speedInMetersPerSecond * 3.6).toFixed(2);

    document.getElementById("value").textContent = speedInKilometersPerHour;

    // Check if speed exceeds 30 km/h
    if (speedInKilometersPerHour > 30) {
      document.querySelector(".toast").style.display = "flex";

      // Check if browser supports notifications and user has granted permission
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Speed Limit Exceeded", {
          body: "You are driving above the speed limit of 30 km/h.",
          icon: "../assets/warning.png",
        });
      }

      // Display popup alert
      alert(
        "Speed Limit Exceeded: You are driving above the speed limit of 30 km/h."
      );

      // Get the stored details from local storage
      const storedDetails = localStorage.getItem("details");

      // Check if the stored details exist and are not empty
      if (storedDetails) {
        const details = JSON.parse(storedDetails);

        // Add the current date and time to the details object
        details.datetime = new Date().toISOString();

        // Push the details to Firebase Realtime Database
        overspeedingReportDB.push(details, (error) => {
          if (error) {
            console.error("Error pushing data to Firebase:", error);
          } else {
            console.log("Data pushed to Firebase successfully.");
          }
        });
      }
    } else {
      document.querySelector(".toast").style.display = "none";
    }
  } else {
    document.getElementById("value").textContent = "N/A";
    document.querySelector(".toast").style.display = "none";
  }
}

function closeToast() {
  var toast = document.querySelector(".toast");
  toast.style.display = "none";
}
