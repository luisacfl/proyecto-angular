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
  private subscript: Subscription;
  constructor(private currentUserService: CurrentuserService) { }

  ngOnInit() {
    console.log(this.currentUserService.modo);
    this.subscript = this.currentUserService.cambiaDato
      .subscribe(
        (user: Usuario) => {
          this.user = user;
        }
    );
  }

  logout(){
    this.currentUserService.logout();
  }
}
