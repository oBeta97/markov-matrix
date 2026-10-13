# Note sul Modello di Degrado e Validazione dei Dati

Approfondimento e note tecniche relative alla dinamica temporale del degrado strutturale dei ponti, basato su dati storici e letteratura di settore (Florida Department of Transportation e studi Jiang & Sinha).

---

### Domanda: Il calo di condizione è molto lento, è normale?

**Sì, è normale.** Il decadimento lento deriva dall'osservazione di dati reali e non da un errore nel modello numerico:

1. **I ponti degradano in decenni, non in pochi anni**:
   - **Florida DOT (Tab. 4.19)**: per un impalcato in calcestruzzo armato, il passaggio dallo Stato 2 allo Stato 3 richiede in mediana 47 anni. Il tempo stimato per raggiungere l'ultimo stato critico è di circa 146 anni.
   - **Jiang & Sinha (1989), Indiana**: in un ambiente con sali antigelo, la vita media fino allo stato che richiede riparazione o sostituzione è di circa 54 anni.
   - *Nota di calibrazione*: matrici con probabilità di permanenza sulla diagonale pari a 0,7–0,8 implicherebbero una permanenza in ciascuno stato di soli 2–3 anni. Con tali valori un ponte nuovo raggiungerebbe lo stato critico in circa 15 anni, una dinamica irrealisticamente rapida rispetto alla realtà infrastrutturale.

2. **Orizzonte temporale di simulazione**:
   - Con un orizzonte limitato (es. 10 anni) si osserva solo la fase iniziale del ciclo di vita.
   - Partendo da un campione di 100 ponti nuovi:

     | Anno | CS1 (Nuovo) | CS2 (Buono) | CS3 (Discreto) | CS4 (Scadente) | CS5 (Critico) |
     | :--- | :---: | :---: | :---: | :---: | :---: |
     | **10** | 30 | 64 | 5 | 0,3 | 0 |
     | **50** | 0,3 | 55 | 30 | 10 | 5 |
     | **100** | 0 | 26 | 29 | 18 | 27 |

   - Nei primi 10 anni quasi l'intera flotta transita o si arresta in CS2 (difetti lievi e non strutturali). Gli stati più severi (CS4 e CS5) si popolano in modo consistente solo dopo 30–100 anni. Impostando l'orizzonte temporale a 100–125 anni è possibile apprezzare l'intero ciclo di vita.

3. **Fattori ambientali e climatici**:
   - I dati della Florida riflettono un ambiente favorevole senza impiego di sali disgelanti.
   - In contesti caratterizzati da cicli di gelo-disgelo e applicazione massiccia di sali antigelo (es. Nord Italia, Appennino), il degrado reale è sensibilmente più accelerato. I valori attuali rappresentano pertanto uno scenario tendenzialmente favorevole/ottimistico.

4. **Caratteristiche e limiti delle Catene di Markov stazionarie**:
   - Nelle catene di Markov discrete omogenee, il decremento iniziale (CS1 → CS2) inizia fin dal primo anno. Nella realtà fisica, le strutture nuove presentano spesso un periodo iniziale di latenza prima dell'innesco dei difetti. Report specialistici (come quello del FDOT) correggono questo comportamento applicando fattori correttivi basati su distribuzioni di Weibull.
   - Per simulare uno scenario più aggressivo, si potrebbero dimezzare i tempi mediani di transizione, portando i coefficienti sulla diagonale principale approssimativamente a: `0.787 / 0.971 / 0.962 / 0.942`.
