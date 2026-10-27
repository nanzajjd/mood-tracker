console.log('script.js підключено')
const moodEntries = [
    {date: '2026-01-06', mood: 1},
    {date: '2026-01-07', mood: 2}, 
    {date: '2026-01-08', mood: 3},
    {date: '2026-01-09', mood: 4},
    {date: '2026-01-10', mood: 5}
];

console.log('Записи настрою:', moodEntries);

// Обчислює середній настрій за всіма записами.
function calculateAverageMood(entries) {
    let sum = 0;

    for( let i = 0; i < entries.length; i++){
        sum +=entries[i].mood;
    }
    return sum / entries.length;
}

const averageMood = calculateAverageMood(moodEntries);

console.log('Середній настрій:', averageMood);

if (averageMood >= 3){
    console.log('Гарний тиждень');
}
else{
    console.log('Важкий тиждень');
}

// Повертає текстову назву настрою за оцінкою від 1 до 5.
const moodToLabel = mood => {
    const labels =[
        'Дуже сумний',
    'Сумний',
    'Спокійний',
    'Веселий',
    'Дуже веселий'
    ];

    return labels[mood - 1];
};

console.log('Настрій:', moodToLabel(moodEntries[0].mood));
