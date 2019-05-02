import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FiltrarAlumPipe } from '../filtrar-alum.pipe';


@Component({
  selector: 'app-desaparecidos-lista',
  templateUrl: './desaparecidos-lista.component.html',
  styleUrls: ['./desaparecidos-lista.component.css']
})
export class DesaparecidosListaComponent implements OnInit {
  nameSearch: string;
  desaparecidxs: Desaparecidx[];
  private subscript: Subscription;

  constructor(private desapService: DesapService,
    private router: Router,
    private route: ActivatedRoute,
    private filterPipe: FiltrarAlumPipe) { }

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
