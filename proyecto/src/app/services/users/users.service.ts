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
    new Usuario(this.lastId++, 'Administrador', '', 'admin', 'pass123','luisa.fl.97@gmail.com', 0),
    new Usuario(this.lastId++, 'Organización Ejemplo 1', '', 'orgej1','org@poramoraellxs.com', 'contra123', 1),
    new Usuario(this.lastId++, 'Jesus', 'Sandoval', 'jesus12', 'durango23','j.sandoval@gmail.com', 2),
    new Usuario(this.lastId++, 'Maria', 'Ortiz', 'mariao', '123maria','maria@hotmail.com', 2),
    new Usuario(this.lastId++, 'Organización Ejemplo 2', '', 'orgej2','org22@zonadocs.com', 'contra123', 1),
    new Usuario(this.lastId++, 'Organización Ejemplo 3', '', 'orgej3','org3@fundacionfind.com', 'contra123', 1),
    new Usuario(this.lastId++, 'Juan', 'Perez', 'juanito', '123eljuan','juanp@gmail.com', 3),
    new Usuario(this.lastId++, 'Pedro', 'Ruiz', 'pedror94', 'contra12','pedror94@hotmail.com', 3),
    new Usuario(this.lastId++, 'Karla', 'Sandoval', 'karla1992', 'sandoval92@gmail.com','123karlacontra', 3),
  ];
  constructor() { }
  addUser(user: Usuario): boolean {
    user.id = this.lastId++;
    const u = this.users.find((us)=> us.usuario.toUpperCase() === user.usuario.toUpperCase());
     
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
