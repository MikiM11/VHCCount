"use strict";

class Model {

    get todayLabel() {
        this.dateString = new CalendarCalculator();
        return this.dateString.todayLabel;
        
    }
}

class CalendarCalculator {
    constructor (){
        this.calCalc = new Date();
        this.weekDay = new Intl.DateTimeFormat("cz-CZ", { weekday: "long" }).format(this.calCalc);
        
    }

    get todayLabel() {
        return this.weekDay + " " + this.calCalc.toLocaleDateString();
    }
}