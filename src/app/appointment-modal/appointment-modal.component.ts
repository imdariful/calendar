import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styles: `
    ngx-timepicker-field-example {
      z-index: 10000 !important;
    }
    ngx-material-timepicker-container {
      z-index: 10000 !important;
    }
  `,
})
export class AppointmentModalComponent {
  constructor(
    private appService: AppService,
    private dialogRef: MatDialogRef<AppointmentModalComponent>
  ) {}

  makeAppointmentForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  private formatDateTime(date: string, time: string): string {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return `${formattedDate}T${time}`;
  }

  onSubmit() {
    if (this.makeAppointmentForm.invalid) {
      return;
    }

    const id = uuidv4();

    const formattedStartTime = this.formatDateTime(
      this.makeAppointmentForm.value.date!,
      this.makeAppointmentForm.value.startTime!
    );

    const formattedEndTime = this.formatDateTime(
      this.makeAppointmentForm.value.date!,
      this.makeAppointmentForm.value.endTime!
    );

    const event = {
      id: id,
      start: new Date(formattedStartTime),
      end: new Date(formattedEndTime),
      title: this.makeAppointmentForm.value.title,
      name: this.makeAppointmentForm.value.name,
      gender: this.makeAppointmentForm.value.gender,
      age: this.makeAppointmentForm.value.age,
    };

    this.appService.saveToLocalStorage('appointments', event);
    this.dialogRef.close();
  }
}
