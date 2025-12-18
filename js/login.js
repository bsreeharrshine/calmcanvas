function loginUser() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Save user details
  localStorage.setItem("loggedInName", name);
  localStorage.setItem("loggedInEmail", email);

  // Redirect to dashboard
  window.location.href = "dashboard.html";
}
