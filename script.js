// Numero di anni da simulare e visualizzare
const YEARS = 125;

const chartCanvas = document.getElementById('graph');
const matrixTableBody = document.querySelector('#matrix #matrix-body');

/*
P:Il calo è molto lento. è normale?


Claude:
Sì, è normale. Il calo lento viene dai dati reali, non da un errore nel codice.

1. I ponti degradano in decenni, non in pochi anni. Nelle due fonti che ho letto:

Florida DOT, Tab. 4.19: per un impalcato in c.a. il passaggio dallo stato 2 al 3 richiede in mediana 47 anni. Il tempo per arrivare all'ultimo stato è stimato in 146 anni.
Jiang & Sinha (1989), Indiana: in un ambiente con sali antigelo la vita media fino allo stato da riparare o sostituire è di circa 54 anni.
La matrice di prima (0,7–0,8 sulla diagonale) significava restare in uno stato circa 2–3 anni. Con quei valori un ponte nuovo arrivava allo stato critico in circa 15 anni, molto più in fretta di quanto succede nella realtà.

2. Con YEARS = 10 vedi solo l'inizio della curva. Partendo da 100 ponti nuovi:

Anno	CS1	CS2	CS3	CS4	CS5
10	30	64	5	0,3	0
50	0,3	55	30	10	5
100	0	26	29	18	27
Nei primi 10 anni quasi tutto si ferma in CS2, cioè difetti lievi e non strutturali. Gli stati peggiori si popolano dopo 30–100 anni. Se metti YEARS a 50 o 100 vedi tutto il ciclo.

3. La Florida è un ambiente favorevole. Lì non si usano sali antigelo. In zone con sali e gelo-disgelo, come il Nord Italia o l'Appennino, il degrado reale è più veloce. Questi valori vanno letti come scenario ottimistico.

4. Una nota sul modello: il primo calo (CS1 → CS2) in realtà è un po' troppo rapido. È un limite delle catene di Markov semplici: la frazione in CS1 comincia a calare subito, già dal primo anno. Il report FDOT corregge questo effetto con un fattore Weibull.

Se vuoi uno scenario più aggressivo, posso dimezzare i tempi mediani: è circa il divario tra le stime degli esperti e i dati storici riportato nel report FDOT. Sarebbe però una mia ipotesi, non un dato misurato su ponti esposti ai sali. In quel caso la diagonale diventerebbe circa .787 / .971 / .962 / .942.

*/





const transitionMatrix = [
    [.887,0,0,0,0],
    [.113,.985,0,0,0],
    [0,.015,.981,0,0],
    [0,0,.019,.971,0],
    [0,0,0,.029,1],
];

const distributionHistory = [
    [0,0,0,1,0]
];

for(let year = 0; year < YEARS; year++){
    let currentDistribution = distributionHistory[year];
    const nextDistribution = [];
    transitionMatrix.forEach((incomingProbabilities, toState) => {
        const contributions = []
        const stayingAmount = incomingProbabilities[toState] * currentDistribution[toState];
        
        contributions.push(stayingAmount)
    
        for(let fromState = toState-1 ; fromState >= 0 ; fromState--){
            const fromStateAmount = currentDistribution[fromState];
            contributions.push(fromStateAmount * incomingProbabilities[fromState]);
        }
        nextDistribution.push(contributions.reduce((sum, contribution) => sum + contribution, 0));
    });
    distributionHistory.push(nextDistribution);
}

const lineColors = ['rgb(75, 192, 192)', 'rgb(255, 99, 132)', 'rgb(54, 162, 235)'];

// Numero di serie determinato dalla lunghezza del primo sotto-array
const stateCount = distributionHistory[0]?.length || 0;

const stateDatasets = Array.from({ length: stateCount }, (_, stateIndex) => ({
  label: `Dataset ${stateIndex + 1}`,
  data: distributionHistory.map(distribution => distribution[stateIndex]), // Estrae la colonna stateIndex
  fill: false,
  borderColor: lineColors[stateIndex % lineColors.length],
  tension: 0.1
}));

const chartData = {
  labels: distributionHistory.map((_, year) => `Anno ${year}`),
  datasets: stateDatasets
};

const chartConfig = {
  type: 'line',
  data: chartData,
};

new Chart(chartCanvas, chartConfig);

transitionMatrix.forEach((incomingProbabilities, toState) => {
    const tableRow = document.createElement('tr');
        const stateLabelCell = document.createElement('td');
        stateLabelCell.textContent = toState + 1;
        tableRow.appendChild(stateLabelCell);
    incomingProbabilities.forEach((probability, fromState) => {
        const probabilityCell = document.createElement('td');
        probabilityCell.textContent = probability.toFixed(1);
        tableRow.appendChild(probabilityCell);
    });
    matrixTableBody.appendChild(tableRow);
});




