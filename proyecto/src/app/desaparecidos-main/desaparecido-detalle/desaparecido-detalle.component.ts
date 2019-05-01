import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-desaparecido-detalle',
  templateUrl: './desaparecido-detalle.component.html',
  styleUrls: ['./desaparecido-detalle.component.css']
})
export class DesaparecidoDetalleComponent implements OnInit {


  id: number;
  desaparecidx: Desaparecidx;

  constructor(private route: ActivatedRoute,
    private desapService: DesapService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.id = Number(params.id);
        this.desaparecidx = this.desapService.getDesaparecidx(this.id);
      }
    );
    console.log(this.desaparecidx);
  }

  regresar(){
    this.location.back();
  }
}
