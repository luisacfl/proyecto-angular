import { Component, OnInit } from '@angular/core';
import { Desaparecidx } from 'src/app/desap/Desaparecidx';
import { ActivatedRoute, Router } from '@angular/router';
import { DesapService } from 'src/app/desap/desap.service';
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
