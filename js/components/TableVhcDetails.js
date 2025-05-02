//Komponenta pro zobrazení detailů o VHC odeslaných jednotlivými uživateli

export default class TableVhcDetails {
  constructor(containerID) {
    this.containerID = document.getElementById(containerID);
    this.table = document.createElement("table");
    this.table.className = "table";
    this.table.id = "vhcDetailsTable";
    this.containerID.appendChild(this.table);
    this.data = []; // Inicializace dat
  }

  // Metoda pro nastavení dat do tabulky
  setData(data) {
    this.data = data;
    this.render();
  }

  // Metoda pro vykreslení tabulky
  render() {
    this.table.innerHTML = ""; // Vymazání předchozího obsahu tabulky
    const thead = document.createElement("thead");
    this.table.appendChild(thead);
    const headerRow = document.createElement("tr");
    const headers = ["Kdo", "Celkem", "S nabídkou", "Bez nabídky"];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    const tbody = document.createElement("tbody");
    this.data.map((item) => {
      const row = document.createElement("tr");
      const userCell = document.createElement("td");
      userCell.textContent = item.user;
      row.appendChild(userCell);
      const totalCell = document.createElement("td");
      totalCell.textContent = item.totalVHC;
      row.appendChild(totalCell);
      const withOfferCell = document.createElement("td");
      withOfferCell.textContent = item.totalVHCWithOffer;
      row.appendChild(withOfferCell);
      const withoutOfferCell = document.createElement("td");
      withoutOfferCell.textContent = item.totalVHCWithoutOffer;
      row.appendChild(withoutOfferCell);
      [userCell, totalCell, withOfferCell, withoutOfferCell].forEach(td => { //nastavení barev buněk podle uživatele 
        td.style.color = item.userColor;
      });
      tbody.appendChild(row);
    });
    
    thead.appendChild(headerRow);
    this.table.appendChild(tbody);
  }
};
