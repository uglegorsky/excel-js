import { $ } from '@core/DOM';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'container');

    // Init components
    this.components = this.components.map(Component => {
      // Create parent HTML element of the Сomponent
      const $el = $.create('div', Component.className);

      // Instance of the Сomponent
      const component = new Component($el);

      // Render HTML
      $el.html(component.toHTML());

      // Append component to root element
      $root.append($el);

      return component;
    });

    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}
