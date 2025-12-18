function goBack() {
  window.location.href = "dashboard.html";
}

function playSound(id) {
  // Pause all sounds
  document.querySelectorAll("audio").forEach(a => a.pause());

  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(err => {
      alert("Cannot play this sound: " + err);
    });
  }
}

function pauseSound(id) {
  const audio = document.getElementById(id);
  if (audio) audio.pause();
}
