function saveDetailsToLocalStorage(event) {
  event.preventDefault(); // Prevent the default form submission behavior.

  // Get the values of the input fields.
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const number = document.getElementById("number").value;
  const plate = document.getElementById("plate").value;
  const model = document.getElementById("model").value;

  // Check if any field is empty.
  if (
    fname === "" ||
    lname === "" ||
    number === "" ||
    plate === "" ||
    model === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Create a JSON object to store the details.
  const details = {
    fname: fname,
    lname: lname,
    number: number,
    plate: plate,
    model: model,
  };

  // Store the details in local storage.
  localStorage.setItem("details", JSON.stringify(details));

  // Console log the user details.
  console.log(details);

  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("number").value = "";
  document.getElementById("plate").value = "";
  document.getElementById("model").value = "";

  // Show an alert to show successful completion of the form filling.
  alert("Form submitted successfully!");

  // Navigate to a different page (replace "target-page.html" with your desired page URL).
  window.location.href = "HomePage.html";
}

// Add an event listener to the form submit event to call the saveDetailsToLocalStorage() function.
document
  .getElementById("continue")
  .addEventListener("click", saveDetailsToLocalStorage);
