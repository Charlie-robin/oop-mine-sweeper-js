import CellData from "./CellData.js";

class CellDatabase {
  constructor(mineCount, gridSize) {
    this._mineCount = mineCount;
    this._gridSize = gridSize;
    this._cellDataDictionary = {};
    this._mineLocations = new Set();
    this._generateGrid();
  }

  get mineLocations() {
    return this._mineLocations;
  }

  updateMines() {
    this._mineLocations.forEach(mine => (this._cellDataDictionary[mine].isHidden = true));
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
    while (this._mineLocations.size < this._mineCount) {
      const [row, col] = this._getRandomRowCol();
      const id = CellData.createCellId(row, col);
      if (!this._mineLocations.has(id)) {
        this._mineLocations.add(id);
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
