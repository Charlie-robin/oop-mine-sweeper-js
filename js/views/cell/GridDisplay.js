class GridDisplay {
  constructor(flagsLeft, cellTotal) {
    this._cellTotal = cellTotal;
    this._cellsClearedHTML = document.createElement("p");
    this._cellsClearedHTML.textContent = `Cells cleared : 0/${cellTotal}`;
    this._flagsLeftHTML = document.createElement("p");
    this._flagsLeftHTML.textContent = `Flags left : ${flagsLeft}`;
    this._displayHTML = document.createElement("div");
    this._displayHTML.appendChild(this._cellsClearedHTML);
    this._displayHTML.appendChild(this._flagsLeftHTML);
  }

  get displayHTML() {
    return this._displayHTML;
  }

  updateCellsLeft(cellsLeft) {
    this._cellsClearedHTML.textContent = `Cells cleared : ${cellsLeft}/${this._cellTotal}`;
  }

  updateFlagsLeft(flagsLeft) {
    this._flagsLeftHTML.textContent = `Flags left : ${flagsLeft}`;
  }
}

export default GridDisplay;
