// ---------------- AUTH CHECK ----------------
const userName = localStorage.getItem("loggedInName");
if (!userName) {
  window.location.href = "login.html";
}

document.getElementById("greetingText").innerText = `Hello, ${userName} 👋`;

// ---------------- DATE ----------------
const dateEl = document.getElementById("currentDate");
dateEl.textContent = new Date().toDateString();

// ---------------- PASSCODE FLOW ----------------
const passInput = document.getElementById("passInput");
const createLink = document.getElementById("createPasscodeLink");
const savedPasscode = localStorage.getItem("journalPasscode");

// First-time logic
if (!savedPasscode) {
  createLink.style.display = "block";
  passInput.style.display = "none";
  document.getElementById("unlockBtn").style.display = "none";
}

// Create passcode
function createPasscode() {
  const newPass = prompt("Create a new passcode");

  if (!newPass) {
    alert("Passcode cannot be empty");
    return;
  }

  localStorage.setItem("journalPasscode", newPass);
  alert("Passcode created successfully!");
  unlockJournal();
}

// Unlock journal
function unlockWithPasscode() {
  const input = passInput.value.trim();

  if (input === localStorage.getItem("journalPasscode")) {
    unlockJournal();
  } else {
    alert("Incorrect passcode");
  }
}

function unlockJournal() {
  document.getElementById("passwordSection").style.display = "none";
  document.getElementById("journalSection").style.display = "flex";
  document.getElementById("journalText").focus();
}

// Change passcode
function changePasscode() {
  const oldPass = prompt("Enter current passcode");
  if (oldPass !== localStorage.getItem("journalPasscode")) {
    alert("Incorrect passcode");
    return;
  }

  const newPass = prompt("Enter new passcode");
  if (!newPass) {
    alert("Passcode cannot be empty");
    return;
  }

  localStorage.setItem("journalPasscode", newPass);
  alert("Passcode changed successfully!");
}

// ---------------- JOURNAL ----------------
function saveEntry() {
  const text = journalText.value.trim();
  if (!text) {
    alert("Write something first");
    return;
  }

  const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  entries[new Date().toISOString()] = text;
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  journalText.value = "";
  alert("Entry saved!");
  displayPast();
}

function togglePast() {
  const box = document.getElementById("pastEntriesContainer");
  box.style.display = box.style.display === "block" ? "none" : "block";
  if (box.style.display === "block") displayPast();
}

function displayPast() {
  const container = document.getElementById("pastEntriesContainer");
  const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  container.innerHTML = "";

  const keys = Object.keys(entries).sort((a,b)=>new Date(b)-new Date(a));

  if (!keys.length) {
    container.innerHTML = "<div class='entry-item'>No entries yet.</div>";
    return;
  }

  keys.forEach(k => {
    container.innerHTML += `
      <div class="entry-item">
        <div onclick="openEntry('${k}')">
          <strong>${new Date(k).toLocaleString()}</strong><br>
          ${entries[k].substring(0,50)}...
        </div>
        <button onclick="deleteEntry('${k}')">Delete</button>
      </div>
    `;
  });
}

function openEntry(key) {
  const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  journalSection.style.display = "none";
  entryView.style.display = "flex";
  entryContent.innerText = entries[key];
}

function closeEntryView() {
  entryView.style.display = "none";
  journalSection.style.display = "flex";
}

function deleteEntry(key) {
  if (!confirm("Delete this entry?")) return;
  const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
  delete entries[key];
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  displayPast();
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}
