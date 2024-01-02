import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

export const yearsList = [
  { value: 2000, viewValue: '2000' },
  { value: 2001, viewValue: '2001' },
  { value: 2002, viewValue: '2002' },
  { value: 2003, viewValue: '2003' },
  { value: 2004, viewValue: '2004' },
  { value: 2005, viewValue: '2005' },
  { value: 2006, viewValue: '2006' },
  { value: 2007, viewValue: '2007' },
  { value: 2008, viewValue: '2008' },
  { value: 2009, viewValue: '2009' },
  { value: 2010, viewValue: '2010' },
  { value: 2011, viewValue: '2011' },
  { value: 2012, viewValue: '2012' },
  { value: 2013, viewValue: '2013' },
  { value: 2014, viewValue: '2014' },
  { value: 2015, viewValue: '2015' },
  { value: 2016, viewValue: '2016' },
  { value: 2017, viewValue: '2017' },
  { value: 2018, viewValue: '2018' },
  { value: 2019, viewValue: '2019' },
  { value: 2020, viewValue: '2020' },
  { value: 2021, viewValue: '2021' },
  { value: 2022, viewValue: '2022' },
  { value: 2023, viewValue: '2023' },
  { value: 2024, viewValue: '2024' },
  { value: 2025, viewValue: '2025' },
  { value: 2026, viewValue: '2026' },
  { value: 2027, viewValue: '2027' },
  { value: 2028, viewValue: '2028' },
  { value: 2029, viewValue: '2029' },
  { value: 2030, viewValue: '2030' },
];
