const name = localStorage.getItem("loggedInName");

document.getElementById("greetingText").innerText =
  name ? `Hello, ${name} 👋` : "Hello 👋";

function saveMood(value) {
  localStorage.setItem("todayMood", value);
  localStorage.setItem("todayMoodTime", new Date().toISOString());
  alert("Mood saved 💙");
}
