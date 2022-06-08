import Colors from "../utilities/Colors.js";

class Cell {
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
    this.setBackgroundColor(value);
  }

  displayBomb() {
    const img = document.createElement("img");
    img.src = "../../assets/mine.svg";
    this._cellHTML.appendChild(img);
    this.setBackgroundColor("bomb");
  }

  displayFlag() {
    const img = document.createElement("img");
    img.src = "../../assets/flag.svg";
    this._cellHTML.appendChild(img);
  }

  removeFlag() {
    this._cellHTML.innerHTML = "";
  }

  setBackgroundColor(value) {
    switch (value) {
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
}

export default Cell;
