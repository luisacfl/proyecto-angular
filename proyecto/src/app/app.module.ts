import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import { DesaparecidosMainComponent } from './desaparecidos-main/desaparecidos-main.component';
import { DesaparecidosListaComponent } from './desaparecidos-main/desaparecidos-lista/desaparecidos-lista.component';
import { DesaparecidoComponent } from './desaparecidos-main/desaparecidos-lista/desaparecido/desaparecido.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigComponent } from './config/config.component';
import { DesaparecidoDetalleComponent } from './desaparecidos-main/desaparecido-detalle/desaparecido-detalle.component';
import { DesaparecidosEditComponent } from './desaparecidos-main/desaparecidos-edit/desaparecidos-edit.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { GrafsComponent } from './grafs/grafs.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MapaComponent,
    DesaparecidosMainComponent,
    DesaparecidosListaComponent,
    DesaparecidoComponent,
    ConfigComponent,
    DesaparecidoDetalleComponent,
    DesaparecidosEditComponent,
    LoginComponent,
    RegistroComponent,
    GrafsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCweM3a88aM2P7_wBTrc61xHACOmR7gZYk"
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
