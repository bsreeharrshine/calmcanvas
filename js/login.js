document.getElementById("loginBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Supabase login will be added here later
  console.log("Login clicked:", { name, email, password });
});

document.getElementById("signupLink").addEventListener("click", () => {
  window.location.href = "signup.html";
});
