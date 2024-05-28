"use strict";

class Model {
    constructor() {
        //data předávaná controlleru
        this.data = [];    
    }

    get getData() { //připravuje a předává data do controlleru
        this.dateString = new CalendarCalculator();
        return this.dateString.todayLabel;
    }
}

class CalendarCalculator {
    constructor (){
        this.calDate = new Date(); //dnešní datum
        this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(this.calDate); //dnešní den
        this.date = this.calDate.getDate();
        this.month = this.calDate.getMonth();
        this.year = this.calDate.getFullYear();
    }

    get todayLabel() {
        return this.weekDay + " " + this.calDate.toLocaleDateString(); //formát dnešního dne
    }
}

const rawData = [
    [ [ 'ID', 'DAY', 'MONTH', 'YEAR', 'OFFER', 'USER' ],
[ 1715152478221, 8, 5, 2024, 'Y', 'Miki' ],
[ 1715152531897, 8, 5, 2024, 'N', 'Miki' ],
[ 1715152628994, 8, 5, 2024, 'Y', 'Miki' ],
[ 1715152629456, 8, 5, 2024, 'N', 'Jirka' ] ],
[ [ 'MONTH', 'YEAR', 'GOAL' ], [ 5, 2024, 18 ], [ 6, 2024, 18 ] ] 
];

const filterData = rawData.map(arr => arr.filter(arr1 => arr1[2] == 5));
console.log(filterData);