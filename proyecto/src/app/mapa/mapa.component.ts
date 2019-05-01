import { Component, OnInit } from '@angular/core';
import { DesapService } from '../services/desap/desap.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  zoom: number = 8;
  title: string = 'Mapa de Personas Desaparecidas';
  
  //centro de México
  lat: number = 22.5208046;
  lng: number = -120.9572822;

  marcadores = [];

  constructor(private desapService:DesapService) { }

  ngOnInit() {
    this.desapService.getDesaparecidxsObs()
    .subscribe(res=>{
      for(let data in res.desaparecidxs){
        this.marcadores.push({
          lat: res.desaparecidxs[data].lat,
          long: res.desaparecidxs[data].long,
        })
      }
    });
  }

}
