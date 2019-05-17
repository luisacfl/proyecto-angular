import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-desaparecido-detalle',
  templateUrl: './desaparecido-detalle.component.html',
  styleUrls: ['./desaparecido-detalle.component.css']
})
export class DesaparecidoDetalleComponent implements OnInit {

  modo: number;
  user: Usuario;
  id: number;
  desaparecidx: Desaparecidx;
  private subscript: Subscription;
  private desapSubscription: Subscription;
  private desap: Desaparecidx[];
  constructor(private route: ActivatedRoute,
    private desapService: DesapService,
    private location: Location,
    private router: Router,
    private currentUserService: CurrentuserService,
    private userService: UsersService) { }

  ngOnInit() {

    this.user = this.currentUserService.user;

    this.subscript = this.currentUserService.cambiaDato
    .subscribe(
      (user: Usuario) => {
        this.user = user;
      }
    );

    if (this.user == undefined){
      this.modo = -1;
    } else {
      this.modo = this.user.tipo;
    }
    this.subscript = this.desapService.cambiaDato
      .subscribe(
        (des: Desaparecidx[]) => {
          this.desap = des;
        }
      );
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
      }
    );
    this.desaparecidx = this.desapService.desaparecidos.find(u => u.id == this.id);
    //console.log(this.desaparecidx);
    console.log(this.modo);

  }

  seguir() {
    console.log("user id"+this.user.id);
    console.log("desap id"+this.id);
    this.userService.addSubs(this.user.id, this.id);
  }

  regresar() {
    this.location.back();
  }
}
