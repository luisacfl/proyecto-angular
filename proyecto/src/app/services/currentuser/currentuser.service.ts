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

  constructor(private http: HttpClient) { }

  login(usuario: Usuario){
    this.user = usuario;
    console.log(this.user);
    this.modo=this.user.tipo;
    this.notificarCambios();
    return this.http.post<Usuario>(this.userURL+'/login',usuario)
    .subscribe(data => console.log(data));
  }

  logout(){
    this.modo=-1;
    delete this.user;
  }

  notificarCambios() {
    this.cambiaDato.next(this.user);
}
}
