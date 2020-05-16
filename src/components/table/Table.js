import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shoudResize } from './table.functions';
export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    // The function parameter takes value counts of rows
    return createTable(20);
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
