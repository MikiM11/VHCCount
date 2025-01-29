"use strict";

class View {
    constructor() {
        this.todayLabel = document.getElementById("todayLabel");
        this.monthName = document.getElementById("month");
        this.goal = document.getElementById("goal");
    }
    render(data) {
        this.todayLabel.innerText = data.todayLabel;
        this.monthName.innerText = data.monthName;
        this.goal.innerText = data.goal;
    }
}