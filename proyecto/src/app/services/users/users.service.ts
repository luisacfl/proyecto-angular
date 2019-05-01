import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/Usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private lastId = 1;
  cambiaDato = new Subject<Usuario[]>();
  users: Usuario[] = [
    new Usuario(this.lastId++, 'Administrador', '', 'admin', 'pass123', 0),
    new Usuario(this.lastId++, 'Organización Ejemplo 1', '', 'orgej1', 'contra123', 1),
    new Usuario(this.lastId++, 'Jesus', 'Sandoval', 'jesus12', 'durango23', 2),
    new Usuario(this.lastId++, 'Maria', 'Ortiz', 'mariao', '123maria', 2),
    new Usuario(this.lastId++, 'Organización Ejemplo 2', '', 'orgej2', 'contra123', 1),
    new Usuario(this.lastId++, 'Organización Ejemplo 3', '', 'orgej3', 'contra123', 1),
    new Usuario(this.lastId++, 'Juan', 'Perez', 'juanito', '123eljuan', 3),
    new Usuario(this.lastId++, 'Pedro', 'Ruiz', 'pedror94', 'contra12', 3),
    new Usuario(this.lastId++, 'Karla', 'Sandoval', 'karla1992', '123karlacontra', 3),
  ];
  constructor() { }
  addUser(user: Usuario): boolean {
    user.id = this.lastId++;
    const u = this.users.find((us)=> us.nombre.toUpperCase() === user.nombre.toUpperCase());
    if (u) { //existe alumno
      this.lastId--;
      return false;
    }
    this.users.push(Object.assign({}, user)); //creamos una copia
    this.notificarCambios();
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
