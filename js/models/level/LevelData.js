class LevelData {
  constructor(id, mineCount, gridSize) {
    this._id = id;
    this._mineCount = mineCount;
    this._gridSize = gridSize;
  }

  get mineCount() {
    return this._mineCount;
  }

  get gridSize() {
    return this._gridSize;
  }

  get id() {
    return this._id;
  }
}

export default LevelData;
