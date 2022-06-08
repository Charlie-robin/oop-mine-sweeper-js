import CellDatabase from "../models/CellDatabase.js";
import Display from "../views/Display.js";
import Grid from "../views/Grid.js";

class Game {
  constructor(mineCount, gridSize, target) {
    this._mineCount = mineCount;
    this._display = new Display(mineCount, gridSize * gridSize);
    this._cellDatabase = new CellDatabase(mineCount, gridSize);
    this._grid = new Grid(this._cellDatabase.getAllCellIds(), gridSize);
    this._score = 0;
    this._total = gridSize * gridSize;
    this._target = target ? target : document.body;
    this._flagsPlaced = 0;
  }

  init() {
    this._target.appendChild(this._display.displayHTML);
    this._target.appendChild(this._grid.gridHTML);
    this._grid.gridHTML.addEventListener("click", this.handleRevealCell.bind(this));
    this._grid.gridHTML.addEventListener("contextmenu", this.handleFlagCell.bind(this));
  }

  handleRevealCell(event) {
    if (!event.target.id) return;

    const cell = this._grid.getCellById(event.target.id);
    const cellData = this._cellDatabase.getCellDataById(event.target.id);

    if (!cellData.isHidden || cellData.isFlagged) return;

    if (cellData.isBomb) {
      this.handleBombCell(cell, cellData);
      return;
    }

    this.handleDisplayCell(cell, cellData);

    if (cellData.value === 0) {
      this.handleSurroundingCells(cellData.getAllSurroundingCells());
    }

    this._display.updateCellsLeft(this._score);
  }

  handleFlagCell(event) {
    event.preventDefault();

    if (!event.target.id && !event.target.parentElement.id) return;

    const cellId = event.target.id ? event.target.id : event.target.parentElement.id;
    const cell = this._grid.getCellById(cellId);
    const cellData = this._cellDatabase.getCellDataById(cellId);

    if (!cellData.isHidden) return;

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

  handleBombCell(cell, cellData) {
    alert("BOMB");
    const mineLocations = this._cellDatabase.mineLocations;

    this._grid.displayBombs(this._cellDatabase.mineLocations);
  }

  handleSurroundingCells(surroundingIds) {
    const ids = new Set([...surroundingIds]);

    ids.forEach((id, _, array) => {
      const cellData = this._cellDatabase.getCellDataById(id);
      const cell = this._grid.getCellById(id);

      if (cellData.value === 0 && cellData.isHidden) {
        this.handleDisplayCell(cell, cellData);
        cellData.getCardinalCells().forEach(cellId => array.add(cellId));
      }

      if (cellData.value > 0 && !cellData.isFlagged) {
        this.handleDisplayCell(cell, cellData);
      }
    });
  }

  handleDisplayCell(cell, cellData) {
    cell.displayCell(cellData.value);
    cellData.isHidden = false;
    this._score++;
  }
}

export default Game;
