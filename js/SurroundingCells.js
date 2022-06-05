import Cell from "./Cell.js";

class SurroundingCells {
  constructor(index, inner, gridSize) {
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

    this._surroundingCells = surroundingPositions.reduce((acc, position) => {
      const [row, col] = position;

      if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        acc.push(Cell.createCellId(row, col));
      }

      return acc;
    }, []);
  }

  get surroundingCells() {
    return this._surroundingCells;
  }
}

export default SurroundingCells;
