//CLASS - načítá a zpracovává data z uložiště

export default class DataStorage {
    constructor() {
      this.rawData = [];
    }
  
    //stažení dat z URL
    async fetchData() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwNh_ZdMimH3gCMZ5zhwpdqpNyFpXYIIv20mz8Mx2KN8s7F2dyn1SM6cM0LB-FVq1uu7g/exec"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.rawData = data;
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }
    //zjištění cíle pro daný měsíc - vybírá data z druhého pole
    getGoal(month, year) {
      const filteredData = this.rawData[1].filter(
        (item) => item[0] === month && item[1] === year
      );
      return filteredData.length > 0 ? filteredData[0][2] : 0;
    }
    //zjištění počtu odeslaných VHC pro daný měsíc a rok - vybírá data z prvního pole
    getSentVHC(month, year) {
      if (!this.rawData[0] || this.rawData[0].length === 0) return 0; // Ochrana proti chybě
  
      // Odstraníme první řádek (hlavičku)
      const vhcRecords = this.rawData[0].slice(1);
  
      // Filtrování podle měsíce a roku
      const filteredVHC = vhcRecords.filter(
        (record) => record[2] === month && record[3] === year
      );
      return filteredVHC.length; // Vrací počet odeslaných VHC pro daný měsíc a rok
    }
  
    //zjištění zbývajícího počtu VHC pro daný měsíc a rok - odečítá odeslané VHC od cíle
    getRemainingVHC(month, year) {
      const goal = this.getGoal(month, year);
      const sent = this.getSentVHC(month, year);
  
      return Math.max(0, goal - sent); //Zajišťuje, aby výsledek nebyl záporný
    }
  }