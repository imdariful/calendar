import { Component, EventEmitter, Input, Output } from '@angular/core';
import { yearsList } from '../util';

@Component({
  selector: 'app-select-year-modal',
  templateUrl: './select-year-modal.component.html',
  styleUrl: './select-year-modal.component.scss',
})
export class SelectYearModalComponent {
  yearsList = yearsList;
  @Output() onChangeYear = new EventEmitter<number>();

  onChangeYearHandler(event: any) {
    this.onChangeYear.emit(event.value);
  }
}
