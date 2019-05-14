import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private lastId = 1;
  cambiaDato = new Subject<Usuario[]>();
  modousuario=0;
  users: Usuario[] = [
    new Usuario(this.lastId++, 'Administrador', 'luisa.fl.97@gmail.com', 'pass123','', 0,[]),
    new Usuario(this.lastId++, 'Organización Ejemplo 1', 'org@poramoraellxs.com','contra123', '', 1,[]),
    new Usuario(this.lastId++, 'Jesus', 'j.sandoval@gmail.com', 'durango23','', 2,[]),
    new Usuario(this.lastId++, 'Juan', 'juanp@gmail.com', '123eljuan','', 3,[]),

  ];
  constructor() { }
  addUser(user: Usuario): boolean {
    user.id = this.lastId++;
    const u = this.users.find((us)=> us.email.toLowerCase() === user.email.toLowerCase());
    if (u) { //existe usuario ó existe su correo
      this.lastId--;
      return false;
    }
    this.users.push(Object.assign({}, user)); //creamos una copia
    this.notificarCambios();
    console.log(user);
    return true;
  }
  getNextId(): number {
    return this.lastId;
  }

  getUsers(): Usuario[] {
    return this.users.slice();
  }

  getUser(id: number): Usuario {
    const pos = this.users.findIndex(u => u.id === id);
    return Object.assign({}, this.users[pos]);
  }
  notificarCambios() {
    this.cambiaDato.next(this.users.slice());
  }
  borrarUsuario(id: number): boolean {
    const pos = this.users.findIndex(u => u.id === id);
    if(pos >= 0){
      console.log('usuario borrado');
      this.users.splice(pos,1);
      this.notificarCambios();
      return true;
    }
    return false;
  }
  editUser(user: Usuario) {
    //TODO: buscar que no exista otro alumno con el mismo nombre
    const pos = this.users.findIndex(u => u.id === user.id);
    Object.assign(this.users[pos], user);
    this.notificarCambios();
  }

}
