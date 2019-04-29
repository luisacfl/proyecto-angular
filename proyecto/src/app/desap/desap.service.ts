import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Desaparecidx } from './Desaparecidx';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DesapService {
  desapUrl = 'http://myjson.com/1e9u58';
  constructor(private http: HttpClient) { 
    
  }
  addDesap(desap: Desaparecidx): Observable<Desaparecidx> {
    return this.http.post<Desaparecidx>(this.desapUrl, desap, httpOptions);
  }
}
