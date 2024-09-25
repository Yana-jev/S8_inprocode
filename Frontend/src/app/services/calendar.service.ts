import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/api/calendar'; 

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}`);
  }


  updateEvent(eventId: string, updatedEventData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventId}`, updatedEventData);
  }



}

