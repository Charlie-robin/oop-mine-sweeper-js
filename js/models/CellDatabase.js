import CellData from "./CellData.js";

class CellDatabase {
  constructor(mineCount, gridSize) {
    this._mineCount = mineCount;
    this._gridSize = gridSize;
    this._cellDataDictionary = {};
    this._mineIds = new Set();
    this._visibleCellIds = new Set();
    this._generateGrid();
  }

  get mineIds() {
    return this._mineIds;
  }

  get visibleCellIds() {
    return this._visibleCellIds;
  }

  updateVisibleCellIds(id) {
    this._visibleCellIds.add(id);
    this.getCellDataById(id).isVisible = true;
  }

  updateMines() {
    this._mineIds.forEach(mine => (this._cellDataDictionary[mine].isVisible = true));
  }

  _generateGrid() {
    for (let index = 0; index < this._gridSize; index++) {
      for (let inner = 0; inner < this._gridSize; inner++) {
        const id = CellData.createCellId(index, inner);
        const cellData = new CellData(id, index, inner, this._gridSize);
        this._cellDataDictionary[id] = cellData;
      }
    }
    this._generateMines();
  }

  _generateMines() {
    while (this._mineIds.size < this._mineCount) {
      const [row, col] = this._getRandomRowCol();
      const id = CellData.createCellId(row, col);
      if (!this._mineIds.has(id)) {
        this._mineIds.add(id);
        const cellData = this._cellDataDictionary[id];
        cellData.setMine();
        this._incrementSurroundingCells(cellData);
      }
    }
  }

  getCellDataById(id) {
    return this._cellDataDictionary[id];
  }

  getAllCellIds() {
    return Object.keys(this._cellDataDictionary);
  }

  _getRandomRowCol() {
    return [Math.floor(Math.random() * this._gridSize), Math.floor(Math.random() * this._gridSize)];
  }

  _incrementSurroundingCells(cell) {
    cell.getAllSurroundingCells().forEach(cellId => this._cellDataDictionary[cellId].incrementValue());
  }
}

export default CellDatabase;
