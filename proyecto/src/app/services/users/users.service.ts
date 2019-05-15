import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Usuario } from 'src/app/Usuario';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl = 'http://localhost:3000/api/user/reg'||'http://localhost:3000/api/user/login';

  cambiaDato = new Subject<Usuario[]>();
  modousuario=0;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.userUrl);
  }

  getUser(id: String): Observable<Usuario> {
    return this.http.get<Usuario>(this.userUrl+'/:' + id);
  }

  addUser(user: Usuario): Observable<Usuario> {
    console.log(user);
    return this.http.post<Usuario>(this.userUrl, user);
  }
  
 /* notificarCambios() {
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
  }*/

}
