import { Component, Input, OnInit } from '@angular/core';
import { WeekService } from '../week.service';
import { subscribeOn } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() cityName: any;

  myWeather: any;
  currentIndex: number = 0;
  temperature: number = 0;
  feelsLikeTemperature: number = 0;
  pressure: number = 0;
  summary: string = '';
  humidity: number = 0;
  iconURL: string = '';
  name: string = '';
  windspeed: number = 0;
  date: string='';
  day:string='';
  prevbtn:string='';
  nextbtn:string='';


  getDayofWeek(dateString:string):string{
    const dateObject = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = dateObject.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  next() {
    if (this.currentIndex < this.myWeather.data.length - 1) {
      this.currentIndex++;
      this.updateWeatherData();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateWeatherData();
    }
  }

  constructor(private weatherService: WeekService) {}

  ngOnInit() {
    this.weatherService.getWeathers(this.cityName).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.updateWeatherData();
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  private updateWeatherData() {
    const data = this.myWeather.data[this.currentIndex];
    if(this.currentIndex >0){
      this.prevbtn='<';
    }
    else{
      this.prevbtn='';
    }
    if(this.currentIndex === 15){
      this.nextbtn='';
    }
    else{
      this.nextbtn='>';
    }
    this.temperature = Math.round(data.temp);
    this.feelsLikeTemperature = Math.round(data.vis);
    this.humidity = data.rh;
    this.summary = data.weather.description;
    this.pressure = Math.round(data.pres * 0.02952998057228486);
    this.windspeed = data.wind_spd;
    this.date=data.valid_date;
    this.day=this.getDayofWeek(data.valid_date);
    this.iconURL = 'https://www.weatherbit.io/static/img/icons/' + data.weather.icon + '.png';
  }
}
