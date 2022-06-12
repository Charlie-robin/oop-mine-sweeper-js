class CellGridInfo {
  constructor(flagsLeft, cellTotal) {
    this._cellTotal = cellTotal - flagsLeft;
    this._cellsClearedHTML = document.createElement("p");
    this._cellsClearedHTML.textContent = `Cells cleared : 0/${this._cellTotal}`;
    this._flagsLeftHTML = document.createElement("p");
    this._flagsLeftHTML.textContent = `Flags left : ${flagsLeft}`;
    this._cellGridInfoHTML = document.createElement("div");
    this._cellGridInfoHTML.appendChild(this._cellsClearedHTML);
    this._cellGridInfoHTML.appendChild(this._flagsLeftHTML);
  }

  get cellGridInfoHTML() {
    return this._cellGridInfoHTML;
  }

  updateCellsLeft(cellsLeft) {
    this._cellsClearedHTML.textContent = `Cells cleared : ${cellsLeft}/${this._cellTotal}`;
  }

  updateFlagsLeft(flagsLeft) {
    this._flagsLeftHTML.textContent = `Flags left : ${flagsLeft}`;
  }
}

export default CellGridInfo;
