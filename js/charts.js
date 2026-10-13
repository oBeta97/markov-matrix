// =========================================================
// GRAFICO 1: Distribuzione delle probabilità nel tempo
// =========================================================
const chartCanvas = document.getElementById('graph');
const lineColors = ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(153, 102, 255)'];

const stateCount = distributionHistory[0]?.length || 0;

const stateDatasets = Array.from({ length: stateCount }, (_, stateIndex) => ({
    label: `Stato ${stateIndex + 1}`,
    data: distributionHistory.map(distribution => distribution[stateIndex]),
    fill: false,
    borderColor: lineColors[stateIndex % lineColors.length],
    tension: 0.1
}));

new Chart(chartCanvas, {
    type: 'line',
    data: {
        labels: distributionHistory.map((_, year) => START_YEAR + year),
        datasets: stateDatasets
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Distribuzione delle probabilità nel tempo'
            }
        },
        scales: {
            x: { title: { display: true, text: 'Anno' } },
            y: { title: { display: true, text: 'Probabilità' } }
        }
    }
});

// =========================================================
// GRAFICO 2: Cambio stato del ponte e curve di probabilità
// =========================================================
// Utilizza expectedStates, upperBounds e lowerBounds calcolati in js/statistics.js
const stateChartCanvas = document.getElementById('state-graph');

new Chart(stateChartCanvas, {
    type: 'line',
    data: {
        labels: distributionHistory.map((_, year) => START_YEAR + year),
        datasets: [
            {
                label: 'Probabilità superiore (-1σ)',
                data: upperBounds,
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Stato medio',
                data: expectedStates,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2.5,
                pointRadius: 0,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Probabilità inferiore (+1σ)',
                data: lowerBounds,
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.3,
                fill: false
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Cambio stato del ponte nel tempo con curve di probabilità'
            }
        },
        scales: {
            y: {
                reverse: true, // 1 in alto (ottimo), 5 in basso (critico)
                min: 1,
                max: 5,
                title: { display: true, text: 'Stato di condizione' },
                ticks: {
                    stepSize: 1,
                    callback: (value) => `Stato ${value}`
                }
            },
            x: {
                title: { display: true, text: 'Anno' }
            }
        }
    }
});
