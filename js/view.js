"use strict";

class View {
constructor() {
    this.todayLabel = document.getElementById("todayLabel");
}
    render(value) {
        this.todayLabel.innerText = value;
    }
}