function loginUser() {
  const name = document.getElementById("nameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // STORAGE (ONLY THIS PART IS USED FOR CONNECTION)
  localStorage.setItem("loggedInName", name);
  localStorage.setItem("loggedInEmail", email);

  // Redirect
  window.location.href = "dashboard.html";
}
