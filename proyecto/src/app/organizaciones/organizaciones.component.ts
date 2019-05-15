import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Usuario';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-organizaciones',
  templateUrl: './organizaciones.component.html',
  styleUrls: ['./organizaciones.component.css']
})
export class OrganizacionesComponent implements OnInit {
  users: any = [];
  private subscript: Subscription;

  constructor(private usersService:UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.users = this.usersService.getUsers();
    this.subscript = this.usersService.cambiaDato
      .subscribe(
        (arregloUsuarios: Usuario[]) => {
          this.users = arregloUsuarios;
        }
      );
  }

  

}
