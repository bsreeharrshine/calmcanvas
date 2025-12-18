function goBack() {
  window.location.href = "dashboard.html";
}

const moodMap = {
  1: { emoji: "😔", color: "#ff6b6b" },
  2: { emoji: "😐", color: "#ffd93d" },
  3: { emoji: "😊", color: "#6fc3df" },
  4: { emoji: "🤩", color: "#4fa3c7" },
  5: { emoji: "😁", color: "#6bffb3" }
};

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const todayIndex = new Date().getDay();

let weekData = JSON.parse(localStorage.getItem("weeklyMood")) || [];

if (weekData.length !== 7) {
  weekData = days.map(d => ({ day: d, mood: null, date: null }));
}

const todayMood = parseInt(localStorage.getItem("todayMood"));
const moodTime = localStorage.getItem("todayMoodTime");

if (todayMood) {
  weekData[todayIndex] = {
    day: days[todayIndex],
    mood: todayMood,
    date: new Date(moodTime || Date.now()).toLocaleString()
  };
  localStorage.setItem("weeklyMood", JSON.stringify(weekData));
}

const chart = document.getElementById("chart");
const daysEl = document.getElementById("days");
const entries = document.getElementById("entries");

let moods = [];

weekData.forEach(d => {
  const bar = document.createElement("div");
  bar.className = "bar";

  if (d.mood) {
    bar.style.height = d.mood * 35 + "px";
    bar.style.background = moodMap[d.mood].color;
    bar.innerHTML = `${moodMap[d.mood].emoji}<br>${d.mood}`;
    bar.classList.add("active");
    moods.push(d.mood);
  } else {
    bar.style.height = "20px";
    bar.style.background = "#ccc";
    bar.textContent = "-";
  }

  chart.appendChild(bar);

  const daySpan = document.createElement("span");
  daySpan.textContent = d.day;
  daysEl.appendChild(daySpan);

  if (d.mood && d.date) {
    entries.innerHTML += `
      <div class="entry">
        ${d.date}: Mood ${d.mood} ${moodMap[d.mood].emoji}
      </div>`;
  }
});

document.getElementById("avg").textContent =
  moods.length
    ? `Avg: ${(moods.reduce((a,b)=>a+b,0)/moods.length).toFixed(1)}`
    : "Avg: -";

document.getElementById("most").textContent =
  moods.length
    ? `Most: ${Math.max(...moods)} ${moodMap[Math.max(...moods)].emoji}`
    : "Most: -";

document.getElementById("low").textContent =
  moods.length
    ? `Low: ${Math.min(...moods)} ${moodMap[Math.min(...moods)].emoji}`
    : "Low: -";
