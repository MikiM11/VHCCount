"use strict";

class View {
    constructor() {
        this.todayLabel = document.getElementById("todayLabel");
        this.monthName = document.getElementById("month");
    }
    render(value) {
        this.todayLabel.innerText = value.dateString;
        this.monthName.innerText = value.monthString;
    }
}