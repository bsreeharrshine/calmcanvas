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

/* Add reminder */
function addReminder() {
  const reminderText = document.getElementById("reminderText");
  const text = reminderText.value;

  if (!text) {
    alert("Select a reminder");
    return;
  }

  if (text.includes("Drink water")) {
    const baseHour = 8;
    const minute = "00";
    for (let i = 0; i < 4; i++) {
      const hour = (baseHour + i * 2) % 24;
      reminders.push({
        text,
        time: hour.toString().padStart(2, '0') + ':' + minute,
        notified: false
      });
    }
  } else {
    const time = defaultTimes[text];
    reminders.push({ text, time, notified: false });
  }

  displayReminders();
}

/* Display reminders */
function displayReminders() {
  const list = document.getElementById('reminderList');
  list.innerHTML = '';

  reminders.forEach((r, index) => {
    const li = document.createElement('li');

    const textDiv = document.createElement('div');
    textDiv.textContent = `${r.time} — ${r.text}`;
    li.appendChild(textDiv);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit ✏️';
    editBtn.className = 'edit';
    editBtn.onclick = () => openModal(index);
    buttonsDiv.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete ❌';
    delBtn.className = 'delete';
    delBtn.onclick = () => {
      reminders.splice(index, 1);
      displayReminders();
    };
    buttonsDiv.appendChild(delBtn);

    li.appendChild(buttonsDiv);
    list.appendChild(li);
  });
}

/* Modal functions */
function openModal(index) {
  editIndex = index;
  document.getElementById('editText').value = reminders[index].text;
  document.getElementById('editTime').value = reminders[index].time;
  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
  editIndex = null;
}

function saveEdit() {
  if (editIndex !== null) {
    reminders[editIndex].text = document.getElementById('editText').value;
    reminders[editIndex].time = document.getElementById('editTime').value;
    reminders[editIndex].notified = false;
    displayReminders();
    closeModal();
  }
}

/* Notification check */
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
