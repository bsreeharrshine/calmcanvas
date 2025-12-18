function saveMood(value) {
  localStorage.setItem("todayMood", value);
  localStorage.setItem("todayMoodTime", new Date().toISOString());
  alert("Mood updated 💙");
}
