import GridCell from "./GridCell.js";

class Grid {
  constructor(cellIds, gridSize) {
    this._gridHTML = document.createElement("div");
    this._gridHTML.classList.add("grid");
    this._gridHTML.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    this._cellDictionary = {};
    this._createGrid(cellIds);
  }

  _createGrid(cellIds) {
    cellIds.forEach(id => {
      const cell = new GridCell(id);
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

  displayMines(mineIds) {
    mineIds.forEach(mineId => {
      this._cellDictionary[mineId].displayMine();
    });
  }
}

export default Grid;
