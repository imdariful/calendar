import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';

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
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
  });

  onSubmit() {
    // convert date to string
    if (this.makeAppointmentForm.invalid) {
      return;
    }
    const data = this.makeAppointmentForm.value;
    this.appService.saveToLocalStorage('appointments', data);
    this.dialogRef.close();
  }
}
