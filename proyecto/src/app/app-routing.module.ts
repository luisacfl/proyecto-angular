import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';
import { DesaparecidosMainComponent } from './desaparecidos-main/desaparecidos-main.component';
import { DesaparecidosListaComponent } from './desaparecidos-main/desaparecidos-lista/desaparecidos-lista.component';
import { DesaparecidoDetalleComponent } from './desaparecidos-main/desaparecido-detalle/desaparecido-detalle.component';
import { DesaparecidosEditComponent } from './desaparecidos-main/desaparecidos-edit/desaparecidos-edit.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'mapa', component: MapaComponent},
  {path: 'listado', component: DesaparecidosMainComponent, children:[
    {path: '', component: DesaparecidosListaComponent},
    {path: 'new', component: DesaparecidosEditComponent},
    {path: ':id', component: DesaparecidoDetalleComponent},
    {path: ':id/edit', component: DesaparecidosEditComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
