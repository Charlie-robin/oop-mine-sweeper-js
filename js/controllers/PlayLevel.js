import CellDatabase from "../models/cell/CellDatabase.js";
import GridDisplay from "../views/cell/GridDisplay.js";
import Grid from "../views/cell/Grid.js";

class PlayLevel {
  constructor(mineCount, gridSize, handleLevelPlayed, playerHTML) {
    this._mineCount = mineCount;
    this._cellTotal = gridSize * gridSize;
    this._gridDisplay = new GridDisplay(mineCount, this._cellTotal);
    this._cellDatabase = new CellDatabase(mineCount, gridSize);
    this._grid = new Grid(this._cellDatabase.getAllCellIds(), gridSize);
    this._target = document.body;
    this._target.classList.add("game");
    this._flagsPlaced = 0;
    this._cellHandler = this._handleRevealCell.bind(this);
    this._flagHandler = this._handleFlagCell.bind(this);
    this._handleLevelPlayed = handleLevelPlayed;
    this._playerHTML = playerHTML;
  }

  display() {
    this._target.appendChild(this._gridDisplay.displayHTML);
    this._target.appendChild(this._grid.gridHTML);
    this._target.appendChild(this._playerHTML);
    this._grid.gridHTML.addEventListener("click", this._cellHandler);
    this._grid.gridHTML.addEventListener("contextmenu", this._flagHandler);
  }

  _handleRevealCell(event) {
    const id = event.target.id;
    if (!id) return;

    if (this._cellDatabase.isUnableToReveal(id)) return;

    if (this._cellDatabase.isMineCell(id)) {
      this._handleMineCell(event);
      return;
    }

    this._handleDisplayCell(id, this._cellDatabase.getCellValueById(id));
    this._handleSurroundingCells(id);
    this._gridDisplay.updateCellsLeft(this._cellDatabase.visibleCellIds.size);

    if (this._isPlayOver()) {
      alert("END");
      this._handleLevelPlayed(220);
    }
  }

  _handleFlagCell(event) {
    event.preventDefault();

    if (!event.target.id && !event.target.parentElement.id) return;

    const cellId = event.target.id ? event.target.id : event.target.parentElement.id;
    const cellData = this._cellDatabase.getCellDataById(cellId);

    if (cellData.isVisible) return;

    if (cellData.isFlagged) {
      this._grid.toggleFlagById(cellId);
      this._flagsPlaced--;
    } else if (this._flagsPlaced < this._mineCount) {
      this._grid.toggleFlagById(cellId);
      this._flagsPlaced++;
    }

    cellData.toggleIsFlagged();
    this._gridDisplay.updateFlagsLeft(this._mineCount - this._flagsPlaced);
    if (this._isPlayOver()) {
      alert("END");
      this._handleLevelPlayed(220);
    }
  }

  _isPlayOver() {
    const currentCellTotal = this._cellDatabase.visibleCellIds.size + this._flagsPlaced;

    return currentCellTotal === this._cellTotal;
  }

  _handleMineCell(event) {
    alert("Mine");
    this._cellDatabase.updateMines();
    this._grid.displayMines(this._cellDatabase.mineIds);
    this._cellDatabase.getFlaggedCellData().forEach(el => console.log(el.id));
    this._grid.gridHTML.removeEventListener("click", this._cellHandler);
    this._grid.gridHTML.removeEventListener("contextmenu", this._flagHandler);
    this._handleLevelPlayed(220);
  }

  _handleSurroundingCells(id) {
    const initialCellData = this._cellDatabase.getCellDataById(id);
    if (initialCellData.value !== 0) return;

    const ids = new Set([...initialCellData.getAllSurroundingCells()]);

    ids.forEach((id, _, array) => {
      const cellData = this._cellDatabase.getCellDataById(id);

      if (cellData.value === 0 && !cellData.isVisible && !cellData.isFlagged) {
        this._handleDisplayCell(id, cellData.value);
        cellData.getCardinalCells().forEach(cellId => array.add(cellId));
      }

      if (cellData.value > 0 && !cellData.isFlagged) {
        this._handleDisplayCell(id, cellData.value);
      }
    });
  }

  _handleDisplayCell(id, value) {
    this._grid.displayCellById(id, value);
    this._cellDatabase.updateVisibleCellIds(id);
  }
}

export default PlayLevel;
