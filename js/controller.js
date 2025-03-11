import Model from "./models/Model.js"; // Import třídy Model - zpracování dat
import View from "./view.js"; // Import třídy View - zobrazování dat

// Třída Controller - řídí komunikaci mezi modelem a view
export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        //! Tady je chyba
        this.view.setSendVHCWithOffer(() => this.handleSendVHC(offer, user));
        this.view.setSendVHCWithoutOffer(() => this.handleSendVHC(offer, user));
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

    //handler pro odeslání dat o VHC, spouští se po kliknutí na tlačítko
    async handleSendVHC(offer, user) {
        await this.model.sendVHC(offer, user);
        this.view.showFlashMessage("VHC bylo úspěšně odesláno", "success");         
        this.startRender();
    }
}

const app = new Controller(new View(), new Model());
app.startRender();
//app.view.saveUserToLocalStorage("Jirka"); //Uložení uživatele do localStorage