import Colors from "../../utilities/Colors.js";

class GridCell {
  constructor(id) {
    this._id = id;
    this._cellHTML = document.createElement("div");
    this._cellHTML.id = id;
    this._cellHTML.classList.add("cell");
  }

  get cellHTML() {
    return this._cellHTML;
  }

  displayCell(value) {
    if (value !== 0) {
      this._cellHTML.innerHTML = value;
    }
    this._setBackgroundColor(value);
  }

  displayMine() {
    const img = document.createElement("img");
    img.src = "../../assets/mine.svg";
    this._cellHTML.appendChild(img);
    this._setBackgroundColor("mine");
  }

  displayFlag() {
    const img = document.createElement("img");
    img.src = "../../assets/flag.svg";
    this._cellHTML.appendChild(img);
    this._setBackgroundColor("flag");
  }

  removeFlag() {
    this._cellHTML.innerHTML = "";
    this._setBackgroundColor();
  }

  _setBackgroundColor(value) {
    switch (value) {
      case 0:
        this._cellHTML.style.backgroundColor = Colors.EMPTY;
        break;
      case 1:
        this._cellHTML.style.backgroundColor = Colors.LOW;
        break;
      case 2:
        this._cellHTML.style.backgroundColor = Colors.MEDIUM;
        break;
      case 3:
      case 4:
      case "mine":
        this._cellHTML.style.backgroundColor = Colors.HIGH;
        break;
      case "flag":
        this._cellHTML.style.backgroundColor = Colors.FLAG;
        break;
      default:
        this._cellHTML.style.backgroundColor = Colors.HIDDEN;
        break;
    }
  }
}

export default GridCell;
