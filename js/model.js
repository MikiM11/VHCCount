"use strict";

class Model {
    constructor() {
        //data předávaná controlleru
        this.data = []    
    }

    get getData() { //připravuje a předává data do controlleru
        this.dateString = new CalendarCalculator();
        return this.dateString.todayLabel;
    }
}

class CalendarCalculator {
    constructor (){
        this.calDate = new Date(); //dnešní datum
        this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(this.calDate);//dnešní den
        
    }

    get todayLabel() {
        return this.weekDay + " " + this.calDate.toLocaleDateString(); //formát dnešního dne
    }
}

rawData = [
        [ 'ID', 'DAY', 'MONTH', 'YEAR', 'OFFER', 'USER' ],
        [ 1715152478221, 8, 5, 2024, 'Y', 'Miki' ],
        [ 1715152531897, 8, 5, 2024, 'N', 'Miki' ],
        [ 1715152628994, 8, 5, 2024, 'Y', 'Miki' ],
        [ 
        [ 'MONTH', 'YEAR', 'GOAL' ],
        [ 5, 2024, 18 ],
        [ 6, 2024, 18 ]
        ]];