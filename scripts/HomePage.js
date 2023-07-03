// Get the current location of the driver.
let previousLocation;

const calculateSpeed = (location) => {
  if (previousLocation) {
    const distance = Math.sqrt(
      (previousLocation.coords.latitude - location.coords.latitude) ** 2 +
      (previousLocation.coords.longitude - location.coords.longitude) ** 2
    );

    const time = location.timestamp - previousLocation.timestamp;
    const speed = distance / time;

    // Update the element with the new speed.
    document.getElementById("speed").innerHTML = speed.toFixed(2);
  }

  // Update the previous location with the current location.
  previousLocation = location;
};

// Set up a watch to continuously monitor the position.
const watchId = navigator.geolocation.watchPosition(calculateSpeed);

// Stop the watch after a certain duration (e.g., 10 minutes).
setTimeout(() => {
  navigator.geolocation.clearWatch(watchId);
}, 10 * 60 * 1000); // Stop after 10 minutes (adjust as needed)
