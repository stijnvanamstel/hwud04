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