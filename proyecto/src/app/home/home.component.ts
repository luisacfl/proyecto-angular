import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   images = ['assets/img/blueGreen.jpg', 'assets/img/emeraldGreen.jpg','assets/img/greenGreen.jpg'];
  constructor() { 
  }
  ngOnInit() {
  }

}
