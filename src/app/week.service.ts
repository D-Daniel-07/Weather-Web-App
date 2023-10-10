import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(private http:HttpClient) { }

  getWeathers(city:string){
    return this.http.get('https://api.weatherbit.io/v2.0/forecast/daily?city='+city+',NC&key=1cb60913eb8945b7a1a2f12135008714');
  }
}
