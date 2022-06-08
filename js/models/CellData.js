import Colors from "../utilities/Colors.js";
import SurroundingCellIds from "./SurroundingCellIds.js";

class CellData {
  constructor(id, index, inner, gridSize) {
    this._id = id;
    this._surroundingCells = new SurroundingCellIds(index, inner, gridSize);
    this._value = 0;
    this._isBomb = false;
    this._isVisible = false;
    this._isFlagged = false;
  }

  get isFlagged() {
    return this._isFlagged;
  }

  toggleIsFlagged() {
    this._isFlagged = !this._isFlagged;
  }

  get isVisible() {
    return this._isVisible;
  }

  get id() {
    return this._id;
  }

  set isVisible(value) {
    this._isVisible = value;
  }

  getAllSurroundingCells() {
    return this._surroundingCells.surroundingCells;
  }

  getCardinalCells() {
    return this._surroundingCells.cardinalCells;
  }

  get isBomb() {
    return this._isBomb;
  }

  get value() {
    return this._value;
  }

  setMine() {
    this._isBomb = true;
  }

  incrementValue() {
    if (!this._isBomb) {
      this._value++;
    }
  }

  static createCellId(row, col) {
    return `row:${row}-col:${col}`;
  }
}

export default CellData;
