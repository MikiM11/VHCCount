"use strict"

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    startRender() {
        this.view.render(this.model.month);
    }
}

const app = new Controller(new View(), new Model());
app.startRender();