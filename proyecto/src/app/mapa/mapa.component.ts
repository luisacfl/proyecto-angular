import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from '../services/currentuser/currentuser.service';
import { Usuario } from '../Usuario';
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
  modo:number;
  user: Usuario;
  marcadores = [];
  constructor(private currentUserService: CurrentuserService,
    private desapService:DesapService
    ) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
    
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
