import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/ilocation';



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'http://localhost:3000/api/locations';

  constructor(private http: HttpClient) { }


  getLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.apiUrl);
  }

  addLocation(location: Location): Observable<Location>{
    return this.http.post<Location>(this.apiUrl, location)
  }

  deleteLocation(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
