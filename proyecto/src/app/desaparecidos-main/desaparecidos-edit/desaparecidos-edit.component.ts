import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Desaparecidx } from 'src/app/Desaparecidx';
import { DesapService } from 'src/app/services/desap/desap.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-desaparecidos-edit',
  templateUrl: './desaparecidos-edit.component.html',
  styleUrls: ['./desaparecidos-edit.component.css']
})
export class DesaparecidosEditComponent implements OnInit {
  modoAdd = true;
  id: number;
  desaparecidx: Desaparecidx;
  error = false;
  private desap: Desaparecidx[];
  private subscript: Subscription;

  constructor(private route: ActivatedRoute,
    private desapService: DesapService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          if (params.id) {
            this.modoAdd = false;
            this.id = params.id;
            this.error = false;
          } else {
            this.modoAdd = true;
            this.error = false;
            //this.desaparecidx = new Desaparecidx(this.desapService.getNextId(),'','','','','','','','','','','','','','',0,'','','','','update','',0,0,0);
          }
        }
      );

    this.subscript = this.desapService.cambiaDato
      .subscribe(
        (des: Desaparecidx[]) => {
          this.desap = des;
        }
      );
    if (!this.modoAdd) {
      this.desaparecidx = this.desapService.desaparecidos.find(u => u.id == this.id);
    }
    console.log(this.desap);
    console.log(this.modoAdd);
  }

  submit(formulario: NgForm) {
    console.log(formulario);

    if (this.modoAdd) {
      this.desapService.add(this.desaparecidx)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/listado']);
        }, (err) => {
          console.log(err);
        });
    } else {
      this.desapService.edit(this.desaparecidx.id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/listado']);
        }, (err) => {
          console.log(err);
        });
    }

  }

  regresar() {
    this.location.back();
  }
}
