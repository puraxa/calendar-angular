import { Component, OnInit,Input } from '@angular/core';

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
  days: Array<string> = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sat'];
  today:Date;
  @Input()
  Month:number;
  @Input()
  Year:number;
  calendar: Array<any> = [];

 load(){
    this.today = new Date();
    this.Month = this.today.getMonth();
    this.Year = this.today.getFullYear();
    console.log(this.calendar);
    this.displayCalendar();
}
isToday(date):boolean{
    return date == this.today.getDate() && this.Month == this.today.getMonth() && this.Year == this.today.getFullYear();
}
 displayCalendar():void {
    this.calendar.length = 0;
    let daysInMonth:number = this.getDaysInMonth();
    let firstDay:number = new Date(this.Year,this.Month).getDay();
    for(let i = 0; i < firstDay; i++){
        //calendar += `<div class="days"></div>`;
        this.calendar.push("");
    }
    for(let i = 0; i < daysInMonth; i++){
        this.calendar.push((i+1).toString());
        // if(this.today.getMonth() == this.Month && this.today.getDate() == i+1 && this.today.getFullYear() == this.Year){
        //     calendar += `<div class="days today">${i+1}</div>`;
        // }
        // else{
        //     calendar += `<div class="days">${i+1}</div>`;
        // }
    }
    for(let i = 0; i < 6 - new Date(this.Year,this.Month,daysInMonth).getDay(); i++){
        this.calendar.push("");
        //calendar += `<div class="days"></div>`;
    }
    //document.getElementById('calendar').innerHTML = calendar;
    //document.getElementById('displaying-month-year').innerText = `${this.months[this.Month]}, ${this.Year}`;
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
}
