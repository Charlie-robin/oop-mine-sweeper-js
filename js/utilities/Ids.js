class Ids {
  static createCellId(row, col) {
    return `row:${row}-col:${col}`;
  }

  static createLevelId(level) {
    return `level:${level}`;
  }
}

export default Ids;
