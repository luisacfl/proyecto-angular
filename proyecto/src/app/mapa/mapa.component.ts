import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  title: string = 'Mapa de Personas Desaparecidas';
  lat: number = 22.5208046;
  lng: number = -120.9572822;
  
  constructor() { }

  ngOnInit() {
  }

}
