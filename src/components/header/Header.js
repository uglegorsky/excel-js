import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';

  toHTML() {
    return `
      <input type="text" class="header__input" value="New table">

      <div>
        <div class="header__button">
          <span class="material-icons">exit_to_app</span>
        </div>
        <div class="header__button">
          <span class="material-icons">delete</span>
        </div>
      </div>
    `;
  }
}
