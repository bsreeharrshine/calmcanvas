let reminders = [];
let editIndex = null;

function goBack() {
  window.location.href = "dashboard.html";
}

/* Notification permission */
if ('Notification' in window && Notification.permission === 'default') {
  document.getElementById('permissionBox').style.display = 'block';
  Notification.requestPermission();
}

const defaultTimes = {
  "😴 Time to sleep": "22:00",
  "🧘 Enter wellness log": "19:00",
  "🚶 Take a short walk": "18:00",
  "📵 Take a screen break": "16:00",
  "🌞 Get sunlight": "08:00"
};

function addReminder() {
  const text = reminderText.value;
  if (!text) {
    alert("Select a reminder");
    return;
  }

  if (text.includes("Drink water")) {
    const baseHour = 8;
    for (let i = 0; i < 4; i++) {
      const hour = (baseHour + i * 2) % 24;
      reminders.push({
        text,
        time: hour.toString().padStart(2, '0') + ":00",
        notified: false
      });
    }
  } else {
    reminders.push({
      text,
      time: defaultTimes[text],
      notified: false
    });
  }

  displayReminders();
}

function displayReminders() {
  const list = document.getElementById('reminderList');
  list.innerHTML = '';

  reminders.forEach((r, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>${r.time} — ${r.text}</div>
      <div class="buttons">
        <button class="edit" onclick="openModal(${index})">Edit ✏️</button>
        <button class="delete" onclick="deleteReminder(${index})">Delete ❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function deleteReminder(index) {
  reminders.splice(index, 1);
  displayReminders();
}

function openModal(index) {
  editIndex = index;
  editText.value = reminders[index].text;
  editTime.value = reminders[index].time;
  editModal.style.display = 'block';
}

function closeModal() {
  editModal.style.display = 'none';
  editIndex = null;
}

function saveEdit() {
  if (editIndex !== null) {
    reminders[editIndex].text = editText.value;
    reminders[editIndex].time = editTime.value;
    reminders[editIndex].notified = false;
    displayReminders();
    closeModal();
  }
}

/* Notification check every minute */
setInterval(() => {
  const now = new Date();
  const current =
    now.getHours().toString().padStart(2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0');

  reminders.forEach(r => {
    if (r.time === current && !r.notified) {
      new Notification("Calm Canvas", { body: r.text });
      r.notified = true;
    }
  });
}, 60000);
