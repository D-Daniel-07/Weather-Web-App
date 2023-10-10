import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherWebApp';
  inputShow:boolean=true;
  today:boolean=true;
  week:boolean=false;
  detailsShow:boolean=false;
  todayShow:boolean=false;
  weekShow:boolean=false;
  cityName:any='';
  faMagnifyingGlass:any = faMagnifyingGlass;

  onToday(){
    this.weekShow=false;
    this.todayShow=true;
    this.today=true;
    this.week=false;
  }

  onWeek(){
    this.weekShow=true;
    this.todayShow=false;
    this.week=true;
    this.today=false;
  }
  onOther(){
    this.inputShow=true;
    this.weekShow=false;
    this.detailsShow=false;
  }

  onSearch(){
    if(this.cityName===''){
      alert("Enter a location to continue...");
    }
    else{
      this.inputShow=false;
      this.detailsShow=true;
      this.todayShow=true;
      this.today=true;
      this.week=false;
    }
  }
}
