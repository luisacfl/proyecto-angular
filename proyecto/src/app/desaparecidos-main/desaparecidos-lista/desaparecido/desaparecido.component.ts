import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


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

  constructor(private currentUserService: CurrentuserService,
              private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    
    this.user = this.currentUserService.user;

    this.subscript = this.currentUserService.cambiaDato
      .subscribe(
        (user: Usuario) => {
          this.user = user;
        }
    );
    if (this.user == undefined) {
      this.modo = -1;
    }
    else {
      this.modo = this.user.tipo;
    }
    
  }

  mostrarDetalle(){
    console.log("QUE ONDA");
    console.log(this.desaparecidx);
    //this.router.navigate([this.desaparecidx.id], {relativeTo:this.route});
    this.mostrarDetalles.emit(this.desaparecidx);
  }

  editar(){
    this.editarDesap.emit(this.desaparecidx);
  }

}
