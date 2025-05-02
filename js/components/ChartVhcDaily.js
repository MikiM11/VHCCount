// Komponenta pro vytvoření grafu s denními statistikami VHC

export default class ChartVhcDaily {
  constructor(containerId) {
    this.containerId = containerId;
    this.data = [];
    this.chart = null;
  }

  //metoda pro nastavení dat pro graf
  setData(data) {
    this.data = data;
  }

  //metoda pro vykreslení grafu
  render() {
    const canvas = document.getElementById(this.containerId);
    canvas.setAttribute("height", "500");
    canvas.style.setProperty("height", "500px", "important");
    canvas.style.setProperty("max-height", "500px", "important");
    canvas.style.setProperty("min-height", "500px", "important");
    const ctx = canvas.getContext("2d");

    if (this.chart) {
      this.chart.destroy();
    }

    const datasets = this.data.map((user) => ({
      label: user.user,
      data: Array.from({ length: 31 }, (_, i) => {
        const day = String(i + 1);
        const found = user.data.find((item) => String(item.date) === day);
        return {
          x: day,
          y: found ? found.count : 0,
        };
      }),
      borderColor: user.color,
      backgroundColor: user.color,
      tension: 0.3,
      fill: false,
    }));

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 31 }, (_, i) => String(i + 1)),
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false},
          tooltip: {
            callbacks: {
              title: () => "",
              label: (context) =>
                `${context.dataset.label} – den ${context.label}: ${context.parsed.y} VHC`,
            },
          },
        },
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Datum",
            },
          },
          y: {
            suggestedMin: 0,
            ticks: {
              precision: 0,
            },
            title: {
              display: true,
              text: "Počet VHC",
            },
          },
        },
      },
    });
  }
}
