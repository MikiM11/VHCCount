"use strict";

class Model {
  constructor() {
    //data předávaná controlleru
    this._data = {};
  }
  //připravuje a předává data do controlleru pro zobrazení
  get data() {
    this.calendar = new CalendarCalculator();
    this._data.todayLabel = this.calendar.todayLabel;
    this._data.monthName = this.calendar.monthName;
    this._data.month = this.calendar.month;
    const dataStorage = new DataStorage();
    this._data.goal = dataStorage.getGoal(this.calendar.month);
    return this._data;
  }
}

//načítá a zpracovává data z uložiště
class DataStorage {
  constructor() {
    this.rawData = [
      [
        ["ID", "DAY", "MONTH", "YEAR", "OFFER", "USER"],
        [1715152478221, 8, 5, 2024, "Y", "Miki"],
        [1715152531897, 8, 5, 2024, "N", "Miki"],
        [1715152628994, 8, 5, 2024, "Y", "Miki"],
        [1715152629456, 8, 5, 2024, "N", "Jirka"],
        [1717246409143, 1, 6, 2024, "Y", "Miki"],
        [1717246425616, 1, 6, 2024, "Y", "Jirka"],
        [1717246425616, 1, 6, 2024, "Y", "Miki"],
        [1717246502222, 1, 6, 2024, "Y", "Jirka"],
        [1717246515464, 1, 6, 2024, "Y", "Miki"],
        [1717246527213, 1, 6, 2024, "N", "Jirka"],
        [1717246549559, 1, 6, 2024, "N", "Miki"],
        [1717246560293, 1, 6, 2024, "N", "Jirka"],
        [1717246575869, 1, 6, 2024, "N", "Miki"],
        [1717246589742, 1, 6, 2024, "N", "Jirka"],
        [1721750861144, 23, 1, 2025, "Y", "Miki"],
        [1721751051000, 23, 1, 2025, "N", "Miki"],
        [1721752668000, 23, 1, 2025, "Y", "Jirka"],
        [1721752724000, 23, 1, 2025, "N", "Jirka"],
        [1721752766000, 23, 1, 2025, "Y", "Miki"],
        [1721752873935, 23, 1, 2025, "N", "Miki"],
      ],
      [
        ["MONTH", "YEAR", "GOAL"],
        [5, 2024, 18],
        [6, 2024, 18],
        [7, 2024, 17],
        [8, 2024, 18],
        [1, 2025, 19],
      ],
    ];
  }

  getGoal(month) {
    const filteredData = this.rawData[1].filter(item => item[0] === month);
    return filteredData.length > 0 ? filteredData[0][2] : null;
  }
}

//třída pracující s kalendářem
class CalendarCalculator {
  constructor() {
    this.calDate = new Date(); //dnešní datum
    this.timeStamp = Date.now(); //časová značka
    this.date = this.calDate.getDate(); //dnešní datum
    this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(this.calDate); //dnešní den v českém formátu
    this.monthName = new Intl.DateTimeFormat("cz-CZ", { month: "long" }).format(this.calDate);//aktuální název měsíce v textovém formátu
    this.month = this.calDate.getMonth() + 1; //aktuální měsíc - číslo
    this.year = this.calDate.getFullYear(); //aktuální rok
  }
  //formátované dnešní datum
  get todayLabel() {
    return this.weekDay + " " + this.calDate.toLocaleDateString();
  }
}

//ladící a testovací informace
const Cal = new CalendarCalculator();
console.log(Cal.timeStamp);
const Obj = new Model();
console.log(Obj.data);
const Data = new DataStorage();
console.log(Data.getGoal(Cal.month));