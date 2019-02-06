import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  date: Date;
  firstWeekDay: number;
  currentMonth: number;
  currentYear: number;

  today: Date;

  numberOfDays: number;
  previousMonthNumberOfDays: number;
  nextMonthNumberOfDays: number;

  days = [];
  previousMonthDays = [];
  nextMonthDays = [];
  
  agenda = [];
  previousAgenda = [];
  nextAgenda = [];

  selectedDay: number;
  selectedDate: Date = null;
  selectedTasks = [];

  formMonth: number;
  formYear: number;


  constructor(private calendarService: CalendarService){ }
  
  
  ngOnInit(): void {

    this.date = new Date();
    this.today = new Date();
  
    this.setVariables();

    this.calendarService.initAgenda();
    this.agenda = this.calendarService.getAgenda();

    this.effectivelySelectDay(this.date.getDate());

  } 

  
  setVariables(): void {

    this.numberOfDays = this.getNumberOfDays(this.date.getFullYear(), this.date.getMonth());

    this.firstWeekDay = (new Date(this.date.getFullYear(), this.date.getMonth(), 1)).getDay();

    // The visual rendering index of each week day is different from its index value
    //
    // 'Dom'(Domingo)/'Sun'(Sunday) are rendered on index 6, while its index value is 0
    // 'Seg'(Segunda)/'Mon'(Monday) is rendered on index 0, while its index value is 1
    // 'Ter'(Terça)/'Tue'(Tuesday) is rendered on index 1, while its index value is 2

    this.previousMonthNumberOfDays = this.firstWeekDay == 0 ? 6 : this.firstWeekDay-1;

    this.nextMonthNumberOfDays = 42 - this.numberOfDays - this.previousMonthNumberOfDays;

    this.days = Array.apply(null, {length: this.numberOfDays}).map(Number.call, Number);

    this.setPreviousMonthDays();

    this.nextMonthDays = Array.apply(null, {length: this.nextMonthNumberOfDays}).map(Number.call, Number);

    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();

    this.formMonth = this.currentMonth;
    this.formYear = this.currentYear;
  }


  getNumberOfDays(year, month){
    let date = new Date(year, month+1, 0);
    return date.getDate();
  }

  setPreviousMonthDays(){    
    let month = this.date.getMonth() == 0 ? 11 : this.date.getMonth()-1;
    let previousMonthTotalNumberOfDays = this.getNumberOfDays(this.date.getFullYear(), month);
    this.previousMonthDays = [];
    for (var i = previousMonthTotalNumberOfDays-this.previousMonthNumberOfDays; i < previousMonthTotalNumberOfDays; i++) {
      this.previousMonthDays.push(i);
    }
  }




  goToPreviousMonth(): void {
    var year, month;
    let currentYear = this.date.getFullYear();
    let currentMonth = this.date.getMonth();

    year = currentMonth==0 ? currentYear-1 : currentYear;
    month = currentMonth==0 ? 11 : currentMonth-1;

    this.date = new Date(year, month);
    this.setVariables();
  }

  goToNextMonth(): void {
    var year, month;
    let currentYear = this.date.getFullYear();
    let currentMonth = this.date.getMonth();

    year = currentMonth==11 ? currentYear+1 : currentYear;
    month = currentMonth==11 ? 0 : currentMonth+1;

    this.date = new Date(year, month);
    this.setVariables();
  }

  goToDate(): void {
    let year = this.formYear;
    let month = this.formMonth;

    this.date = new Date(year, month);
    this.setVariables();
  }




  selectDay(day): void {
    if (this.hasTasks(this.currentYear, this.currentMonth, day)){
      this.selectedDay = day;
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.selectedTasks = this.calendarService.getTasks(this.currentYear, this.currentMonth, day);
    }
  }

  effectivelySelectDay(day): void {
    this.selectedDay = day;
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.selectedTasks = this.calendarService.getTasks(this.currentYear, this.currentMonth, day);
  }

  getAgenda(): void {

  }

  hasTasks(year, month, day): boolean {
    for (var i in this.agenda){
      let date = this.agenda[i].date;
      if (date==`${year}_${month}_${day}`)
        return true;
    }
    return false;
  }




  isWeekend(day, relative): boolean{
    var year, month;
    let currentYear = this.date.getFullYear();
    let currentMonth = this.date.getMonth();

    switch (relative){
      case -1 : {
        year = currentMonth==0 ? currentYear-1 : currentYear;
        month = currentMonth==0 ? 11 : currentMonth-1;
        break;
      }
      case 0 : {
        year = currentYear;
        month = currentMonth;
        break;
      }
      case 1 : {
        year = currentMonth==11 ? currentYear+1 : currentYear;
        month = currentMonth==11 ? 0 : currentMonth+1;
        break;
      }
    }

    let dayOfWeek = new Date(year, month, day).getDay();
    return (dayOfWeek == 5 || dayOfWeek == 6) ? true : false;
  }



  getVerboseDay(date){
    switch (date.getDay()){
      case 0: return 'Dom';
      case 1: return 'Seg';
      case 2: return 'Ter';
      case 3: return 'Qua';
      case 4: return 'Qui';
      case 5: return 'Sex';
      case 6: return 'Sab';
    }
  }

  getVerboseMonth(date){
    switch (date.getMonth()){
      case 0: return 'Jan';
      case 1: return 'Fev';
      case 2: return 'Mar';
      case 3: return 'Abr';
      case 4: return 'Mai';
      case 5: return 'Jun';
      case 6: return 'Jul';
      case 7: return 'Ago';
      case 8: return 'Set';
      case 9: return 'Out';
      case 10: return 'Nov';
      case 11: return 'Dez';
    }
  }

}
