import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';
import { Subscription } from 'rxjs';

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
  private subscript: Subscription;

  constructor(private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.subscript = this.currentUserService.cambiaDato
      .subscribe(
        (user: Usuario) => {
          this.user = user;
        }
    );
  }

  mostrarDetalle(){
    this.mostrarDetalles.emit(this.desaparecidx);
  }

  editar(){
    this.editarDesap.emit(this.desaparecidx);
  }

}
