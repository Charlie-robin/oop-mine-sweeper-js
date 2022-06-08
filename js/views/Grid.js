import Cell from "./Cell.js";

class Grid {
  constructor(cellIds, gridSize) {
    this._gridHTML = document.createElement("div");
    this._gridHTML.classList.add("grid");
    this._gridHTML.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    this._cellDictionary = {};
    this.generateGrid(cellIds);
  }

  generateGrid(cellIds) {
    cellIds.forEach(id => {
      const cell = new Cell(id);
      this._cellDictionary[id] = cell;
      this._gridHTML.appendChild(cell.cellHTML);
    });
  }

  get gridHTML() {
    return this._gridHTML;
  }

  getCellById(id) {
    return this._cellDictionary[id];
  }

  displayBombs(bombIds) {
    bombIds.forEach(bombId => {
      this._cellDictionary[bombId].displayBomb();
    });
  }
}

export default Grid;