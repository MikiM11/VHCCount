import FlashNews from "./components/FlashNews.js";
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
    this.flashNews = new FlashNews("flashNews"); //Komponenta pro zobrazování flash zpráv
    this.disableButtons(true); //vypnutí tlačítek
    this.vhcData = {};  //Objekt pro ukládání dat localStorage
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

  // Metoda pro nastavení události tlačítka pro odeslání VHC s nabídkou
  setSendVHCWithOffer(handler) {
    this.btnWithOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      this.disableButtons(true);
      handler();
    });
  }
  // Metoda pro nastavení události tlačítka pro odeslání VHC bez nabídky
  setSendVHCWithoutOffer(handler) {
    this.btnWithoutOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      this.disableButtons(true);
      handler();
    });
  };

  //Metoda pro výběr a změnu uživatele po kliknití na odkaz user
  //!! Dodělat - nefunguje 
  selectUser() {
    this.userName.addEventListener("click", (e) => {
      e.preventDefault();
      const user = prompt("Zadejte jméno uživatele");
      if (user) {
        this.saveUserToLocalStorage(user);
        this.userName.innerText = user;
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
      this.disableButtons(false);
    }
  }

  //Zobrazí flash zprávu
  showFlashMessage(message, type = "info", timeout = 5000) {
    this.flashNews.showMessage(message, type, timeout);
  }
}