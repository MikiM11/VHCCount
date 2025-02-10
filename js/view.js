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
  }

  bindSendVHCWithOffer(handler) {
    this.btnWithOffer.addEventListener("click", () => {
      handler("Y");
    });
  }

  bindSendVHCWithoutOffer(handler) {
    this.btnWithoutOffer.addEventListener("click", () => {
      handler("N");
    });
  }

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
}