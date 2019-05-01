import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Desaparecidx } from 'src/app/desap/Desaparecidx';

@Component({
  selector: 'app-desaparecido',
  templateUrl: './desaparecido.component.html',
  styleUrls: ['./desaparecido.component.css']
})
export class DesaparecidoComponent implements OnInit {

  @Input() desaparecidx: Desaparecidx;
  @Output() mostrarDetalles = new EventEmitter;
  @Output() editarDesap = new EventEmitter;


  constructor() { }

  ngOnInit() {
  }

  mostrarDetalle(){
    this.mostrarDetalles.emit(this.desaparecidx);
  }

  editar(){
    this.editarDesap.emit(this.desaparecidx);
  }

}
