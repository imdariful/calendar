import { Component, EventEmitter, Input, Output } from '@angular/core';
import { yearsList } from '../util';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-year-modal',
  templateUrl: './select-year-modal.component.html',
  styles: `
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
`,
})
export class SelectYearModalComponent {
  yearsList = yearsList;

  @Output() onChangeYear = new EventEmitter<MatSelectChange>();

  onChangeYearHandler(event: MatSelectChange) {
    this.onChangeYear.emit(event.value);
  }
}
