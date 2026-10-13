# markov-matrix

Un test delle matrici di Markov per il calcolo delle probabilità e simulazione del degrado strutturale (ponti e infrastrutture).

## 📌 Descrizione

Il modello simula la probabilità di transizione tra 5 stati di condizione (Condition States, CS1–CS5) lungo un arco temporale di 125 anni a partire dal **1985**, mostrando:
- La **matrice di transizione** delle probabilità;
- Il grafico dinamico dell'**evoluzione delle distribuzioni degli stati nel tempo**;
- Il grafico dell'**evoluzione dello stato medio del ponte** con le due **curve di probabilità** (limiti superiore e inferiore $\pm 1\sigma$), mediante **Chart.js**.

Per l'approfondimento teorico sui tassi di degrado e il confronto con i dati storici (Florida DOT e Jiang & Sinha), consulta il file dedicato: [MODELLO_DEGRADO.md](./MODELLO_DEGRADO.md).

## 📁 Struttura del Progetto

```
markov-matrix/
├── index.html                       # Markup HTML principale con inclusione canvas e script
├── README.md                        # Documentazione del repository
├── MODELLO_DEGRADO.md               # Approfondimento teorico sul decadimento e dati storici
├── css/
│   └── style.css                    # Fogli di stile per tabelle e contenitori grafici
└── js/                              # Script semplici separati per argomento
    ├── simulation.js                # Calcolo della matrice e distribuzione di probabilità
    ├── statistics.js                # Calcolo di media, deviazione standard e curve di probabilità (con spiegazioni)
    ├── table.js                     # Popolamento della tabella HTML nel DOM
    └── charts.js                    # Creazione dei due grafici con Chart.js
```

## 🛠️ Tecnologie utilizzate

- **HTML5**
- **CSS3**
- **JavaScript** (variabili autodescrittive e codice separato per argomento)
- [Chart.js](https://www.chartjs.org/) (via CDN)

## 🚀 Utilizzo

Apri direttamente il file `index.html` in qualsiasi browser web moderno (anche con doppio clic in locale, senza necessità di server o installazioni).
