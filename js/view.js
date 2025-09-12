import FlashNews from "./components/FlashNews.js";
import TableVhcDetails from "./components/TableVhcDetails.js";
import ChartVhcDaily from "./components/ChartVhcDaily.js";
//Třída View - zobrazení dat v HTML
//Tato třída je zodpovědná za vykreslování dat do HTML a interakci s uživatelským rozhraním

export default class View {
  constructor() {
    this.todayLabel = document.getElementById("todayLabel");
    this.remainingDays = document.getElementById("remainingDays");
    this.monthName = document.getElementById("month");
    this.goal = document.getElementById("goal");
    this.sentVHC = document.getElementById("sentVHC");
    this.remainingVHC = document.getElementById("remainingVHC");
    this.spinner = document.getElementById("spinner");
    this.btnWithOffer = document.getElementById("btnWithOffer");
    this.btnWithoutOffer = document.getElementById("btnWithoutOffer");
    this.userName = document.getElementById("user");
    this.details = document.getElementById("detailsButton");
    this.flashNews = new FlashNews("flashNews"); //Komponenta pro zobrazování flash zpráv
    this.tableVhcDetails = new TableVhcDetails("vhcDetails"); //Komponenta pro zobrazení detailů o VHC - Tabulka
    this.ChartVhcDaily = new ChartVhcDaily("vhcChart"); //Komponenta pro zobrazení grafu VHC - Chart
    this.disableButtons(true); //vypnutí tlačítek
    this.disableUserLink(true); //vypnutí odkazu user
    this.disableDetails(true); //vypnutí zobrazení detailů
    this.vhcData = {};  //Objekt pro ukládání dat localStorage
    this.selectUser(); //Metoda pro výběr uživatele po kliknutí na odkaz user
  }

  //Metoda pro uložení uživatele do localStorage
  saveUserToLocalStorage(user) {
    this.vhcData = {user: user};  //Uložení uživatele do objektu 
    localStorage.setItem("VHCData",JSON.stringify(this.vhcData)); //Uložení objektu do localStorage
  }

  //Metoda pro načtení uživatele z localStorage
  loadUserFromLocalStorage() {
    const data = localStorage.getItem("VHCData");
    if (data) {
      this.vhcData = JSON.parse(data);
      return this.vhcData.user;
    }
    return null;
  }
  
  //Metoda pro zapnutí / vypnutí tlačítek
  disableButtons(state) {
    this.btnWithOffer.disabled = state;
    this.btnWithoutOffer.disabled = state;
}

//Metoda pro znepřístupnění odkazu - linku ID=user
disableUserLink(state) {
  this.userName.style.pointerEvents = state ? "none" : "auto";
  this.userName.style.opacity = state ? "0.5" : "1"; // Vizuální zeslabení odkazu
}

disableDetails(state) {
  this.details.disabled = state;
}

  // Metoda pro nastavení události tlačítka pro odeslání VHC s nabídkou
  setSendVHCWithOffer(handler) {
    this.btnWithOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      this.disableButtons(true);
      this.disableUserLink(true);
      handler("Y", this.userName.innerText); //Y je Yes, tedy nabídka, this.userName.innerText je jméno uživatele
    });
  }
  // Metoda pro nastavení události tlačítka pro odeslání VHC bez nabídky
  setSendVHCWithoutOffer(handler) {
    this.btnWithoutOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      this.disableButtons(true);
      this.disableUserLink(true);
      handler("N", this.userName.innerText); //N je No, tedy bez nabídky, this.userName.innerText je jméno uživatele  
    });
  };

  //Metoda pro výběr a změnu uživatele po kliknití na odkaz user
  selectUser() {
    this.userName.addEventListener("click", (e) => {
      e.preventDefault();
      const user = prompt("Zadejte jméno uživatele");
      if (user) {
        this.saveUserToLocalStorage(user);
        this.userName.innerText = user;
        this.disableButtons(false);
      }
    });
  }

  //Metoda pro vykreslení kalendářních dat
  renderCalendar(data) {
    this.spinner.style.visibility = "visible";
    this.todayLabel.innerText = data.todayLabel;
    this.monthName.innerText = data.monthName;
    this.remainingDays.innerText = data.remainingDaysInMonth;
  }

  //Metoda pro vykreslení statistik VHC
  updateVHCStats(data) {
    this.goal.innerText = data.goal;
    this.sentVHC.innerText = data.sentVHC;
    this.remainingVHC.innerText = data.remainingVHC;
    this.spinner.style.visibility = "hidden";
    //pokud existuje uživatel v localStorage, zobrazí se jeho jméno a povolí se tlačítka
    if (this.loadUserFromLocalStorage()) {
      this.userName.innerText = this.loadUserFromLocalStorage();
      this.disableButtons(false); //zapne tlačítka
      this.disableUserLink(false); //zapne odkaz user
    }
    else {
      this.disableButtons(true); //vypne tlačítka
      this.disableUserLink(false); //zapne odkaz user
  }
  if (data.VHCDetails.length > 0) {
    // Tabulka s detaily VHC
    this.tableVhcDetails.setData(data.VHCDetails);
    this.tableVhcDetails.render();
    // Graf s denními statistikami podle uživatelů
    this.ChartVhcDaily.setData(data.VHCDailyStatsByUser);
    this.ChartVhcDaily.render();
    this.disableDetails(false);
    // Zobrazení informací o progresu do #vhcChartInfo
    const info = document.getElementById("vhcChartInfo"); // Získání elementu pro zobrazení informací o progresu
    info.classList.remove("text-success", "text-danger", "text-muted"); // Odstranění předchozích tříd pro barvu textu

    if (data.progressInfo) {
      // Pokud jsou k dispozici informace o progresu
      const { expected, actual, diff, percent, projected } = data.progressInfo; // Destrukturalizace dat o progresu

      // Určení trendu na základě rozdílu mezi očekávaným a skutečným počtem VHC
      const trend =
        diff >= 0
          ? `Jste nad plánem o ${diff} VHC (+${percent - 100}\u202F%).` // Pokud je rozdíl kladný, uživatel je nad plánem
          : `Jste ${Math.abs(diff)} VHC pod plánem (\u2212${100 - percent}\u202F%).`; // Pokud je rozdíl záporný, uživatel je pod plánem

      // Nastavení textu s informacemi o progresu
      info.innerText = `K dnešnímu dni byste měli mít ${expected} VHC. ${trend} Pokud bude tempo stejné, do konce měsíce odešlete přibližně ${projected} VHC.`;

      // Přidání třídy pro barvu textu na základě trendu (zelená pro nad plánem, červená pro pod plánem)
      info.classList.add(diff >= 0 ? "text-success" : "text-danger");
    } else {
      // Pokud nejsou k dispozici informace o progresu
      info.innerText = "Cíl pro tento měsíc není nastaven."; // Zobrazení výchozí zprávy
      info.classList.add("text-muted"); // Nastavení neutrální barvy textu
    }
  } else {
    this.disableDetails(true);
  }
}

  //Metoda pro zobrazení flash zprávy
  showFlashMessage(message, type = "info", timeout = 3000) {
    this.flashNews.showMessage(message, type, timeout);
  }
}