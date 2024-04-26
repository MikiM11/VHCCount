"use strict";

class Model {

    get toDayLabel() {
        this.dateString = new CalendarCalculator();
        return this.dateString.toDayLabel;
        
    }
}

class CalendarCalculator {
    constructor (){
        this.calCalc = new Date(Date());
        this.options = { weekday: "long" };
        this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(this.calCalc);
    }

    get toDayLabel() {
        return this.weekDay + " " + this.calCalc.toLocaleDateString();
    }
}