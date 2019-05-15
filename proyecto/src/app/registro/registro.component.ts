import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  id: number;
  user:Usuario;
  error: boolean;
  users: any =[];
  contra: string;

  errorName: boolean;
  errorPass: boolean;
  errorMail: boolean;
  checkpass: string;

  private subscript: Subscription;

  constructor( private route: ActivatedRoute,
               private usersService: UsersService,
               private location: Location,
               private router: Router) { }

  ngOnInit() {
    this.users = this.usersService.getUsers();
    this.usersService.getUsers()
      .subscribe((data: {}) => {
        console.log(data);
        this.users = data;
      });

    this.subscript = this.usersService.cambiaDato.subscribe((arregloUsers: Usuario[]) => {
      this.users = arregloUsers;
    });
    this.error = false;
    this.errorName = false;
    this.errorPass = false;
    this.errorMail = false;
    this.user = new Usuario (0,'','','','',3,'',[]);
  }
  submit(formulario: NgForm){
    console.log("submit ENTRA");
    console.log(this.user);
    console.log(this.usersService.getUsers());
    if(!this.usersService.addUser(this.user)){
      this.error = true;
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  cancelar(){
    this.location.back();
  }
  checkPassword(){
    if(this.checkpass!==this.user.contrasena){
      this.errorPass=true;
    }
    else {
      this.errorPass=false;
    }
  }
  checkName(){
    if(this.user.nombre.length<2){
      this.errorName=true;
    }
    else {
      this.errorName=false;
    }
  }
  checkMail(){
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(this.user.email)) {
      this.errorMail=false;
    }else {
      this.errorMail = true;
    }
  }
  checkAll(){
    return (this.error===true || this.errorMail===true || this.errorName===true
        || this.errorPass===true);
  }
  cambiosTipo(){
    console.log(this.user.tipo);
  }
}
