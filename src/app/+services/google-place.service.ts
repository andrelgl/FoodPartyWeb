import { Injectable } from '@angular/core';

import { googleKey, placesQueryUrl, placesUrl, geocodeUrl } from './initial';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, forkJoin, Subject } from 'rxjs';
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {

  constructor(
    private http: HttpClient
  ) { }

  public getCordenates(
    number: number,
    city: string,
    state: string,
    uf: string
  ) {
    return this.http.get(`${geocodeUrl}${number} ${city} ${state} ${uf}&${googleKey}`).pipe(
      map(
        (res: any) => res.results[0].geometry.location
      )
    );
  }

  public getPlaces(name: string, number: number, city: string, state: string) {

    let subject = new Subject<Array<any>>();

    var request = {
      query: `${name} ${number} ${city} ${state}`,
      fields: ['name', 'id', 'place_id', 'formatted_address', 'geometry'],
    };

    let service = new google.maps.places.PlacesService(document.createElement('div'));
    service.findPlaceFromQuery(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let response = results.map(result => {
          return {
            name: result.name,
            latitude: result.geometry.location.lat(),
            longitude: result.geometry.location.lng(),
            address: result.formatted_address,
            google_places_id: result.id,
            place_id: result.place_id
          };
        });
        subject.next(response);
      }
      else {
        subject.error("nenhum informacao encontrada");
      }
    });

    return subject.asObservable();
  }

  public getPlaceDetails(placeId: string) {
    return this.http.get(`json?placeid=${placeId}&fields=name&key=${googleKey}`).pipe(
      map(
        (res: any) => {
          return res.result;
        })
    );
  }

}
