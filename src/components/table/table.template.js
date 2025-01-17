// Code chars
const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 10) {
  const rows = [];

  // Count of columns = count chars in the Latin alphabet (A - Z)
  const colsCount = CODES.Z - CODES.A + 1;

  // Create first row with chars
  const colsData = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('');

  rows.push(createRow('', colsData));

  // Create table cells
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(row)).join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col, index) {
  return `
    <div class="table__column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="table__col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resize = index
    ? `<div class="table__row-resize" data-resize="row"></div>`
    : '';
  return `
    <div class="table__row" data-type="resizable">
      <div class="table__row-info">
        ${index}
        ${resize} 
      </div>
      <div class="table__row-data">${content}</div>
    </div>
  `;
}

function toCell(row) {
  return function (_, col) {
    return `
      <div
        class="table__cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
      ></div>
    `;
  };
}
