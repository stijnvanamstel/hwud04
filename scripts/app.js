'use strict';

// Navigatie
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.onclick = () => {
  navLinks.classList.toggle('open');
};

// Progress tracker
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

// Leaderboard
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

// Workout generator
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
  if (days == 3 && goal == "kracht") {
    cards += createCard("Dag 1", "Barbell squat 3x5<br>Barbell bench press 3x5<br>Barbell row 3x8");
    cards += createCard("Dag 2", "Rust / lichte cardio");
    cards += createCard("Dag 3", "Deadlift 3x5<br>Overhead Press 3x5<br>Smith JM press 3x5");
  } else if (days == 3 && goal == "spiermassa") {
    cards += createCard("Dag 1", "Squat 2x8-12<br>Bench 2x10<br>Lat Pulldown 2x8-12");
    cards += createCard("Dag 2", "Rust");
    cards += createCard("Dag 3", "Deadlift 3x6-10<br>Incline Bench 2x8-12<br>Row 2x8-12");
  } else if (days == 3 && goal == "conditie") {
    cards += createCard("Dag 1", "3 ronden circuit: squat, push-ups, burpees, crunches, pull-ups");
    cards += createCard("Dag 2", "Hardlopen, rustig");
    cards += createCard("Dag 3", "HIIT sprints, buikspierkwartier");
  } else if (days == 4 && goal == "kracht") {
    cards += createCard("Dag 1 - Push", "Barbell bench press 3x5<br>Incline bench 3x5<br>Overhead press 3x5");
    cards += createCard("Dag 2 - Pull", "Deadlift 3x5<br>Lat pullown 3x5<br>Barbell row 3x5");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Legs", "Barbell squat 3x5<br>Romanian deadlift 3x5<br>Bulgarian split squat 3x6-8");
  } else if (days == 4 && goal == "spiermassa") {
    cards += createCard("Dag 1 - Upper (Push focus)", "Bench press 4x8<br>Incline dumbbell press 3x10<br>Shoulder press 3x8");
    cards += createCard("Dag 2 - Lower", "Squat 4x8<br>Romanian deadlift 3x10<br>Leg press 3x12");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Upper (Pull focus)", "Pull-ups 3x8<br>Barbell row 4x8<br>Lat pulldown 3x10");
  } else if (days == 4 && goal == "conditie") {
    cards += createCard("Dag 1 - HIIT", "10x sprint 30 sec / rust 60 sec<br>Burpees 3x15");
    cards += createCard("Dag 2 - Full Body", "Circuit 3 rondes: squat x15, push-ups x15, pull-ups x8");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Cardio + Core", "30 min hardlopen<br>Leg raises 3x15");
  } else if (days == 5 && goal == "kracht") {
    cards += createCard("Dag 1 - Bench", "Bench press 5x5<br>Incline bench 3x5<br>Tricep dips 3x8");
    cards += createCard("Dag 2 - Squat", "Squat 5x5<br>Leg press 3x8");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Deadlift", "Deadlift 5x3<br>Barbell row 3x5");
    cards += createCard("Dag 5 - Overhead + accessoires", "Overhead press 5x5<br>Lateral raises 3x12");
  } else if (days == 5 && goal == "spiermassa") {
    cards += createCard("Dag 1 - Push", "Bench press 4x8<br>Incline press 3x10<br>Shoulder press 3x8");
    cards += createCard("Dag 2 - Pull", "Pull-ups 3x8<br>Barbell row 4x8<br>Lat pulldown 3x10");
    cards += createCard("Dag 3 - Legs", "Squat 4x8<br>Romanain deadlift 3x10");
    cards += createCard("Dag 4 - Push (licht)", "Dumbbell bench 3x12");
    cards += createCard("Dag 5 - Pull (licht)", "Seated row 3x12");
  } else if (days == 5 && goal == "conditie") {
    cards += createCard("Dag 1 - Cardio", "45 min hardlopen");
    cards += createCard("Dag 2 - HIIT", "Sprints + burpees");
    cards += createCard("Dag 3", "Rust");
    cards += createCard("Dag 4 - Circuit", "4 rondes: squat x20, push-ups x15, pull-ups x8");
    cards += createCard("Dag 5 - Cardio", "Fietsen of roeien 30-45 min");
  }
  output.innerHTML = cards;
}

// Toggle tussen lifts bij beginnersgids
function showLift(lift) {
  document.querySelectorAll('.tech-block').forEach(el => {
    el.style.display = 'none';
  });
  document.getElementById(lift).style.display = 'block';
}

// Gym map
const gymMap = L.map('gymMap').setView([52.6422, 5.0583], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(gymMap);

// Markers
L.marker([52.66988464450018, 5.044183265877736]).addTo(gymMap)
    .bindPopup('Basic-Fit Hoorn Zwaagdijk')
    .openPopup();

L.marker([52.64939073309883, 5.050463415674783]).addTo(gymMap)
    .bindPopup('Gymone Hoorn')
    .openPopup();

L.marker([52.6391226740964, 5.036708022500222]).addTo(gymMap)
    .bindPopup('Basic-Fit Grote Waal')
    .openPopup();

L.marker([52.64921144525394, 5.048410298072299]).addTo(gymMap)
    .bindPopup('Sportcity Hoorn')
    .openPopup();

L.marker([52.6496245742423, 5.075321468153823]).addTo(gymMap)
    .bindPopup('Sportcentrum Hoorn')
    .openPopup();
