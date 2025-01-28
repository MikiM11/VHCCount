"use strict";

class View {
    constructor() {
        this.todayLabel = document.getElementById("todayLabel");
        this.monthName = document.getElementById("month");
        this.goal = document.getElementById("goal");
    }
    render(value) {
        this.todayLabel.innerText = value.todayLabel;
        this.monthName.innerText = value.monthName;
        this.goal.innerText = value.goal;
    }
}