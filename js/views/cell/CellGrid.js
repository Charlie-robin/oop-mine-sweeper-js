import Cell from "./Cell.js";

class CellGrid {
  constructor(cellIds, gridSize) {
    this._cellDictionary = {};
    this._cellGridHTML = this._createCellGridHTML(gridSize);
    this._createCellDictionary(cellIds);
  }

  get cellGridHTML() {
    return this._cellGridHTML;
  }

  getCellById(id) {
    return this._cellDictionary[id];
  }

  displayMines(mineIds) {
    mineIds.forEach(mineId => {
      this._cellDictionary[mineId].displayMine();
    });
  }

  displayCellById(id, value) {
    const cell = this.getCellById(id);
    cell.displayCell(value);
  }

  toggleFlagById(id) {
    this.getCellById(id).toggleFlag();
  }

  _createCellDictionary(cellIds) {
    cellIds.forEach(id => {
      const cell = new Cell(id);
      this._cellDictionary[id] = cell;
      this._cellGridHTML.appendChild(cell.cellHTML);
    });
  }

  _createCellGridHTML(gridSize) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    const screenWidth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    grid.style.width = screenWidth - 20 + "px";
    grid.style.height = screenWidth - 20 + "px";
    return grid;
  }
}

export default CellGrid;
