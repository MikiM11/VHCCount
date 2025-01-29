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
    this.rawData = [];
  }

  //stažení dat z adresy URL https://script.google.com/macros/s/AKfycbz9T-wq0IauowCnabGpRkLl-SuuomzrqIVq1JSCOeTNvTz0ZL6xzu5AMkWOBoV8j72HVw/exec
  async fetchData() {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz9T-wq0IauowCnabGpRkLl-SuuomzrqIVq1JSCOeTNvTz0ZL6xzu5AMkWOBoV8j72HVw/exec');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.rawData = data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
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
(async () => {
  const cal = new CalendarCalculator();
  console.log(cal.timeStamp);

  const data = new DataStorage();
  await data.fetchData(); // Čekání na načtení dat
  console.log(data.rawData); // Zobrazení načtených dat
  console.log(data.getGoal(cal.month)); // Zobrazení cíle pro aktuální měsíc

  const obj = new Model();
  console.log(obj.data);
})();
