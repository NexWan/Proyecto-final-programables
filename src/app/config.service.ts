import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basurero } from '../../types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url:any = "api/"
  constructor(private http: HttpClient) {}

  getBasureros(): Observable<basurero[]>{
    let x = this.http.get<basurero[]>(this.url + "basureros")
    return x;
  }
}
