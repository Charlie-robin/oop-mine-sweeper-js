import Cell from "./Cell.js";

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
        const id = this.getId(index, inner);
        const surroundingCells = this.generateSurroundingCells(index, inner);
        const cell = new Cell(id, surroundingCells);
        this._cellDictionary[id] = cell;
        this._gridHTML.appendChild(cell.cellHTML);
      }
    }
    this.generateMines();
  }

  getId(row, col) {
    return `row:${row}-col:${col}`;
  }

  getRandomRowCol() {
    return [Math.floor(Math.random() * this._gridSize), Math.floor(Math.random() * this._gridSize)];
  }

  generateSurroundingCells(index, inner) {
    const surroundingPositions = [
      [index - 1, inner - 1],
      [index - 1, inner],
      [index - 1, inner + 1],
      [index, inner - 1],
      [index, inner + 1],
      [index + 1, inner - 1],
      [index + 1, inner],
      [index + 1, inner + 1],
    ];

    const surroundCells = surroundingPositions.reduce((acc, position) => {
      const [row, col] = position;

      if (row >= 0 && row < this._gridSize && col >= 0 && col < this._gridSize) {
        acc.push(this.getId(row, col));
      }

      return acc;
    }, []);

    return surroundCells;
  }

  generateMines() {
    while (this._mineLocations.size < this._mineCount) {
      const [row, col] = this.getRandomRowCol();
      const id = this.getId(row, col);
      if (!this._mineLocations.has(id)) {
        this._mineLocations.add(id);
        const cell = this._cellDictionary[id];
        cell.setMine();
        cell.surroundingCells.forEach(cellId => this._cellDictionary[cellId].incrementValue());
      }
    }
    console.log(this._mineLocations);
  }

  displayCell(id) {
    const cell = this._cellDictionary[id];
    let ids = new Set([...cell.surroundingCells]);

    if (cell.isBomb) {
      alert("BOMB");
    }
    cell.display();

    ids.forEach((id, _, array) => {
      const cell = this._cellDictionary[id];
      if (cell.value === 0 && cell.isHidden) {
        cell.display();
        cell.surroundingCells.forEach(el => array.add(el))
      }
    });
  }
}

export default Grid;
