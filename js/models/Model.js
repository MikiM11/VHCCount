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
    const VHCDetails = this.dataStorage.getVHCDetails(
      calendar.month,
      calendar.year
    );
    const sentVHCWithOffer = this.dataStorage.getSentVHCWithOffer(
      calendar.month,
      calendar.year
    );
    const sentVHCWithoutOffer = this.dataStorage.getSentVHCWithoutOffer(
      calendar.month,
      calendar.year
    );
    //Zde se volá metoda pro zobrazení detailů o VHC
    //TODO: Dodělat volání statistiky odeslaných VHC
    const VHCDailyStatsByUser = this.dataStorage.getVHCDailyStatsByUser(
      calendar.month,
      calendar.year
    );

    const progressInfo = this.getProgressInfo(goal, sentVHC);

    return { goal, sentVHC, remainingVHC, sentVHCWithOffer, sentVHCWithoutOffer, VHCDetails, VHCDailyStatsByUser, progressInfo };
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

  getProgressInfo(goal, sentVHC) {
    const calendar = new CalendarCalculator();
    const today = calendar.date;
    const daysInMonth = new Date(calendar.year, calendar.month, 0).getDate();

    if (goal > 0) {
      const expected = (today / daysInMonth) * goal;
      const diff = sentVHC - expected;
      const percent = Math.round((sentVHC / expected) * 100);

      return {
        expected: Math.round(expected),
        actual: sentVHC,
        diff: Math.round(diff),
        percent,
        projected: Math.round((sentVHC / today) * daysInMonth)
      };
    }

    return null;
  }
}