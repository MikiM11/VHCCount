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
    
    this.flashNews = new FlashNews("flashNews");
  }

  setSendVHCWithOffer(handler) {
    this.btnWithOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      handler();
    });
  }

  setSendVHCWithoutOffer(handler) {
    this.btnWithoutOffer.addEventListener("click", () => {
      this.spinner.style.visibility = "visible";
      handler();
    });
  };

  renderCalendar(data) {
    this.spinner.style.visibility = "visible";
    this.todayLabel.innerText = data.todayLabel;
    this.monthName.innerText = data.monthName;
    this.remainingDays.innerText = data.remainingDaysInMonth;
  }

  updateVHCStats(data) {
    this.goal.innerText = data.goal;
    this.sentVHC.innerText = data.sentVHC;
    this.remainingVHC.innerText = data.remainingVHC;
    this.spinner.style.visibility = "hidden";
  }

  showFlashMessage(message, type = "info", timeout = 5000) {
    this.flashNews.showMessage(message, type, timeout);
  }
}