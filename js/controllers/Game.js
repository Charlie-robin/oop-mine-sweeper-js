import CellDatabase from "../models/CellDatabase.js";
import Grid from "../view/Grid.js";

class Game {
  constructor(mineCount, gridSize, target) {
    this._cellDatabase = new CellDatabase(mineCount, gridSize);
    this._grid = new Grid(this._cellDatabase.getCellIds());
    this._score = 0;
    this._total = gridSize * gridSize;
    this._target = target ? target : document.body;
  }

  init() {
    this._target.appendChild(this._grid.gridHTML);
    this._grid.gridHTML.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(event) {
    if (!event.target.id) return;

    const cell = this._grid.getCellById(event.target.id);
    const cellData = this._cellDatabase.getCellDataById(event.target.id);

    if (!cellData.isHidden) {
      return;
    }

    this.handleDisplayCell(cell, cellData);
    
    if (cellData.isBomb) {
      alert("BOMB");
      return;
    }

    if (cellData.value === 0) {
      this.handleSurroundingCells(cellData.getAllSurroundingCells());
    }
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

      if (cellData.value > 0) {
        this.handleDisplayCell(cell, cellData);
      }
    });
  }

  handleDisplayCell(cell, cellData) {
    cell.handleDisplay(cellData.isBomb, cellData.value);
    cellData.isHidden = false;
    this._score++;
  }
}

export default Game;
