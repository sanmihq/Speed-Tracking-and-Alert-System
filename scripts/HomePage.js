// JavaScript code (HomePage.js)

document.addEventListener("DOMContentLoaded", function () {
  const arrowWrapper = document.getElementById("arrowWrapper");
  let previousPosition = null;

  function updateSpeedometer(speed) {
    const rotation = 90 - (speed / 120) * 180; // Adjust the formula based on your speedometer's range
    arrowWrapper.style.transform = `rotate(${rotation}deg)`;
  }

  function calculateSpeed(position) {
    if (!previousPosition) {
      previousPosition = position;
      return 0;
    }

    const distance = calculateDistance(
      previousPosition.coords.latitude,
      previousPosition.coords.longitude,
      position.coords.latitude,
      position.coords.longitude
    );

    const timeDiff = (position.timestamp - previousPosition.timestamp) / 1000; // Convert milliseconds to seconds
    const speed = distance / timeDiff;
    previousPosition = position;

    return speed;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function handlePosition(position) {
    const speed = calculateSpeed(position);
    updateSpeedometer(speed);
  }

  function handlePositionError(error) {
    console.error(error);
  }

  function startGPS() {
    if ("geolocation" in navigator) {
      const options = { enableHighAccuracy: true };
      navigator.geolocation.watchPosition(
        handlePosition,
        handlePositionError,
        options
      );
    } else {
      console.error("Geolocation is not supported");
    }
  }

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGPS);
});
