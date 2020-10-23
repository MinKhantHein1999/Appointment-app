import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Appointment } from '../appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  public base_Url = environment.API_URL;

  constructor(private http$: HttpClient) {}

  getAppointment(): Observable<Appointment[]> {
    return this.http$.get<Appointment[]>(`${this.base_Url}/appointments`);
  }

  createAppointment(booking): Observable<Appointment[]> {
    return this.http$.post<Appointment[]>(
      `${this.base_Url}/appointments`,
      booking
    );
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http$.delete(`${this.base_Url}/appointments/${id}`);
  }
}
