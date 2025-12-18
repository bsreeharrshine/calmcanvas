// AUTH CHECK + GREETING
const name = localStorage.getItem("loggedInName");

if (!name) {
  window.location.href = "login.html";
} else {
  document.getElementById("greetingText").innerText =
    `Hello, ${name} 👋`;
}

// Save mood
function saveMood(value) {
  localStorage.setItem("todayMood", value);
  localStorage.setItem("todayMoodTime", new Date().toISOString());
  alert("Mood updated 💙");
}

// Logout with confirmation
function confirmLogout() {
  const ok = confirm("Are you sure you want to log out?");
  if (ok) {
    localStorage.clear();
    window.location.href = "login.html";
  }
}
