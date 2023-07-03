var reqcount = 0;

navigator.geolocation.watchPosition(successCallback);

function successCallback(position) {
  const { accuracy, latitude, longitude, altitude, heading, speed } =
    position.coords;

  document.getElementById("details").innerHTML =
    "Accuracy: " + accuracy + "<br>";
  document.getElementById("details").innerHTML +=
    "Latitude: " + latitude + " | Longitude: " + longitude + "<br>";
  document.getElementById("details").innerHTML +=
    "Altitude: " + altitude + "<br>";
  document.getElementById("details").innerHTML +=
    "Heading: " + heading + "<br>";

  if (speed !== null) {
    document.getElementById("details").innerHTML += "Speed: " + speed + "<br>";
  } else {
    document.getElementById("details").innerHTML +=
      "Speed information is not available.<br>";
  }
}
