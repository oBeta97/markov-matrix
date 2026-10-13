// ======================================================================================
// CALCOLO DELLO STATO MEDIO DEL PONTE E DELLE BANDE DI PROBABILITÀ
// ======================================================================================

// Array che conterranno i dati per il grafico del cambio di stato:
// - expectedStates: valore atteso dello stato (la linea media)
// - upperBounds: limite di probabilità superiore (scenario ottimistico)
// - lowerBounds: limite di probabilità inferiore (scenario pessimistico)
const expectedStates = [];
const upperBounds = [];
const lowerBounds = [];

/*
Per ogni anno della simulazione abbiamo un vettore di 5 probabilità:
distribution = [p1, p2, p3, p4, p5]
dove p1 è la probabilità di essere nello Stato 1 (Nuovo), fino a p5 (Critico).
La somma delle probabilità p1 + p2 + p3 + p4 + p5 è sempre pari a 1 (100%).
*/
distributionHistory.forEach(distribution => {
    
    // ----------------------------------------------------------------------------------
    // 1. VALORE ATTESO (MEDIA PONDERATA DELLO STATO)
    // ----------------------------------------------------------------------------------
    // Rappresenta lo "stato medio" in cui si trova il ponte in quell'anno.
    // Formula: E[S] = Somma(stato * probabilità_dello_stato) per stato = 1, 2, 3, 4, 5
    // Esempio: se abbiamo 100% nello stato 1 -> media = 1*1.0 = 1.0 (ponte perfetto).
    // Con il passare degli anni la probabilità si sposta verso gli stati 2, 3, 4, 5,
    // quindi la media sale gradualmente verso valori più alti (es. 1.76, 2.5, 3.8...).
    let mean = 0;
    distribution.forEach((prob, index) => {
        const state = index + 1; // Gli stati sono indicizzati da 1 a 5
        mean += state * prob;
    });

    // ----------------------------------------------------------------------------------
    // 2. VARIANZA E DEVIAZIONE STANDARD (INDICE DI INCERTEZZA)
    // ----------------------------------------------------------------------------------
    // La media da sola non dice quanto il degrado sia incerto o disperso.
    // Calcoliamo la varianza pesata: quanto i singoli stati si discostano dalla media.
    // Formula: Var(S) = Somma( (stato - media)^2 * probabilità_dello_stato )
    let variance = 0;
    distribution.forEach((prob, index) => {
        const state = index + 1;
        variance += Math.pow(state - mean, 2) * prob;
    });

    // La deviazione standard è la radice quadrata della varianza: sigma = sqrt(Var).
    // All'anno 0 (ponte nuovo, 100% in stato 1) la deviazione standard è 0 (certezza assoluta).
    // Negli anni successivi, l'incertezza aumenta e la deviazione standard cresce,
    // allargando la forbice tra la curva migliore e quella peggiore.
    const stdDev = Math.sqrt(variance);

    expectedStates.push(mean);

    // ----------------------------------------------------------------------------------
    // 3. CURVA DI PROBABILITÀ SUPERIORE (SCENARIO OTTIMISTICO: -1 DEVIAZIONE STANDARD)
    // ----------------------------------------------------------------------------------
    // Nel nostro grafico l'asse Y è invertito (lo Stato 1 è in alto, lo Stato 5 è in basso).
    // La curva superiore sul grafico corrisponde a uno stato numericamente più basso (più vicino a 1),
    // cioè un ponte che degrada più lentamente della media: media - stdDev.
    // Usiamo Math.max(1, ...) perché un ponte non può essere in una condizione migliore dello Stato 1.
    upperBounds.push(Math.max(1, mean - stdDev));

    // ----------------------------------------------------------------------------------
    // 4. CURVA DI PROBABILITÀ INFERIORE (SCENARIO PESSIMISTICO: +1 DEVIAZIONE STANDARD)
    // ----------------------------------------------------------------------------------
    // La curva inferiore sul grafico corrisponde a uno stato numericamente più alto (più vicino a 5),
    // cioè un ponte che degrada più velocemente della media: media + stdDev.
    // Usiamo Math.min(5, ...) perché lo stato peggiore possibile è lo Stato 5 (collasso/critico).
    lowerBounds.push(Math.min(5, mean + stdDev));
});
