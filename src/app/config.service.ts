import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { basurero } from '../../types';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  url:any = "api/"
  constructor(private http: HttpClient) {}

  getBasureros(): Observable<basurero[]> {
    return interval(1000).pipe( //Literalmente se ejecuta cada segundo XD, pero como es local me vale 
      switchMap(() => this.http.get<basurero[]>(this.url + "basureros"))
    );
  }

  getAllData(): Observable<basurero[]> {
    return this.http.get<basurero[]>(this.url + "basureros");
  }
}
