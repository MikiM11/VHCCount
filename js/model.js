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

const url = "https://script.google.com/macros/s/AKfycbxk9eEdN1dija4QZaSXM8MQPZgYFdCrm14_gpDbojNiHf7gYPCMeN1_qQDoG6xs1jX1OA/exec"

fetch(url);