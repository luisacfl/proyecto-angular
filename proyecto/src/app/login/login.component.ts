import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { Usuario } from '../Usuario';
import { Router } from '@angular/router';
import { CurrentuserService } from '../services/currentuser/currentuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: string;
contra: string;

users: Usuario[];

  constructor(private usersService: UsersService,
    private router: Router,
    private current: CurrentuserService
    ) { }

  ngOnInit() {
    this.users = this.usersService.getUsers();
    console.log(this.users);
  }

  submit(forma: NgForm) {
    const u = this.users.find((us)=> us.usuario === this.usuario);
  
    if(u == undefined || u.contrasena != this.contra){
      alert("Datos inválidos");
      forma.reset();
    }else{
      alert("Bienvenido " + u.nombre);
      this.current.login(u);
      this.router.navigate(['/home']);
    }
  }

}
