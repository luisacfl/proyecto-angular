import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/Usuario';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
  cambiaDato= new Subject<Usuario>();
  user: Usuario;
  modo = -1;
  userURL="http://localhost:3000/api/user";
  private token = '';

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    return this.token.length > 0;
  }

  login(usuario: Usuario){
    this.user = usuario;
    this.modo=this.user.tipo;
    this.notificarCambios();
    console.log(this.user);
    //return this.http.post<Usuario>(this.userURL+'/login',usuario).subscribe(data => console.log(data));
  }

  loginBackend(email:string, password:string, cb ) {
    console.log("email"+email);
    console.log("password"+password);
    this.http.post<Usuario>(this.userURL + '/login', {email, password}).subscribe(
      (data) => {
        console.log("User is logged in");
        this.token = data.token;
        console.log(this.token);
        cb();
      }, (err) => {
        this.token='';
        console.log(err);
      }
    );
        // this is just the HTTP call, 
        // we still need to handle the reception of the token

  }

  logout(usuario:Usuario){
    this.modo=-1;
    delete this.user;
    return this.http.post<Usuario>(this.userURL+'/logout',usuario)
    .subscribe(data => console.log(data));
  }

  notificarCambios() {
    this.cambiaDato.next(this.user);
}
}
