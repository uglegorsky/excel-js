/* eslint-disable max-len */
import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'table';

  toHTML() {
    // The function parameter takes value counts of rows
    return createTable(20);
  }
}
