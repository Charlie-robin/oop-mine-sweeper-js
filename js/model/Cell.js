import Colors from "./Colors.js";

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
    this.handleDisplay();
  }

  incrementValue() {
    if (!this._isBomb) {
      this._value++;
    }
    // this.display();
  }

  handleDisplay() {
    this._isHidden = true;
    if (this.isBomb) {
      this.setBomb();
    } else if (this._value !== 0) {
      this._cellHTML.innerHTML = this._value;
    }
    this.setBackgroundColor();
  }

  setBomb() {
    const img = document.createElement("img");
    img.src = "../../assets/mine.svg";
    this._cellHTML.appendChild(img);
  }

  setBackgroundColor() {
    switch (this._value) {
      case 1:
        this._cellHTML.style.backgroundColor = Colors.LOW;
        break;
      case 2:
        this._cellHTML.style.backgroundColor = Colors.MEDIUM;
        break;
      case 3:
      case "bomb":
        this._cellHTML.style.backgroundColor = Colors.HIGH;
        break;
      default:
        this._cellHTML.style.backgroundColor = Colors.EMPTY;
        break;
    }
  }

  static createCellId(row, col) {
    return `row:${row}-col:${col}`;
  }
}

export default Cell;
