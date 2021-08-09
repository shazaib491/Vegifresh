import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  booking(): Observable<booking[]>{
    return this.http.get<booking[]>(`${environment.bookingUrl}`);
  }
}
