import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  id: number;
  user:Usuario;
  error: boolean;
  errorName: boolean;
  errorPass: boolean;
  errorMail: boolean;
  checkpass: string;

  constructor( private route: ActivatedRoute,
               private usersService: UsersService,
               private location: Location,
               private router: Router) { }

  ngOnInit() {
    this.error = false;
    this.errorName = false;
    this.errorPass = false;
    this.errorMail = false;
    this.user = new Usuario (0,'','','','',3,'',[]);
  }
  submit(formulario: NgForm){
    console.log("submit");
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
