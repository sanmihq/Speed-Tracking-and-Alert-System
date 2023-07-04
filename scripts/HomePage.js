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
      document.querySelector(".warning").style.display = "block";

      // Check if browser supports notifications and user has granted permission
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Speed Limit Exceeded", {
          body: "You are driving above the speed limit of 30 km/h.",
          icon: "notification-icon.png",
        });
      }
    } else {
      document.querySelector(".warning").style.display = "none";
    }
  } else {
    document.getElementById("value").textContent = "N/A";
    document.querySelector(".warning").style.display = "none";
  }
}
