const staticCard = document.querySelector("#mood-history .card");

if (staticCard) {
  staticCard.remove();
}

console.log("script.js підключено");
const moodEntries = [
  {
    date: "2026-01-06",
    mood: 1,
    note: "День був складним і виснажливим",
  },
  {
    date: "2026-01-07",
    mood: 2,
    note: "День був насичений, але продуктивний",
  },
  {
    date: "2026-01-08",
    mood: 3,
    note: "День минув спокійно та без зайвого поспіху",
  },
  {
    date: "2026-01-09",
    mood: 4,
    note: "День подарував багато позитивних емоцій",
  },
  {
    date: "2026-01-10",
    mood: 5,
    note: "День подарував багато позитивних емоцій",
  },
];

const listContainer = document.querySelector("#mood-history");
const form = document.querySelector("#mood-form");

// Обробляє надсилання форми без перезавантаження: зчитує поля, додає новий запис у масив, перемальовує список і очищає форму.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = document.querySelector("#date").value;
  const mood = Number(document.querySelector("#mood").value);
  const note = document.querySelector("#note").value.trim();
  const newEntry = {
    date: date,
    mood: mood,
    note: note,
  };
  moodEntries.push(newEntry);
  renderMoodHistory(moodEntries);
  form.reset();
  noteCounter.textContent = 200;
  console.log(moodEntries);
});

const moodInput = document.querySelector("#mood");

// Під час введення перевіряє, що настрій у межах 1-5, і показує власне повідомлення про помилку.
moodInput.addEventListener("input", () => {
  if (
    moodInput.value !== "" &&
    (Number(moodInput.value) < 1 || Number(moodInput.value) > 5)
  ) {
    moodInput.setCustomValidity("Настрій має бути від 1 до 5");
  } else {
    moodInput.setCustomValidity("");
  }
});

const noteInput = document.querySelector("#note");
const noteCounter = document.querySelector("#note-counter");

// На кожне натискання клавіші оновлює лічильник символів, що залишилися до ліміту 200.
noteInput.addEventListener("input", () => {
  noteCounter.textContent = 200 - noteInput.value.length;
});

console.log("Записи настрою:", moodEntries);

// Обчислює середній настрій за всіма записами.
function calculateAverageMood(entries) {
  let sum = 0;

  for (let i = 0; i < entries.length; i++) {
    sum += entries[i].mood;
  }
  return sum / entries.length;
}

const averageMood = calculateAverageMood(moodEntries);

console.log("Середній настрій:", averageMood);

if (averageMood >= 3) {
  console.log("Гарний тиждень");
} else {
  console.log("Важкий тиждень");
}

// Повертає текстову назву настрою за оцінкою від 1 до 5.
const moodToLabel = (mood) => {
  const labels = [
    "Дуже сумний",
    "Сумний",
    "Спокійний",
    "Веселий",
    "Дуже веселий",
  ];

  return labels[mood - 1];
};

console.log("Настрій:", moodToLabel(moodEntries[0].mood));

// Створює та відображає картки настрою на основі масиву записів.
function renderMoodHistory(entries) {
  listContainer.innerHTML = "";

  for (const entry of entries) {
    const card = document.createElement("article");

    card.dataset.mood = entry.mood;
    card.classList.add("card");

    const moodLabel = moodToLabel(entry.mood);

    if (moodLabel === "Дуже сумний") {
      card.classList.add("card--very-sad");
    } else if (moodLabel === "Сумний") {
      card.classList.add("card--sad");
    } else if (moodLabel === "Спокійний") {
      card.classList.add("card--calm");
    } else if (moodLabel === "Веселий") {
      card.classList.add("card--happy");
    } else if (moodLabel === "Дуже веселий") {
      card.classList.add("card--very-happy");
    }

    const dateTitle = document.createElement("h3");
    dateTitle.textContent = entry.date;

    const note = document.createElement("p");
    note.textContent = entry.note;

    card.append(dateTitle, note);
    listContainer.append(card);
  }
}
renderMoodHistory(moodEntries);
const averageMoodElement = document.querySelector("#avg-mood");
averageMoodElement.textContent = "Середній настрій: " + averageMood;
