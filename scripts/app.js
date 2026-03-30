'use strict';

// ───────── NAV ─────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.onclick = () => {
  navLinks.classList.toggle('open');
};

// ───────── WEEKPLANNER ─────────
const dayButtons = document.querySelectorAll(".days button");
const dayContents = document.querySelectorAll(".day");

dayButtons.forEach(button => {
  button.addEventListener("click", () => {

    // reset alles
    dayButtons.forEach(btn => btn.classList.remove("active"));
    dayContents.forEach(day => day.classList.remove("active"));

    // active knop
    button.classList.add("active");

    // juiste dag tonen
    const selectedDay = document.getElementById(button.dataset.day);
    selectedDay.classList.add("active");
  });
});

// ───────── TRACKER ─────────
let lifts = [];

document.getElementById('addLiftBtn').onclick = function () {
  const weight = document.getElementById('trkWeight').value;
  const reps = document.getElementById('trkReps').value;

  if (!weight || !reps) {
    alert('Vul alles in');
    return;
  }

  const onerm = Math.round(weight * (1 + reps / 30));
  document.getElementById('onermResult').textContent = onerm + ' kg';

  lifts.push({ weight, reps });

  renderLifts();
};

function renderLifts() {
  const container = document.getElementById('liftHistory');
  container.innerHTML = '';

  lifts.forEach(l => {
    container.innerHTML += `
      <div class="lift-entry">
        ${l.weight}kg x ${l.reps}
      </div>
    `;
  });
}

// ───────── GYM MAP (HOORN) ─────────
const gyms = [
  { name: 'Basic-Fit Hoorn', lat: 52.642, lng: 5.059 },
  { name: 'Sportcentrum Hoorn', lat: 52.640, lng: 5.055 }
];

const map = L.map('gymMap').setView([52.64, 5.05], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);

gyms.forEach(g => {
  L.marker([g.lat, g.lng])
    .addTo(map)
    .bindPopup(g.name);
});

// ───────── LEADERBOARD ─────────
let scores = [];

document.getElementById('lbSubmitBtn').onclick = function () {
  const name = document.getElementById('lbName').value;
  const kg = document.getElementById('lbKg').value;

  if (!name || !kg) return;

  scores.push({ name, kg });
  scores.sort((a, b) => b.kg - a.kg);

  renderLeaderboard();
};

function renderLeaderboard() {
  const container = document.getElementById('lbSquat');
  container.innerHTML = '<h3>Squat</h3>';

  scores.forEach((s, i) => {
    container.innerHTML += `
      <div class="lb-entry">
        <span>#${i + 1}</span>
        <span>${s.name}</span>
        <span>${s.kg}kg</span>
      </div>
    `;
  });
}

// ───────── WORKOUT GENERATOR ─────────
document.getElementById("generateBtn").addEventListener("click", generateWorkout);

function createCard(title, content) {
  return `
    <div class="workout-card">
      <h4>${title}</h4>
      <p>${content}</p>
    </div>
  `;
}

function generateWorkout() {
  const days = document.getElementById("daysSelect").value;
  const goal = document.getElementById("goalSelect").value;
  const output = document.getElementById("workoutOutput");

  let cards = "";

  // =====================
  // 3 DAGEN
  // =====================
  if (days == 3 && goal == "kracht") {
    cards += createCard("Dag 1", "Squat 5x5<br>Bench 5x5<br>Row 4x8");
    cards += createCard("Dag 2", "Rust / lichte cardio");
    cards += createCard("Dag 3", "Deadlift 5x5<br>Overhead Press 5x5");
  }

  else if (days == 3 && goal == "spiermassa") {
    cards += createCard("Dag 1", "Squat 4x10<br>Bench 4x10<br>Lat Pulldown 3x12");
    cards += createCard("Dag 2", "Rust");
    cards += createCard("Dag 3", "Deadlift 4x8<br>Incline Bench 4x10<br>Row 3x12");
  }

  else if (days == 3 && goal == "conditie") {
    cards += createCard("Dag 1", "Circuit: squat, push-ups, burpees");
    cards += createCard("Dag 2", "Rust");
    cards += createCard("Dag 3", "HIIT sprints + core");
  }

  // =====================
  // 4 DAGEN
  // =====================
  else if (days == 4 && goal == "kracht") {
    cards += createCard("Dag 1 - Upper", "Bench 5x5<br>Row 5x5");
    cards += createCard("Dag 2 - Lower", "Squat 5x5<br>Leg accessories");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Lower", "Deadlift 5x5");
  }

  else if (days == 4 && goal == "spiermassa") {
    cards += createCard("Dag 1 - Upper", "Chest + Back");
    cards += createCard("Dag 2 - Lower", "Legs + Glutes");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Upper", "Armen + shoulders");
  }

  else if (days == 4 && goal == "conditie") {
    cards += createCard("Dag 1", "HIIT");
    cards += createCard("Dag 2", "Full body licht");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4", "Cardio + core");
  }

  // =====================
  // 5 DAGEN
  // =====================
  else if (days == 5 && goal == "kracht") {
    cards += createCard("Dag 1", "Bench zwaar");
    cards += createCard("Dag 2", "Squat zwaar");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4", "Deadlift zwaar");
    cards += createCard("Dag 5", "Accessoires + core");
  }

  else if (days == 5 && goal == "spiermassa") {
    cards += createCard("Push", "Chest, shoulders, triceps");
    cards += createCard("Pull", "Back, biceps");
    cards += createCard("Legs", "Quads, hamstrings");
    cards += createCard("Push", "Chest focus");
    cards += createCard("Pull", "Back focus");
  }

  else if (days == 5 && goal == "conditie") {
    cards += createCard("Dag 1", "Cardio");
    cards += createCard("Dag 2", "HIIT");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4", "Circuit");
    cards += createCard("Dag 5", "Cardio");
  }

  output.innerHTML = cards;
}