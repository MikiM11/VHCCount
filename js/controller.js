import Model from "./models/Model.js"; // Import třídy Model - zpracování dat
import View from "./view.js"; // Import třídy View - zobrazování dat

// Třída Controller - řídí komunikaci mezi modelem a view
export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindSendVHCWithOffer(this.handleSendVHCWithOffer.bind(this));
        this.view.bindSendVHCWithoutOffer(this.handleSendVHCWithoutOffer.bind(this));
    }

    async startRender() {
        try {
            // Načtení a zobrazení kalendářních dat
            const calendarData = this.model.getCalendarData();
            this.view.renderCalendar(calendarData);

            // Asynchronní načtení a zobrazení VHC dat
            const data = await this.model.fetchVHCData();
            this.view.updateVHCStats(data);
        }  
        catch (error) {
            console.error("Chyba při načítání dat:", error);
        }
    }

    async handleSendVHCWithOffer(offer) {
        await this.model.sendVHC(offer);
    }

    async handleSendVHCWithoutOffer(offer) {
        await this.model.sendVHC(offer);
    }
}

const app = new Controller(new View(), new Model());
app.startRender();