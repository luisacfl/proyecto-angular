import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Desaparecidx } from '../../Desaparecidx';
import { Observable, Subject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrentuserService } from '../currentuser/currentuser.service';
import { Usuario } from 'src/app/Usuario';
// import { GeocoderService } from '../geocoder.service';

@Injectable({
  providedIn: 'root'
})  
export class DesapService {
  desapUrl = 'http://localhost:3000/api/desap';
  desaparecidos: Desaparecidx[];
  direccion = '';
  latLong = [];
  lastId = 10;
  cambiaDato = new Subject<Desaparecidx[]>();
  user:Usuario;
  private subscript: Subscription;


  constructor(private http: HttpClient,
            private currentuserService: CurrentuserService
              /*private geocoder: GeocoderService*/) {
  }

  actualizarDesaparecidos() {
    this.cambiaDato.next(this.desaparecidos.slice());
  }

  getDesaparecidxs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }

  getDesaparecidos() {
      this.http.get<Desaparecidx[]>(this.desapUrl)
      .subscribe((des: Desaparecidx[]) => {
        this.desaparecidos = des;
        this.actualizarDesaparecidos();
      });
  }

  getDesaparecidx(id: number): Observable<Desaparecidx> {
    return this.http.get<Desaparecidx>(this.desapUrl + '/' + id);
  }
  // este método es igual al de arriba, no sé para que es, luego lo borramos
  getDesaparecidxsObs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }
  add(desap: Desaparecidx) {

    this.user=this.currentuserService.user;

    this.subscript = this.currentuserService.cambiaDato
    .subscribe(
      (user: Usuario) => {
        this.user = user;
      }
    );

   // desap.creadoOrg = this.currentuserService.user.org;
    desap.creadoUsuario = this.currentuserService.user.nombre;
  
    
    console.log(desap);
    return this.http.post<Desaparecidx>(this.desapUrl, desap);
  }

  add2(desap: Desaparecidx) {
    return this.http.post<Desaparecidx>(this.desapUrl, desap)
      .subscribe((res) => {

      });
  }

  edit(desap: Desaparecidx){
    console.log(desap);
    return this.http.put<Desaparecidx>(this.desapUrl + '/', desap.id);
  }

  delete(id: number) {
    return this.http.delete(this.desapUrl + id);
  }
  getNextId() {
    return ++this.desaparecidos.length;
  }
  getDesapFiltro(nameSrch: string, edadSrch: number, edoSrch: string, sxSrch: string, statusSrch: string): Observable<Desaparecidx> {
    var urlBuild = '?';
    if (nameSrch != undefined) {
      //URL encode al nameSrch
      urlBuild += "nombre=" + nameSrch + "&";
    }
    if (edadSrch != undefined) {
      urlBuild += "edad=" + edadSrch + "&";
    }
    if (edoSrch != undefined) {
      urlBuild += "estado=" + edoSrch + "&";
    }
    if (sxSrch != undefined) {
      urlBuild += "sexo=" + sxSrch + "&";
    }
    if (statusSrch != undefined) {
      urlBuild += "status=" + statusSrch + "&";
    }
    return this.http.get<Desaparecidx>(this.desapUrl + '/search' + urlBuild);
  }


  // -------------------TODO: Geocoder-----------------------------//

  /* getDireccion(desap: Desaparecidx) {
      // devuelve la direccion en string para el geocoder
      this.direccion = '';
      if (desap.fuerocomun_desaplocalidad.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desaplocalidad.length > 0) {
        this.direccion = this.direccion.concat(desap.fuerocomun_desaplocalidad, ' ');
      }
      if (desap.fuerocomun_desapmunicipio.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desapentidad.length > 0) {
        this.direccion = this.direccion.concat(desap.fuerocomun_desapentidad, ' ');
      }
      if (desap.fuerocomun_desapentidad.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desapentidad.length > 0) {
        this.direccion = this.direccion.concat(desap.fuerocomun_desapentidad, ' ');
      }
      if (desap.fuerocomun_desappais.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desappais.length > 0) {
        this.direccion = this.direccion.concat(desap.fuerocomun_desappais);
      }
      return this.direccion;
    }
  
     assignLatLong(desap: Desaparecidx, coord: number[]) {
      const pos = this.desaparecidxs.findIndex(d => d.id === desap.id);
      desap.lat = coord[0];
      desap.long = coord[1];
      Object.assign(this.desaparecidxs[pos], desap);
      this.notificarCambios();
    }
    */
}
