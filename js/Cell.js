class Cell {
  constructor(id, surroundingCells) {
    this._id = id;
    this._surroundingCells = surroundingCells;
    this._value = 0;
    this._isBomb = false;
    this._isHidden = true;
    this._cellHTML = document.createElement("div");
    this._cellHTML.id = id;
    this._cellHTML.classList.add("cell");
  }

  get isHidden() {
    return this._isHidden;
  }

  get id() {
    return this._id;
  }

  get cellHTML() {
    return this._cellHTML;
  }

  getSurroundingCells() {
    return this._surroundingCells.surroundingCells;
  }

  get surroundingCells() {
    return this._surroundingCells;
  }

  get isBomb() {
    return this._isBomb;
  }

  get value() {
    return this._value;
  }

  setMine() {
    this._isBomb = true;
    this._value = "bomb";
    this.display();
  }

  incrementValue() {
    if (!this._isBomb) {
      this._value++;
    }
    // this.display();
  }

  display() {
    this._cellHTML.innerHTML = this._value;
    this._isHidden = true;

    if (this._value === 0) {
      this._cellHTML.style.backgroundColor = "unset";
    } else if (this._value > 0) {
      this._cellHTML.style.backgroundColor = "blue";
    }
  }

  static createCellId(row, col) {
    return `row:${row}-col:${col}`;
  }
}

export default Cell;