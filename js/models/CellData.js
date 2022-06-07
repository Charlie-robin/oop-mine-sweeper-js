import Colors from "../utilities/Colors.js";
import SurroundingCellIds from "./SurroundingCellIds.js";

class CellData {
  constructor(id, index, inner, gridSize) {
    this._id = id;
    this._surroundingCells = new SurroundingCellIds(index, inner, gridSize);
    this._value = 0;
    this._isBomb = false;
    this._isHidden = true;
  }

  get isHidden() {
    return this._isHidden;
  }

  get id() {
    return this._id;
  }

  set isHidden(value) {
    this._isHidden = value;
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
    this._value = "bomb";
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
