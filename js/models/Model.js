import DataStorage from "./DataStorage.js"; //importuje třídu pro práci s daty
import CalendarCalculator from "./CalendarCalculator.js"; //importuje třídu pro práci s kalendářem


//Třída Model zajišťuje zpracování dat a jejich přípravu pro View
export default class Model {
  constructor() {
    this.dataStorage = new DataStorage();
  }

  //Vrací kalendářní data pro View
  getCalendarData() {
    this.calendar = new CalendarCalculator();

    return {
      todayLabel: this.calendar.todayLabel,
      monthName: this.calendar.monthName,
      month: this.calendar.month,
      remainingDaysInMonth: this.calendar.remainingDaysInMonth,
    };
  }

  //Načte a vrací VHC data pro View
  async fetchVHCData() {
    await this.dataStorage.fetchData();
    const calendar = new CalendarCalculator();
    const goal = this.dataStorage.getGoal(
      calendar.month,
      calendar.year
    );
    const sentVHC = this.dataStorage.getSentVHC(
      calendar.month,
      calendar.year
    );
    const remainingVHC = this.dataStorage.getRemainingVHC(
      calendar.month,
      calendar.year
    );
    const vhcDetails = this.dataStorage.getVHCDetails(
      calendar.month,
      calendar.year
    );
    //TODO: Ověřit formát vrácených dat a případně upravit
    return { goal, sentVHC, remainingVHC, vhcDetails };
  }

  //Odeslání nového záznamu o VHC
  async sendVHC(offer, user) {
    const calendar = new CalendarCalculator();
    const data = {
      id: calendar.timeStamp,
      day: calendar.date,
      month: calendar.month,
      year: calendar.year,
      offer: offer,
      user: user
    };
    await this.dataStorage.sendVHC(data);
  }
}