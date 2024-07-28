"use strict";

class Model {
  constructor() {
    //data předávaná controlleru
    this.data = {};
  }

  get getData() {
    //připravuje a předává data do controlleru
    this.dateString = new CalendarCalculator();
    this.data.dateString = this.dateString.todayLabel;
    this.data.monthString = this.dateString.monthName;
    return this.data;
  }
}

//načítá a zpracovává data z uložiště
class LoadData {
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
        [1721750861144, 23, 7, 2024, "Y", "Miki"],
        [1721751051000, 23, 7, 2024, "N", "Miki"],
        [1721752668000, 23, 7, 2024, "Y", "Jirka"],
        [1721752724000, 23, 7, 2024, "N", "Jirka"],
        [1721752766000, 23, 7, 2024, "Y", "Miki"],
        [1721752873935, 23, 7, 2024, "N", "Miki"],
      ],
      [
        ["MONTH", "YEAR", "GOAL"],
        [5, 2024, 18],
        [6, 2024, 18],
        [7, 2024, 17],
        [8, 2024, 18],
        [9, 2024, 19],
      ],
    ];
  }
}

//třída pracující s kalendářem
class CalendarCalculator {
  constructor() {
    this.calDate = new Date(); //dnešní datum
    this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(
      this.calDate
    ); //dnešní den v českém formátu
    this.timeStamp = Date.now();
    this.date = this.calDate.getDate();
    this.month = this.calDate.getMonth();
    this.year = this.calDate.getFullYear();
  }
  //formátované dnešní datum
  get todayLabel() {
    return this.weekDay + " " + this.calDate.toLocaleDateString();
  }
  //textový název měsíce
  get monthName() {
    this.monthNames = [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ];
    return this.monthNames[this.month];
  }
}

//cvičná data
const rawData = [
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
    [1721750861144, 23, 7, 2024, "Y", "Miki"],
    [1721751051000, 23, 7, 2024, "N", "Miki"],
    [1721752668000, 23, 7, 2024, "Y", "Jirka"],
    [1721752724000, 23, 7, 2024, "N", "Jirka"],
    [1721752766000, 23, 7, 2024, "Y", "Miki"],
    [1721752873935, 23, 7, 2024, "N", "Miki"],
  ],
  [
    ["MONTH", "YEAR", "GOAL"],
    [5, 2024, 18],
    [6, 2024, 18],
    [7, 2024, 17],
    [8, 2024, 18],
    [9, 2024, 19],
  ],
];

//ladící informace
const filterData = rawData.map((arr) => arr.filter((arr1) => arr1[2] == 7));
console.log(filterData);
const obj = new Model();
const cal = new CalendarCalculator();
console.log(cal.timeStamp);
console.log(obj.getData);
