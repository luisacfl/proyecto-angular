import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';
import { Subscription } from 'rxjs';

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
    private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.subscript = this.currentUserService.cambiaDato
      .subscribe(
        (user: Usuario) => {
          this.user = user;
        }
    );

    this.subscript =this.desapService.cambiaDato
    .subscribe(
      (des: Desaparecidx[]) => {
        this.desap = des;
      }
  );

    console.log(this.desap);
    
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
      }
    );

    this.desaparecidx=this.desapService.desaparecidos.find(u=>u.id==this.id);

    //console.log(this.desaparecidx);
    this.user = this.currentUserService.user;

    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
  }


  seguir(){
    
  }

  regresar() {
    this.location.back();
  }
}
