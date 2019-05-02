import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/Usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {
  cambiaDato= new EventEmitter<Usuario>();
  user: Usuario;

  constructor() { }

  login(usuario: Usuario){
    this.user = usuario;
    console.log(this.user);
  }

  notificarCambios() {
    this.cambiaDato.emit(this.user);
    console.log("aaaa")
}
}
