function signupUser() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const phone = document.getElementById("phoneInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (name === "" || email === "" || phone === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }

  // 🔹 added (no logic change)
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  window.location.href = "login.html";
}

function goToLogin() {
  window.location.href = "login.html";
}
