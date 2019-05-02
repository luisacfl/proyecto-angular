import { Component, OnInit } from '@angular/core';
import { CurrentuserService } from '../services/currentuser/currentuser.service';
import { Usuario } from '../Usuario';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  title: string = 'Mapa de Personas Desaparecidas';
  lat: number = 22.5208046;
  lng: number = -120.9572822;
  modo:number;
  user: Usuario;

  constructor(private currentUserService: CurrentuserService
    ) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
    
  }

}
