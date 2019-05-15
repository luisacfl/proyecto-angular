import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';

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

  constructor(private route: ActivatedRoute,
    private desapService: DesapService,
    private location: Location,
    private router: Router,
    private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.getDesaparecidx();
    
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
    console.log(this.user);
  }

  getDesaparecidx() {
    this.route.params.subscribe(
      (params) => {
        this.id = params.id;
        this.desapService.getDesaparecidx(this.id).subscribe(desap => {
          console.log(desap);
          this.desaparecidx = desap;
        });
      }
    );
  }

  seguir(){
    
  }

  regresar() {
    this.location.back();
  }
}
