import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficService {
  private apiUrl = 'http://localhost:3000/api/grafics';

  getSales(): Observable<any>{
    return this.http.get(this.apiUrl)
  }
  constructor(private http: HttpClient) { }
}
