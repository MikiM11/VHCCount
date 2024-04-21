"use strict";

class View {
constructor() {
    this.month = document.getElementById("month");
    }

    render(value) {
        this.month.innerText = value;
    }
}