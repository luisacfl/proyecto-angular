import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from '../services/currentuser/currentuser.service';
import { Usuario } from '../Usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapsed = false;
  user: Usuario;
  modo:number;
  private subscript: Subscription;
  constructor(private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    this.subscript = this.currentUserService.cambiaDato
      .subscribe(
        (user: Usuario) => {
           this.user = user;
        }
    );
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
  }

  l(){
    console.log(this.user);
  }



}
