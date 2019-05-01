import { Component, OnInit, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/Usuario';

@Component({
  selector: 'app-organizacion',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.css']
})
export class OrganizacionComponent implements OnInit {
  @Input() user:Usuario;
  
  constructor() { }

  ngOnInit() {
  }

}
