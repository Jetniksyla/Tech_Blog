document.querySelector("#signup").addEventListener("submit", (event) => {
  // Prevent default form submission
  event.preventDefault();

  // Extract first name, last name, username, and password from form inputs
  const userObj = {
    firstName: document.querySelector("#signupFirstName").value,
    lastName: document.querySelector("#signupLastName").value,
    username: document.querySelector("#signupUsername").value,
    password: document.querySelector("#signupPassword").value,
  };

  console.log(userObj); // Log user object for debugging

  // Send a POST request to the server to create a new user
  fetch("/api/users/", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      // If signup is successful, redirect the user to the dashboard
      console.log("Signed up successfully");
      location.href = "/dashboard";
    } else {
      // If signup fails, show an alert message
      alert(
        "Try again! Minimum length of the password should be 8 characters."
      );
    }
  });
});
