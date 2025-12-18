// Set today date automatically
const dateInput = document.getElementById("dateInput");
const today = new Date();
dateInput.value = today.toLocaleDateString();

function goBack() {
  window.location.href = "dashboard.html";
}

function saveEntry() {
  const entry = {
    date: dateInput.value,
    sleep: document.getElementById("sleepInput").value,
    exercise: document.getElementById("exerciseInput").value,
    hydration: document.getElementById("hydrationInput").value,
    energy: document.getElementById("energyInput").value,
    mood: document.getElementById("moodInput").value,
    stress: document.getElementById("stressInput").value,
    notes: document.getElementById("notesInput").value
  };

  if (
    !entry.sleep &&
    !entry.exercise &&
    !entry.hydration &&
    !entry.energy &&
    !entry.mood &&
    !entry.stress &&
    !entry.notes
  ) {
    alert("Please fill at least one field before saving.");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("wellnessEntries") || "[]");
  entries.push(entry);
  localStorage.setItem("wellnessEntries", JSON.stringify(entries));

  alert("Entry saved!");

  document.getElementById("sleepInput").value = "";
  document.getElementById("exerciseInput").value = "";
  document.getElementById("hydrationInput").value = "";
  document.getElementById("energyInput").value = "";
  document.getElementById("moodInput").value = "";
  document.getElementById("stressInput").value = "";
  document.getElementById("notesInput").value = "";

  displayPast();
}

function displayPast() {
  const container = document.getElementById("pastEntriesContainer");
  let entries = JSON.parse(localStorage.getItem("wellnessEntries") || "[]");
  container.innerHTML = "";

  if (entries.length === 0) {
    container.innerHTML = "No entries yet.";
    return;
  }

  entries.slice().reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.date}</strong> - Click to view`;
    div.onclick = () => openModal(entry);
    container.appendChild(div);
  });
}

function openModal(entry) {
  document.getElementById("modalBody").innerHTML = `
    <strong>Date:</strong> ${entry.date}<br>
    <strong>Sleep:</strong> ${entry.sleep || "-"}<br>
    <strong>Exercise:</strong> ${entry.exercise || "-"}<br>
    <strong>Hydration:</strong> ${entry.hydration || "-"}<br>
    <strong>Energy:</strong> ${entry.energy || "-"}<br>
    <strong>Mood:</strong> ${entry.mood || "-"}<br>
    <strong>Stress:</strong> ${entry.stress || "-"}<br>
    <strong>Notes:</strong> ${entry.notes || "-"}
  `;
  document.getElementById("entryModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("entryModal").style.display = "none";
}

displayPast();
