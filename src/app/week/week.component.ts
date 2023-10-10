import { Component, Input } from '@angular/core';
import { WeekService } from '../week.service';


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent {
  @Input() cityName:any;

  lists:any[]=[];
  myWeathers:any;
  showWeek:boolean=true;
  showDetails:boolean=false;
  sTemperature:number=0;
  sPressure:number=0;
  sDay:string='';
  sHumidity:number=0;
  sWindspeed:number=0;
  sMax:number=0;
  sMin:number=0;
  sVisibility:number=0;
  sFeelsLike:number=0;
  sClouds:number=0;
  sSeaLevel:number=0;
  sWindDir:number=0;
  sWinGusSpd:number=0;
  prevbtn:string='<';
  nextbtn:string='>';

  name:string='';
  currentPage: number = 1;
  itemsPerPage: number = 5;


onDay(index: number) {
  this.showWeek = false;
  this.showDetails = true;
  
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const adjustedIndex = startIndex + index;
  
  const weatherForDay = this.myWeathers.data[adjustedIndex];

  this.sTemperature = Math.round(weatherForDay.temp);
  this.sWindspeed = weatherForDay.wind_spd;
  this.sPressure = Math.round(weatherForDay.pres);
  this.sMax = Math.round(weatherForDay.max_temp);
  this.sMin = Math.round(weatherForDay.min_temp);
  this.sHumidity = weatherForDay.rh;
  this.sDay = this.getDayofWeek(weatherForDay.valid_date);
  this.sWindDir=weatherForDay.wind_dir;
  this.sWinGusSpd=weatherForDay.wind_gust_spd;
  this.sHumidity=weatherForDay.rh;
  this.sVisibility=weatherForDay.vis;
  this.sFeelsLike=weatherForDay.vis;
  this.sMax=weatherForDay.max_temp;
  this.sMin=weatherForDay.min_temp;
  this.sSeaLevel=weatherForDay.slp;
  this.sClouds=weatherForDay.clouds;

}


  round(x:number){
    return Math.round(x);
  }

  constructor(private WeekService:WeekService){}

  getDayofWeek(dateString:string):string{
    const dateObject = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = dateObject.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  hideDetails(){
    this.showDetails=false;
    this.showWeek=true;
  }

  prev() {
    if (this.currentPage > 1) {
        this.currentPage--;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.lists = this.myWeathers.data.slice(startIndex, endIndex);
    }
}

  next() {
    const totalPages = Math.ceil(this.myWeathers.data.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
        this.currentPage++;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.lists = this.myWeathers.data.slice(startIndex, endIndex);
    }
  }
  
  ngOnInit() {
    this.WeekService.getWeathers(this.cityName).subscribe({
        next: (res) => {
            console.log(res)
            this.myWeathers = res;
            console.log(this.myWeathers);
            this.name = this.myWeathers.city_name;
            this.lists = this.myWeathers.data.slice(0, this.itemsPerPage);

        },
        error: (error) => console.log(error.message),
        complete: () => console.info('API call completed')
    });
}
}
