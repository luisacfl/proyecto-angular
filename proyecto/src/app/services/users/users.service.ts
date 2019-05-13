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
  users: Usuario[];
  constructor() { }
  addUser(user: Usuario): boolean {
    /*user.id = this.lastId++;
    const u = this.users.find((us)=> us.usuario.toUpperCase() === user.usuario.toUpperCase() 
                                    || us.correo.toLowerCase() === user.correo.toLowerCase());
    if (u) { //existe usuario ó existe su correo
      this.lastId--;
      return false;
    }
    this.users.push(Object.assign({}, user)); //creamos una copia
    this.notificarCambios();
    console.log(user);
    return true;*/
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
