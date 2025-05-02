// Komponenta pro vytvoření grafu s denními statistikami VHC
// Tato třída využívá knihovnu Chart.js k vykreslení lineárního grafu, který zobrazuje denní statistiky VHC pro jednotlivé uživatele.

export default class ChartVhcDaily {
  // Konstruktor třídy
  // @param {string} containerId - ID HTML elementu <canvas>, do kterého bude graf vykreslen.
  constructor(containerId) {
    this.containerId = containerId; // ID kontejneru pro graf
    this.data = []; // Pole pro ukládání dat grafu
    this.chart = null; // Instance grafu Chart.js
  }

  // Metoda pro nastavení dat pro graf
  // @param {Array} data - Pole obsahující data pro jednotlivé uživatele. Každý uživatel má pole s denními statistikami.
  setData(data) {
    this.data = data; // Uložení dat do instance třídy
  }

  // Metoda pro vykreslení grafu
  render() {
    // Získání elementu <canvas> podle ID
    const canvas = document.getElementById(this.containerId);
    // Nastavení výšky a stylu <canvas>
    canvas.setAttribute("height", "500");
    canvas.style.setProperty("height", "500px", "important");
    canvas.style.setProperty("max-height", "500px", "important");
    canvas.style.setProperty("min-height", "500px", "important");
    const ctx = canvas.getContext("2d"); // Získání 2D kontextu pro vykreslení grafu

    // Zničení existující instance grafu, pokud existuje
    if (this.chart) {
      this.chart.destroy();
    }

    // Příprava datasetů pro graf
    const datasets = this.data.map((user) => ({
      label: user.user, // Jméno uživatele
      data: Array.from({ length: 31 }, (_, i) => {
        const day = String(i + 1); // Den v měsíci (1–31)
        const found = user.data.find((item) => String(item.date) === day); // Vyhledání dat pro daný den
        return {
          x: day, // Osa X - den
          y: found ? found.count : 0, // Osa Y - počet VHC (0, pokud nejsou data)
        };
      }),
      borderColor: user.color, // Barva čáry grafu
      backgroundColor: user.color, // Barva pozadí (nepoužívá se, protože fill je false)
      tension: 0.3, // Hladkost čáry
      fill: false, // Bez vyplnění pod čarou
    }));

    // Vytvoření nového grafu pomocí knihovny Chart.js
    this.chart = new Chart(ctx, {
      type: "line", // Typ grafu - lineární graf
      data: {
        labels: Array.from({ length: 31 }, (_, i) => String(i + 1)), // Popisky osy X (dny 1–31)
        datasets, // Datasety pro jednotlivé uživatele
      },
      options: {
        responsive: true, // Graf je responzivní
        maintainAspectRatio: false, // Nepoužívat pevný poměr stran
        plugins: {
          legend: { display: false }, // Skrytí legendy
          tooltip: {
            callbacks: {
              title: () => "", // Skrytí nadpisu tooltipu
              label: (context) =>
                `${context.dataset.label} – den ${context.label}: ${context.parsed.y} VHC`, // Přizpůsobený text tooltipu
            },
          },
        },
        scales: {
          x: {
            type: "category", // Typ osy X - kategorie
            title: {
              display: true, // Zobrazení názvu osy X
              text: "Datum", // Text názvu osy X
            },
          },
          y: {
            suggestedMin: 0, // Minimální hodnota osy Y
            ticks: {
              precision: 0, // Celá čísla na ose Y
            },
            title: {
              display: true, // Zobrazení názvu osy Y
              text: "Počet VHC", // Text názvu osy Y
            },
          },
        },
      },
    });
  }
}
