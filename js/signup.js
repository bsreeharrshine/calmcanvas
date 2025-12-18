function signupUser() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!name || !email || !phone || !password) {
    alert("Please fill in all fields.");
    return;
  }

  // Save signup data (optional, simple frontend auth)
  localStorage.setItem("signupName", name);
  localStorage.setItem("signupEmail", email);
  localStorage.setItem("signupPassword", password);

  alert("Signup successful! Please login.");

  // Redirect to login
  window.location.href = "login.html";
}

function goToLogin() {
  window.location.href = "login.html";
}
