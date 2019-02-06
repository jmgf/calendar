import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }
  
  initAgenda(): void{
    let agenda = [
      { date: '2019_0_29', title: 'Tiiiitle', description: 'Descriiiiption' },
      { date: '2019_0_24', title: 'Some task', description: 'This shall be boring!' },
      { date: '2019_0_24', title: 'Cool stuff', description: 'I will enjoy this activity very much' },
      { date: '2019_1_1', title: 'Radar PSP', description: 'Local: Avenida João Paulo II | 22h00' },
      { date: '2019_1_12', title: 'Aniversário PAI', description: 'Comprar uma prenda de aniversário' },
      { date: '2019_1_19', title: 'Radar PSP', description: 'Local: Avenida Miguel Torga | 15 h00' },      
      { date: '2019_2_16', title: 'This is it', description: 'You\'ll see what\'s coming' },
      { date: '2019_2_23', title: 'Patience', description: 'Just wait for it' },
    ];
    window.localStorage.setItem("agenda", JSON.stringify(agenda));
  }

  insertTask(date, title, description): void{
    let agenda = this.getAgenda();
    agenda.push({date: date, title: title, description: description});
    window.localStorage.setItem("agenda", JSON.stringify(agenda));
  }

  getAgenda(){
    return JSON.parse(window.localStorage.getItem("agenda"));
  }

  getTasks(year: number, month: number, day: number) {
    let agenda = this.getAgenda();
    let tasks = [];
    for (var i in agenda){
      let date = agenda[i].date;
      if (date==`${year}_${month}_${day}`)
        tasks.push(agenda[i]);
    }
    return tasks;
  }

}
