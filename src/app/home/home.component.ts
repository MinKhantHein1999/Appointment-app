import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AppointmentsService } from '../service/appointments.service';
// import * as _moment from 'moment';
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || moment;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  message: any;
  messageClass: any;

  bookingform = new FormGroup({
    appointDate: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get appointDate() {
    return this.bookingform.get('appointDate');
  }

  get Name() {
    return this.bookingform.get('name');
  }

  get Email() {
    return this.bookingform.get('email');
  }

  constructor(
    public appointService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveBooking() {
    if (this.bookingform.valid) {
      this.appointService
        .createAppointment(this.bookingform.value)
        .subscribe((res) => {
          //   console.log(res);
          // this.router.navigate(['appoint-list']);
          // },
          // (err) => {
          //   console.log(err);
          // }
          if (!res.success) {
            this.messageClass = 'alert alert-warning';
            this.message = res.message;
          } else {
            console.log(res);
            this.messageClass = 'alert alert-success';
            this.message = res.message;
            this.bookingform.reset();
            setTimeout(() => {
              this.router.navigate(['appoint-list']);
            }, 2000);
          }
        });
    }
  }
}
