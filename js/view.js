"use strict";

class View {
    constructor() {
        this.todayLabel = document.getElementById("todayLabel");
        this.monthName = document.getElementById("month");
        this.goal = document.getElementById("goal");
        this.sentVHC = document.getElementById("sentVHC");
        this.remainingVHC = document.getElementById("remainingVHC");
    }
    renderCalendar(data) {
        this.todayLabel.innerText = data.todayLabel;
        this.monthName.innerText = data.monthName;
    }
    updateVHCStats(data) {
        this.goal.innerText = data.goal;
        this.sentVHC.innerText = data.sentVHC;
        this.remainingVHC.innerText = data.remainingVHC;
    }
}