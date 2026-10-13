// Numero di anni da simulare e anno di partenza
const YEARS = 125;
const START_YEAR = 1985;

// Matrice di transizione: righe = stato arrivo, colonne = stato partenza
const transitionMatrix = [
    [.887, 0,     0,     0,     0],
    [.113, .985,  0,     0,     0],
    [0,    .015,  .981,  0,     0],
    [0,    0,     .019,  .971,  0],
    [0,    0,     0,     .029,  1],
];

// Distribuzione iniziale: 100% nello stato 1 (ponte nuovo)
const distributionHistory = [
    [1, 0, 0, 0, 0]
];

// Calcolo della distribuzione anno per anno
for (let year = 0; year < YEARS; year++) {
    let currentDistribution = distributionHistory[year];
    const nextDistribution = [];
    
    transitionMatrix.forEach((incomingProbabilities, toState) => {
        const contributions = [];
        const stayingAmount = incomingProbabilities[toState] * currentDistribution[toState];
        contributions.push(stayingAmount);
    
        for (let fromState = toState - 1; fromState >= 0; fromState--) {
            const fromStateAmount = currentDistribution[fromState];
            contributions.push(fromStateAmount * incomingProbabilities[fromState]);
        }
        nextDistribution.push(contributions.reduce((sum, contribution) => sum + contribution, 0));
    });
    
    distributionHistory.push(nextDistribution);
}
