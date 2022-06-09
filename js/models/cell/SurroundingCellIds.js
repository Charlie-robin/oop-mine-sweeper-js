import Ids from "../../utilities/Ids.js";

class SurroundingCellIds {
  constructor(index, inner, gridSize) {
    const cornerCells = [
      [index - 1, inner - 1],
      [index - 1, inner + 1],
      [index + 1, inner - 1],
      [index + 1, inner + 1],
    ];

    const cardinalCells = [
      [index - 1, inner],
      [index, inner - 1],
      [index, inner + 1],
      [index + 1, inner],
    ];

    const surroundingCells = [...cardinalCells, ...cornerCells];

    this._cornerCells = this._getValidCellLocations(cornerCells, gridSize);
    this._cardinalCells = this._getValidCellLocations(cardinalCells, gridSize);
    this._surroundingCells = this._getValidCellLocations(surroundingCells, gridSize);
  }

  get surroundingCells() {
    return this._surroundingCells;
  }

  get cardinalCells() {
    return this._cardinalCells;
  }

  get cornerCells() {
    return this._cornerCells;
  }

  _getValidCellLocations(positions, gridSize) {
    return positions.reduce((acc, position) => {
      const [row, col] = position;

      if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
        acc.push(Ids.createCellId(row, col));
      }

      return acc;
    }, []);
  }
}

export default SurroundingCellIds;
