import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Desaparecidx } from '../../Desaparecidx';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { GeocoderService } from '../geocoder.service';

@Injectable({
  providedIn: 'root'
})
export class DesapService {
  desapUrl = 'http://localhost:3000/api/desap';
  direccion = '';
  latLong = [];
  private lastId = 0;
  cambiaDato = new Subject<Desaparecidx[]>();
  constructor(private http: HttpClient
              /*private geocoder: GeocoderService*/) {
  }
  getDesaparecidxs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }
  getDesaparecidx(id: number): Observable<Desaparecidx> {
    return this.http.get<Desaparecidx>(this.desapUrl + '/' + id);
  }
  // este método es igual al de arriba, no sé para que es, luego lo borramos
  getDesaparecidxsObs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }
  add(desap: Desaparecidx): Observable<Desaparecidx> {
    desap.id = this.lastId++;
    return this.http.post<Desaparecidx>(this.desapUrl, desap);
  }
  edit(id: number): Observable<Desaparecidx> {
    return this.http.put<Desaparecidx>(this.desapUrl + '/:', id);
  }
  delete(id: number) {
    return this.http.delete(this.desapUrl + id);
  }
  getNextId(){
    return this.lastId;
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
