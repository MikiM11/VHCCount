import Model from "./models/Model.js";
import View from "./view.js";

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
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
}

const app = new Controller(new View(), new Model());
app.startRender();