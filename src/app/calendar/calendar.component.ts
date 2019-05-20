import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.load();
  }
  months: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  today:Date;
  Month:number;
  Year:number;
 load(){
    this.today = new Date();
    this.Month = this.today.getMonth();
    this.Year = this.today.getFullYear();
    document.getElementById('displaying-month-year').innerText = `${this.months[this.Month]}, ${this.Year}`;
    this.displayCalendar();
    for(let i = 0; i < 12; i++){
        document.getElementById('month').innerHTML += `
            <option value=${i}>${this.months[i]}</option>
        `;
    }
}

 displayCalendar():void {
    let daysInMonth:number = this.getDaysInMonth();
    let firstDay:number = new Date(this.Year,this.Month).getDay();
    let calendar:string = `
        <div class="days days-text gray">Su</div>
        <div class="days days-text gray">Mo</div>
        <div class="days days-text gray">Tu</div>
        <div class="days days-text gray">We</div>
        <div class="days days-text gray">Th</div>
        <div class="days days-text gray">Fr</div>
        <div class="days days-text gray">Sa</div>`;
    for(let i = 0; i < firstDay; i++){
        calendar += `<div class="days"></div>`;
    }
    for(let i = 0; i < daysInMonth; i++){
        if(this.today.getMonth() == this.Month && this.today.getDate() == i+1 && this.today.getFullYear() == this.Year){
            calendar += `<div class="days today">${i+1}</div>`;
        }
        else{
            calendar += `<div class="days">${i+1}</div>`;
        }
    }
    for(let i = 0; i < 6 - new Date(this.Year,this.Month,daysInMonth).getDay(); i++){
        calendar += `<div class="days"></div>`;
    }
    document.getElementById('calendar').innerHTML = calendar;
    document.getElementById('displaying-month-year').innerText = `${this.months[this.Month]}, ${this.Year}`;
}

 getDaysInMonth():number{
    return new Date(this.Year, this.Month+1, 0).getDate();
}

 previous(){
  this.Month = this.Month-1 < 0 ? 11 : this.Month-1;
  this.Year = this.Month == 11 ? this.Year-1 : this.Year;
  this.displayCalendar();
}

 next():void{
  this.Month = this.Month+1 > 11 ? 0 : this.Month+1;
  this.Year = this.Month == 0  ? this.Year+1 : this.Year;
  this.displayCalendar();
}

 setDate():void{
    let m:string = (<HTMLInputElement>document.getElementById('month')).value;
    this.Month = parseInt(m);
    let y:string = (<HTMLInputElement>document.getElementById('year')).value;
    this.Year = parseInt(y);
    this.displayCalendar();
}
}
