import Cell from "./Cell.js";

class Grid {
  constructor(cellIds) {
    this._gridHTML = document.createElement("div");
    this._gridHTML.classList.add("grid");
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
}

export default Grid;
