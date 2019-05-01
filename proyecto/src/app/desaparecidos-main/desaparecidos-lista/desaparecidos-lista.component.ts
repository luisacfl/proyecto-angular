import { Component, OnInit } from '@angular/core';
import { Desaparecidx } from 'src/app/desap/Desaparecidx';
import { Subscription } from 'rxjs';
import { DesapService } from 'src/app/desap/desap.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-desaparecidos-lista',
  templateUrl: './desaparecidos-lista.component.html',
  styleUrls: ['./desaparecidos-lista.component.css']
})
export class DesaparecidosListaComponent implements OnInit {

  desaparecidxs: Desaparecidx[];
  private subscript: Subscription;

  constructor(private desapService: DesapService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
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
