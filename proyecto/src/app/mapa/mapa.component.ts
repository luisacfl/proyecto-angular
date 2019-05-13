import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from '../services/currentuser/currentuser.service';
import { Usuario } from '../Usuario';
import { DesapService } from '../services/desap/desap.service';
import { Desaparecidx } from '../Desaparecidx';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  //Parametros iniciales del mapa
  zoom: number = 8;
  title: string = 'Mapa de Personas Desaparecidas';
  lat: number = 22.5208046;  //centro de México
  lng: number = -120.9572822;

  modo: number;
  user: Usuario;
  desaparecidxs: any = [];
  marcadores = [];
  constructor(private currentUserService: CurrentuserService,
    private desapService: DesapService
    ) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    if (this.user == undefined){
      this.modo = -1;
    } else {
      this.modo = this.user.tipo;
    }
    this.desaparecidxs = [];
    this.desapService.getDesaparecidxs()
    .subscribe((data: {}) => {
      console.log(data);
      this.desaparecidxs = data;
      for (let data in this.desaparecidxs) {
        this.marcadores.push({
          lat: this.desaparecidxs[data].lat,
          long: this.desaparecidxs[data].long,
        });
      }
    });
  }

}
