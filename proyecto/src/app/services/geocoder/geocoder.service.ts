/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
//import { } from '@agm/core/services/google-maps-types';
import {MapsAPILoader} from '@agm/core';
import { Observable, from, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  delay = 100; // delay between geocode requests - at the time of writing, 100 miliseconds
  latLong = [];
  geocoder: any;
  p: any;
  google:any;
  /*
  constructor(private mapLoader: MapsAPILoader) {
    this.geocoder = new google.maps.Geocoder();
  }
  private initGeocoder(){
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  getLatLong(dir: string) {
    this.waitForMapsToLoad().pipe(

    );
    this.geocoder.geocode({ address: dir }, function( results, status) {
      // Si logra obtener un valor
      if (status == google.maps.GeocoderStatus.OK) {
        this.p = results[0].geometry.location; //asumimos que el primer resultado es el que queremos
        this.latLong[0] = this.p.lat();
        this.latLong[1] = this.p.long();
      }
      else { // estado de error
        if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            console.log('Excedimos los marcadores');
          } else {
            console.log('Geocoder fallando');
          }
      }
    });
    console.log(this.latLong);
    return this.latLong;
  }*/

}
