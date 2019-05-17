import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }

  
  private token = '';
  private tipo = 4;


  isAuthenticated(){
    return this.token.length > 0;
  }

  logout(){
    this.token = '';
  }

  login(email:string, password:string ) {
    this.token ='activo';
    return this.http.post<Usuario>('/api/user/login', {email, password});
        // this is just the HTTP call, 
        // we still need to handle the reception of the token

  }

}
