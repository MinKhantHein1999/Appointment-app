import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../appointment';
import { AppointmentsService } from '../service/appointments.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  public appointments: Appointment[];
  public loading = true;
  public successMsg: string;
  public errorMsg: string;

  constructor(public appointService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointService.getAppointment().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }

  cancelAppointment(id: string) {
    this.appointService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this.appointService.getAppointment()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.successMsg = 'Successfully cancelled appointment';
        },
        (error) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
