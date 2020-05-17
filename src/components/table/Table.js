import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/DOM';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shoudResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
    });
  }

  toHTML() {
    // The function parameter takes value counts of rows
    return createTable(20);
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shoudResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      console.log(event);
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next);
    }
  }
}
