"use strict";

class View {
constructor() {
    this.month = document.getElementById("todayLabel");
}
    render(value) {
        this.month.innerText = value;
    }
}