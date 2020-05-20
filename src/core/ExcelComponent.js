import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubsribers = [];
    this.prepare();
  }

  // Control component before init
  prepare() {}

  // Return component template
  toHTML() {
    return ``;
  }

  // Notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubsribers.push(unsub);
  }

  // Initialize component
  init() {
    this.initDOMListeners();
  }

  // Delete component & clear listeners
  destroy() {
    this.removeDOMListeners();
    this.unsubsribers.forEach(unsub => unsub());
  }
}
