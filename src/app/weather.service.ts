import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  getWeather(city:string){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' +city+ '&appid=b1e7cf2ed995af3e48c47a63e94e9cf3')
  }
}
