import Cell from "../model/Cell.js";
import SurroundingCells from "../model/SurroundingCells.js";

class Grid {
  constructor(mineCount, gridSize, gridHTML) {
    this._mineCount = mineCount;
    this._gridSize = gridSize;
    this._cellDictionary = {};
    this._mineLocations = new Set();
    if (!gridHTML) {
      this._gridHTML = document.createElement("div");
      this._gridHTML.classList.add("grid");
    } else {
      this._gridHTML = gridHTML;
    }
  }

  generateGrid() {
    for (let index = 0; index < this._gridSize; index++) {
      for (let inner = 0; inner < this._gridSize; inner++) {
        const id = Cell.createCellId(index, inner);
        const surroundingCells = new SurroundingCells(index, inner, this._gridSize);
        const cell = new Cell(id, surroundingCells);
        this._cellDictionary[id] = cell;
        this._gridHTML.appendChild(cell.cellHTML);
      }
    }
    this.generateMines();
  }

  getRandomRowCol() {
    return [Math.floor(Math.random() * this._gridSize), Math.floor(Math.random() * this._gridSize)];
  }

  generateMines() {
    while (this._mineLocations.size < this._mineCount) {
      const [row, col] = this.getRandomRowCol();
      const id = Cell.createCellId(row, col);
      if (!this._mineLocations.has(id)) {
        this._mineLocations.add(id);
        const cell = this._cellDictionary[id];
        cell.setMine();
        this.handleIncrementCells(cell);
      }
    }
  }

  getCellById(id) {
    return this._cellDictionary[id];
  }

  handleIncrementCells(cell) {
    cell.getSurroundingCells().forEach(cellId => this._cellDictionary[cellId].incrementValue());
  }

  handleSurroundingCells(cell) {
    let ids = new Set([...cell.getSurroundingCells()]);

    ids.forEach((id, _, array) => {
      const cell = this._cellDictionary[id];

      if (cell.value === 0 && cell.isHidden) {
        cell.handleDisplay();
        cell.surroundingCells.cardinalCells.forEach(cellId => array.add(cellId));
      }

      if (cell.value > 0) {
        cell.handleDisplay();
      }
    });

    return ids.size;
  }
}

export default Grid;
