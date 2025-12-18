document.getElementById("signupBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all required fields");
    return;
  }

  // Supabase signup will be added here later
  console.log("Signup clicked:", { name, email, phone, password });
});

document.getElementById("loginLink").addEventListener("click", () => {
  window.location.href = "login.html";
});
