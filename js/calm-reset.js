function goBack() {
  window.location.href = "dashboard.html";
}

const techniques = [
  {
    title: "5–4–3–2–1 Method",
    text: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and 1 you taste. This helps bring your mind to the present moment."
  },
  {
    title: "Box Breathing",
    text: "Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Repeat 4 times."
  },
  {
    title: "Body Grounding",
    text: "Press your feet into the floor. Notice the support beneath you. Relax your shoulders and jaw."
  },
  {
    title: "Temperature Reset",
    text: "Hold something cold or splash cool water on your face. Notice the sensation."
  },
  {
    title: "Gratitude Pause",
    text: "Think of 3 things you’re grateful for right now, even small ones."
  },
  {
    title: "Safe Place",
    text: "Close your eyes and imagine a place where you feel calm and safe. Stay there for 30 seconds."
  }
];

function showTechnique() {
  const random = Math.floor(Math.random() * techniques.length);
  document.getElementById("title").innerText = techniques[random].title;
  document.getElementById("text").innerText = techniques[random].text;
}
