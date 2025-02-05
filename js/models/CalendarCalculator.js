//CLASS - třída pracující s kalendářem
export default class CalendarCalculator {
    constructor() {
      this.calDate = new Date(); //objekt s aktuálním datem
      this.timeStamp = Date.now(); //časová značka
      this.date = this.calDate.getDate(); //dnešní datum
      this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(
        this.calDate
      ); //dnešní den v českém formátu
      this.monthName = new Intl.DateTimeFormat("cz-CZ", { month: "long" }).format(
        this.calDate
      ); //aktuální název měsíce v českém formátu
      this.month = this.calDate.getMonth() + 1; //aktuální měsíc - číslo
      this.year = this.calDate.getFullYear(); //aktuální rok
    }
    //formátované dnešní datum
    get todayLabel() {
      return this.weekDay + " " + this.calDate.toLocaleDateString();
    }
    //Vrací počet dní do konce měsíce
    get remainingDaysInMonth() {
      return (new Date(this.year, this.month, 0).getDate()) - this.date;
    }
  }