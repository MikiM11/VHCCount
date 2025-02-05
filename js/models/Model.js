import DataStorage from "./DataStorage.js";
import CalendarCalculator from "./CalendarCalculator.js";

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

    return { goal, sentVHC, remainingVHC };
  }
}