function goBack() {
  window.location.href = "dashboard.html";
}

const moodMap = {
  1: { emoji: "😔", color: "#ff6b6b", advice: "Take a short break or talk to someone you trust." },
  2: { emoji: "😐", color: "#ffd93d", advice: "Consider journaling or doing a small mindfulness exercise." },
  3: { emoji: "😊", color: "#6fc3df", advice: "Keep up the positive habits that are working well." },
  4: { emoji: "🤩", color: "#4fa3c7", advice: "Fantastic! Maintain your routine and share your positivity." },
  5: { emoji: "😁", color: "#6bffb3", advice: "Excellent mood! Reward yourself or continue your good practices." }
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
const suggestionList = document.getElementById("suggestion-list");

let moods = [];

// Generate chart and entries
weekData.forEach(d => {
  const bar = document.createElement("div");
  bar.className = "bar";

  if (d.mood) {
    bar.style.height = d.mood * 35 + "px";
    bar.style.background = moodMap[d.mood].color;
    bar.innerHTML = `${moodMap[d.mood].emoji}<br>${d.mood}`;
    bar.classList.add("active");
    moods.push(d.mood);

    bar.onclick = () => {
      alert(`Day: ${d.day}\nMood: ${d.mood} ${moodMap[d.mood].emoji}\nSuggestion: ${moodMap[d.mood].advice}`);
    };
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
    entries.innerHTML += `<div class="entry">${d.date}: Mood ${d.mood} ${moodMap[d.mood].emoji}</div>`;
  }
});

// Summary
const avgMood = moods.length ? (moods.reduce((a,b)=>a+b,0)/moods.length).toFixed(1) : null;
document.getElementById("avg").textContent = avgMood ? `Avg: ${avgMood}` : "Avg: -";

const maxMood = moods.length ? Math.max(...moods) : null;
document.getElementById("most").textContent = maxMood ? `Most: ${maxMood} ${moodMap[maxMood].emoji}` : "Most: -";

const minMood = moods.length ? Math.min(...moods) : null;
document.getElementById("low").textContent = minMood ? `Low: ${minMood} ${moodMap[minMood].emoji}` : "Low: -";

// Suggestions
if (avgMood) {
  if (avgMood < 2) {
    suggestionList.innerHTML += `<li>Overall low mood this week. Consider meditation or talking to a friend.</li>`;
  } else if (avgMood < 4) {
    suggestionList.innerHTML += `<li>Mood is moderate. Keep journaling and practicing mindfulness.</li>`;
  } else {
    suggestionList.innerHTML += `<li>Great mood this week! Maintain your healthy habits.</li>`;
  }

  if (maxMood - minMood >= 3) {
    suggestionList.innerHTML += `<li>You had mood swings this week. Track triggers and try to balance your routine.</li>`;
  }
}
