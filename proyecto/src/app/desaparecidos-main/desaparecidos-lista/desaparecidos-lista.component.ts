import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-desaparecidos-lista',
  templateUrl: './desaparecidos-lista.component.html',
  styleUrls: ['./desaparecidos-lista.component.css']
})
export class DesaparecidosListaComponent implements OnInit {
  
  nameSearch: string;
  edadSearch: string;
  estadoSearch: string;
  sexoSearch: string;
  statusSearch: boolean;

  cknom: boolean;
  cksex: boolean;
  ckedad: boolean;
  ckedo: boolean;
  ckest: boolean;

  modo: number;
  user: Usuario;
  desaparecidxs: any = [];
  private subscript: Subscription;

  constructor(private desapService: DesapService,
    private router: Router,
    private route: ActivatedRoute,
    private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.cknom = false;
    this.cksex = false;
    this.ckedad = false;
    this.ckedo = false;
    this.ckest = false;

    this.user = this.currentUserService.user;
    if (this.user == undefined) {
      this.modo = -1;
    }
    else {
      this.modo = this.user.tipo;
    }
    this.modo = this.currentUserService.modo;
    
    this.subscript = this.desapService.cambiaDato.subscribe((arregloDesaparecidxs: Desaparecidx[]) => {
      this.desaparecidxs = arregloDesaparecidxs;
    });

    this.desapService.getDesaparecidos();
  }

  editar(desap) {
    this.router.navigate([desap.id, 'edit'], { relativeTo: this.route });
  }

  mostrarDetalle(desapDetalle) {
    this.router.navigate([desapDetalle.id], { relativeTo: this.route });
  }

  crear() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filtrarNombre(formulario: NgForm){
    console.log(formulario.value);
    var desapFilter = this.desaparecidxs.slice();
    
  }

}
