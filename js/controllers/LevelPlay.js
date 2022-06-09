import CellDatabase from "../models/cell/CellDatabase.js";
import GridDisplay from "../views/grid/GridDisplay.js";
import Grid from "../views/grid/Grid.js";

class LevelPlay {
  constructor(mineCount, gridSize, target) {
    this._mineCount = mineCount;
    this._display = new GridDisplay(mineCount, gridSize * gridSize);
    this._cellDatabase = new CellDatabase(mineCount, gridSize);
    this._grid = new Grid(this._cellDatabase.getAllCellIds(), gridSize);
    this._score = 0;
    this._target = target ? target : document.body;
    this._flagsPlaced = 0;
  }

  play() {
    this._target.appendChild(this._display.displayHTML);
    this._target.appendChild(this._grid.gridHTML);
    this._grid.gridHTML.addEventListener("click", this._handleRevealCell.bind(this));
    this._grid.gridHTML.addEventListener("contextmenu", this._handleFlagCell.bind(this));
  }

  _handleRevealCell(event) {
    if (!event.target.id) return;

    const cell = this._grid.getCellById(event.target.id);
    const cellData = this._cellDatabase.getCellDataById(event.target.id);

    if (cellData.isVisible || cellData.isFlagged) return;

    if (cellData.isBomb) {
      this._handleBombCell(cell, cellData);
      return;
    }

    this._handleDisplayCell(cell, cellData);
    this._handleSurroundingCells(cellData);
    this._display.updateCellsLeft(this._cellDatabase.visibleCellIds.size);
  }

  _handleFlagCell(event) {
    event.preventDefault();

    if (!event.target.id && !event.target.parentElement.id) return;

    const cellId = event.target.id ? event.target.id : event.target.parentElement.id;
    const cell = this._grid.getCellById(cellId);
    const cellData = this._cellDatabase.getCellDataById(cellId);

    if (cellData.isVisible) return;

    if (cellData.isFlagged) {
      cell.removeFlag();
      this._flagsPlaced--;
    } else if (this._flagsPlaced < this._mineCount) {
      cell.displayFlag();
      this._flagsPlaced++;
    }
    cellData.toggleIsFlagged();
    this._display.updateFlagsLeft(this._mineCount - this._flagsPlaced);
  }

  _handleBombCell(cell, cellData) {
    alert("BOMB");
    this._cellDatabase.updateMines();
    this._grid.displayBombs(this._cellDatabase.mineIds);
  }

  _handleSurroundingCells(initialCellData) {
    if (initialCellData.value !== 0) return;

    const ids = new Set([...initialCellData.getAllSurroundingCells()]);

    ids.forEach((id, _, array) => {
      const cellData = this._cellDatabase.getCellDataById(id);
      const cell = this._grid.getCellById(id);

      if (cellData.value === 0 && !cellData.isVisible) {
        this._handleDisplayCell(cell, cellData);
        cellData.getCardinalCells().forEach(cellId => array.add(cellId));
      }

      if (cellData.value > 0 && !cellData.isFlagged) {
        this._handleDisplayCell(cell, cellData);
      }
    });
  }

  _handleDisplayCell(cell, cellData) {
    cell.displayCell(cellData.value);
    this._cellDatabase.updateVisibleCellIds(cellData.id);
  }
}

export default LevelPlay;
