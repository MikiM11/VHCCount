"use strict"

class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    async startRender() {
        try {
            const data = await this.model.getData();
            this.view.render(data);
        } catch (error) {
            console.error("Chyba při načítání dat:", error);
        }
    }
}

const app = new Controller(new View(), new Model());
app.startRender();