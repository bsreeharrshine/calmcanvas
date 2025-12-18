// Show current date
const dateEl = document.getElementById("currentDate");
const today = new Date();
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
dateEl.textContent = today.toLocaleDateString('en-US', options);

const PASSWORD = "1234";

function checkPassword() {
  const input = document.getElementById("passInput").value;
  if (input === PASSWORD) {
    document.getElementById("passwordSection").style.display = "none";
    document.getElementById("journalSection").style.display = "flex";
    document.getElementById("journalText").focus();
  } else {
    alert("Incorrect Passkey!");
  }
}

function saveEntry() {
  const text = document.getElementById("journalText").value.trim();
  if (text === "") {
    alert("Please write something before saving.");
    return;
  }

  const dateTimeKey = new Date().toISOString();
  let allEntries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  allEntries[dateTimeKey] = text;
  localStorage.setItem("journalEntries", JSON.stringify(allEntries));

  alert("Entry saved!");
  document.getElementById("journalText").value = "";
  displayPast();
}

function togglePast() {
  const container = document.getElementById("pastEntriesContainer");
  container.style.display = (container.style.display === "block") ? "none" : "block";
  if (container.style.display === "block") displayPast();
}

function displayPast() {
  const container = document.getElementById("pastEntriesContainer");
  const allEntries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  container.innerHTML = "";

  const keys = Object.keys(allEntries).sort((a, b) => new Date(b) - new Date(a));

  if (keys.length === 0) {
    container.innerHTML = "<div class='entry-item'>No previous entries.</div>";
  } else {
    keys.forEach(key => {
      const dateStr = new Date(key).toLocaleString();
      const snippet = allEntries[key].substring(0, 50) +
        (allEntries[key].length > 50 ? "..." : "");
      container.innerHTML += `
        <div class='entry-item'>
          <div onclick="openEntry('${key}')">
            <strong>${dateStr}</strong><br>${snippet}
          </div>
          <button onclick="deleteEntry('${key}')">Delete</button>
        </div>
      `;
    });
  }
}

function openEntry(key) {
  const allEntries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  document.getElementById("journalSection").style.display = "none";
  document.getElementById("entryView").style.display = "flex";
  document.getElementById("entryContent").textContent = allEntries[key];
}

function closeEntryView() {
  document.getElementById("entryView").style.display = "none";
  document.getElementById("journalSection").style.display = "flex";
}

function deleteEntry(key) {
  if (confirm("Are you sure you want to delete this entry?")) {
    let allEntries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
    delete allEntries[key];
    localStorage.setItem("journalEntries", JSON.stringify(allEntries));
    displayPast();
    alert("Entry deleted successfully!");
  }
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}
