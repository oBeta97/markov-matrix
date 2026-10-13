const matrixTableBody = document.querySelector('#matrix #matrix-body');

// Popola la tabella con la matrice di transizione
transitionMatrix.forEach((incomingProbabilities, toState) => {
    const tableRow = document.createElement('tr');
    
    const stateLabelCell = document.createElement('td');
    stateLabelCell.textContent = toState + 1;
    tableRow.appendChild(stateLabelCell);

    incomingProbabilities.forEach((probability) => {
        const probabilityCell = document.createElement('td');
        probabilityCell.textContent = probability.toFixed(2);
        tableRow.appendChild(probabilityCell);
    });

    matrixTableBody.appendChild(tableRow);
});
