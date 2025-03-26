import { GOOGLE_SHEET_URL } from "../config.js"; // Import cesty k datům

//CLASS - načítá a zpracovává data z uložiště
export default class DataStorage {
  constructor() {
    this.rawData = []; // Pole pro načtená data
  }

  //stažení dat z URL
  async fetchData() {
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
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

  //TODO: získání detailů o VHC pro daný měsíc a rok, celkový počet VHC pro jednotlivé uživatele,
  // a počet s nabídkou a bez nabídky, pro uživatele
  getVHCDetails(month, year) {
    if (!this.rawData[0] || this.rawData[0].length === 0) return []; // Ochrana proti chybě

    // Odstraníme první řádek (hlavičku)
    const vhcRecords = this.rawData[0].slice(1);
    const userColors = this.rawData[2].slice(1); // Data o uživatelích a jejich barvách

    // Filtrování podle měsíce a roku
    const filteredVHC = vhcRecords.filter(
      (record) => record[2] === month && record[3] === year
    );

    // Agregace dat podle uživatele
    const userDetails = {};
    filteredVHC.forEach((record) => {
      const user = record[5]; // Uživatelské jméno
      const hasOffer = record[4] === "Y"; // Nabídka (Y/N)

      if (!userDetails[user]) {
        userDetails[user] = { total: 0, withOffer: 0, withoutOffer: 0, color: null };
      }

      userDetails[user].total += 1;
      if (hasOffer) {
        userDetails[user].withOffer += 1;
      } else {
        userDetails[user].withoutOffer += 1;
      }
    });

    // Přidání barvy uživatelům
    userColors.forEach(([user, color]) => {
      if (userDetails[user]) {
        userDetails[user].color = color;
      }
    });

    // Vrací pole s detaily pro jednotlivé uživatele
    return Object.entries(userDetails).map(([user, details]) => ({
      user, ...details,
    }));
  }

  // Přidání - odeslání nového záznamu do datového úložiště
  async sendVHC(data) {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: formData, // Použití FormData místo JSON
      });

      const responseText = await response.text(); // Načteme odpověď jako text
      console.log("Raw response:", responseText);

      try {
        const result = JSON.parse(responseText); // Zkusíme převést na JSON
        console.log("Odpověď serveru:", result);
        return result;
      } catch (jsonError) {
        console.warn("Nevalidní JSON odpověď:", responseText);
        return { status: "error", message: "Nevalidní odpověď serveru" };
      }
    } catch (error) {
      console.error("Chyba při odesílání dat:", error);
      return { status: "error", message: error.message };
    }
  }
}
