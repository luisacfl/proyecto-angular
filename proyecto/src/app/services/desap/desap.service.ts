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
  cambiaDato = new Subject<Desaparecidx[]>();
  private lastId = 1;
  constructor(private http: HttpClient,
              /*private geocoder: GeocoderService*/) {
  }
  getDesaparecidxs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }
  getDesaparecidx(id: string): Observable<Desaparecidx> {
    return this.http.get<Desaparecidx>(this.desapUrl + '/:' + id);
  }
  // este método es igual al de arriba, no sé para que es, luego lo borramos
  getDesaparecidxsObs(): Observable<Desaparecidx[]> {
    return this.http.get<Desaparecidx[]>(this.desapUrl);
  }
  add(desap: Desaparecidx): Observable<Desaparecidx> {
    return this.http.post<Desaparecidx>(this.desapUrl, desap);
  }
  edit(desap: Desaparecidx): Observable<Desaparecidx> {
    return this.http.put<Desaparecidx>(this.desapUrl + '/:' + desap.id, desap);
  }

  // -------------------TODO: Geocoder-----------------------------//

  /*add(desap: Desaparecidx): boolean {
    desap.id = this.lastId++;

    const d = this.desaparecidxs.find((d) => d === desap);
    if (d) {
      this.lastId--;
      return false;
    }
    this.desaparecidxs.push(Object.assign({}, desap));
    //llamar al geocoder
    /*this.latLong = this.geocoder.getLatLong(this.getDireccion(desap));
    SI TIENE DIRECCION EN VES DE NO ESPECIFICADO,
    if (this.latLong.length > 0) {
      this.assignLatLong(desap, this.latLong);
      console.log(desap);
    }*
    this.notificarCambios();
    return true;
  }*/

  getDireccion(desap: Desaparecidx) {
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

 /* assignLatLong(desap: Desaparecidx, coord: number[]) {
    const pos = this.desaparecidxs.findIndex(d => d.id === desap.id);
    desap.lat = coord[0];
    desap.long = coord[1];
    Object.assign(this.desaparecidxs[pos], desap);
    this.notificarCambios();
  }

  getNextId(): number {
    return this.lastId;
  }

  notificarCambios() {
    this.cambiaDato.next(this.desaparecidxs.slice());
  }*/
}
