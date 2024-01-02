import { Component, signal, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { INITIAL_EVENTS, createEventId, yearsList } from './util';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `
  
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.year-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 1.5;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.calendar-details {
  line-height: 1.5;
  background: #7FC7D9;
  border-right: 1px solid #7FC7D9;
  border-radius: 0.5em;
}

.calendar-details-section {
  padding: 2em;
}

.calendar {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
`,
})
export class AppComponent {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

  viewYearDropDown: boolean = false;

  yearsList = yearsList;

  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev next changeYearBtn makeAppointmentBtn',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      // make a drop down to change year
    },
    customButtons: {
      changeYearBtn: {
        text: 'Change Year',
        click: () => {
          this.viewYearDropDown = true;
        },
      },
      makeAppointmentBtn: {
        text: 'Make Appointment',
        click: () => {
          this.makeAppointmentModal();
        },
      },
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the events setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // eventAdd:
    // eventChange:
    // eventRemove:
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        'Are you sure you want to delete the event ${clickInfo.event.title}'
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  changeToCustomYear() {}

  onChangeYear(year: MatSelectChange) {
    const selectedYear = year.value;
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(`${selectedYear}-01-01`);
    this.viewYearDropDown = false;
  }

  makeAppointmentModal(): void {
    const dialogRef = this.dialog.open(AppointmentModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
