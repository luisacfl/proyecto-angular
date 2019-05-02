import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Usuario';
import { CurrentuserService } from 'src/app/services/currentuser/currentuser.service';

@Component({
  selector: 'app-desaparecidos-lista',
  templateUrl: './desaparecidos-lista.component.html',
  styleUrls: ['./desaparecidos-lista.component.css']
})
export class DesaparecidosListaComponent implements OnInit {

  modo:number;
  user: Usuario;
  desaparecidxs: Desaparecidx[];
  private subscript: Subscription;

  constructor(private desapService: DesapService,
    private router: Router,
    private route: ActivatedRoute,
    private currentUserService: CurrentuserService) { }

  ngOnInit() {
    this.user = this.currentUserService.user;
    if(this.user == undefined)
      this.modo=-1;
    else
      this.modo=this.user.tipo;
  
    this.desaparecidxs = this.desapService.getDesaparecidxs();
    
    this.subscript = this.desapService.cambiaDato.subscribe((arregloDesaparecidxs: Desaparecidx[]) => {
      this.desaparecidxs = arregloDesaparecidxs;
      }
    );
  }

  editar(desap){
    this.router.navigate([desap.id, 'edit'], {relativeTo: this.route});
}

  mostrarDetalle(desapDetalle){
    this.router.navigate([desapDetalle.id], {relativeTo: this.route});
  }

  crear(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
