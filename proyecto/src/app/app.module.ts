import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      //apiKey: INSERT API KEY HERE
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
