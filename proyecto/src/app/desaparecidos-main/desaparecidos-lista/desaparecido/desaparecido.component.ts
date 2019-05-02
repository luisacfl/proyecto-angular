import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';

@Component({
  selector: 'app-desaparecido',
  templateUrl: './desaparecido.component.html',
  styleUrls: ['./desaparecido.component.css']
})
export class DesaparecidoComponent implements OnInit {

  @Input() desaparecidx: Desaparecidx;
  @Output() mostrarDetalles = new EventEmitter;
  @Output() editarDesap = new EventEmitter;

  modo:number;
  user: Usuario;

  constructor(private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
  }

  mostrarDetalle(){
    this.mostrarDetalles.emit(this.desaparecidx);
  }

  editar(){
    this.editarDesap.emit(this.desaparecidx);
  }

}
