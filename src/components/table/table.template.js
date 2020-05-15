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
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function toColumn(col) {
  return `
    <div class="table__column">${col}</div>
  `;
}

function createRow(index, content) {
  return `
    <div class="table__row">
      <div class="table__row-info">${index}</div>
      <div class="table__row-data">${content}</div>
    </div>
  `;
}

function toCell(content) {
  return `
    <div class="table__cell" contenteditable>
      ${content}
    </div>
  `;
}
