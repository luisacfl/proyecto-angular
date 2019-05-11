import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Desaparecidx } from '../../Desaparecidx';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { GeocoderService } from '../geocoder.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DesapService {
  desapUrl = 'http://myjson.com/1e9u58';
  direccion = '';
  latLong = [];
  cambiaDato = new Subject<Desaparecidx[]>();
  private lastId = 1;

  desaparecidxs: Desaparecidx[] = [
    new Desaparecidx(this.lastId++, 'ALONSO', '', 'JIRON', 'MENDEZ', 'NO ESPECIFICADO', 'FGE - QUERETARO', 'QUERETARO', '01/01/17', '12:00:00', 'SAN JUAN DEL RIO', 'SAN JUAN DEL RIO', 'MEXICO', 'NO ESPECIFICADO', 'NO ESPECIFICADO', 50, 'NO ESPECIFICADO', 'NO ESPECIFICADO', 'MEXICANA', 'HOMBRE', 'update', 'completo', 0, 20.4033771, -100.0435125),
    new Desaparecidx(this.lastId++, 'JESUS', 'ANTONIO', 'RAMIREZ', 'FRAIRE', 'Delgada', 'FGE - CHIHUAHUA', 'CHIHUAHUA', '01/01/97', '12:00:00', 'JUAREZ', 'JUAREZ', 'MEXICO', 'NO ESPECIFICADO', 'NO ESPECIFICADO', 68, '1.65', 'NO ESPECIFICADO', 'MEXICANA', 'HOMBRE', 'update', 'completo', 0, 31.6538179, -106.5890212),
    new Desaparecidx(this.lastId++, 'JESUS', '', 'SANDOVAL', 'ORTIZ', 'Mediana', 'FGE - DURANGO', 'DURANGO', '01/01/97', '12:00:00', 'DURANGO', 'DURANGO', 'MEXICO', 'NO ESPECIFICADO', 'NO ESPECIFICADO', 73, '1.7', 'NO ESPECIFICADO', 'MEXICANA', 'HOMBRE', 'update', 'completo', 0, 24.0226824, -104.7177653),
    new Desaparecidx(this.lastId++, 'FEDERICO', '', 'LUJAN', 'DIAZ', 'Robusta', 'FGE - CHIHUAHUA', 'CHIHUAHUA', '01/01/97', '12:00:00', 'SAUCILLO', 'SAUCILLO', 'MEXICO', 'CICATRIZ DE BALA EN CRANEO', 'NO ESPECIFICADO', 55, '1.6', 'NO ESPECIFICADO', 'MEXICANA', 'HOMBRE', 'update', 'completo', 0, 28.0329293, -105.3100832),
    new Desaparecidx(this.lastId++, 'J CARMEN', '', 'CRUZ', 'ZAMORA', 'Mediana', 'FGE - CHIHUAHUA', 'CHIHUAHUA', '01/01/02', '12:00:00', 'JUAREZ', 'JUAREZ', 'MEXICO', 'MANCHAS EN EL PECHO Y PIES POR QUEMADURA Y CICATRIZ EN LA FRENTE.', 'NO ESPECIFICADO', 36, '1.6', 'NO ESPECIFICADO', 'MEXICANA', 'HOMBRE', 'update', 'completo', 0, 31.6538179, -106.5890212)
  ];
  
  constructor(private http: HttpClient,
              /*private geocoder: GeocoderService*/) {
  }

  addDesap(desap: Desaparecidx): Observable<Desaparecidx> {
    return this.http.post<Desaparecidx>(this.desapUrl, desap, httpOptions);
  }

  add(desap: Desaparecidx): boolean {
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
    }*/
    this.notificarCambios();
    return true;
  }

  getDireccion(desap: Desaparecidx) {
    //devuelve la direccion en string para el geocoder
    this.direccion = '';
    if (desap.fuerocomun_desaplocalidad.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desaplocalidad.length > 0){
      this.direccion = this.direccion.concat(desap.fuerocomun_desaplocalidad, ' ');
    }
    if (desap.fuerocomun_desapmunicipio.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desapentidad.length > 0){
      this.direccion = this.direccion.concat(desap.fuerocomun_desapentidad, ' ');
    }
    if (desap.fuerocomun_desapentidad.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desapentidad.length > 0){
      this.direccion = this.direccion.concat(desap.fuerocomun_desapentidad, ' ');
    }
    if (desap.fuerocomun_desappais.localeCompare('NO ESPECIFICADO') !== 0 && desap.fuerocomun_desappais.length > 0){
      this.direccion = this.direccion.concat(desap.fuerocomun_desappais);
    }
    return this.direccion;
  }

  edit(desap: Desaparecidx) {
    const pos = this.desaparecidxs.findIndex(d => d.id === desap.id);
    Object.assign(this.desaparecidxs[pos], desap);
    this.notificarCambios();
  }

  assignLatLong(desap: Desaparecidx, coord: number[]) {
    const pos = this.desaparecidxs.findIndex(d => d.id === desap.id);
    desap.lat = coord[0];
    desap.long = coord[1];
    Object.assign(this.desaparecidxs[pos], desap);
    this.notificarCambios();
  }

  getNextId(): number {
    return this.lastId;
  }

  getDesaparecidxs(): Desaparecidx[] {
    return this.desaparecidxs.slice();
  }

  getDesaparecidx(id: number): Desaparecidx {
    const pos = this.desaparecidxs.findIndex(d => d.id === id);
    return Object.assign({}, this.desaparecidxs[pos]);
  }

  getDesaparecidxsObs(): Observable<any> {
    return of(this.desaparecidxs);
  }

  notificarCambios() {
    this.cambiaDato.next(this.desaparecidxs.slice());
  }

}
