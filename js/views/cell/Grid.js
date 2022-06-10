import GridCell from "./GridCell.js";

class Grid {
  constructor(cellIds, gridSize) {
    this._cellDictionary = {};
    this._gridHTML = this._createGridHTML(gridSize);
    this._createCellDictionary(cellIds);
  }

  get gridHTML() {
    return this._gridHTML;
  }

  getCellById(id) {
    return this._cellDictionary[id];
  }

  displayMines(mineIds) {
    mineIds.forEach(mineId => {
      this._cellDictionary[mineId].displayMine();
    });
  }

  _createCellDictionary(cellIds) {
    cellIds.forEach(id => {
      const cell = new GridCell(id);
      this._cellDictionary[id] = cell;
      this._gridHTML.appendChild(cell.cellHTML);
    });
  }

  _createGridHTML(gridSize) {
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

export default Grid;
