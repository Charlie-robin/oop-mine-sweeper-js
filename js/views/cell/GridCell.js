import Colors from "../../utilities/Colors.js";

class GridCell {
  constructor(id) {
    this._id = id;
    this._cellHTML = document.createElement("div");
    this._cellHTML.id = id;
    this._cellHTML.classList.add("cell");
    // this._cellHTML.innerHTML = id;
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
    if (!this._cellHTML.hasChildNodes()) {
      const img = document.createElement("img");
      //   QUICK FIX
      img.src = "https://charlie-robin.github.io/oop-mine-sweeper-js/assets/mine.svg";
      this._cellHTML.appendChild(img);
      this._setBackgroundColor("mine");
    } else {
      this._setBackgroundColor("success");
    }
  }

  toggleFlag() {
    if (!this._cellHTML.hasChildNodes()) {
      const img = document.createElement("img");
      //   QUICK FIX
      img.src = "https://charlie-robin.github.io/oop-mine-sweeper-js/assets/flag.svg";
      this._cellHTML.appendChild(img);
      this._setBackgroundColor("flag");
    } else {
      this._cellHTML.innerHTML = "";
      this._setBackgroundColor("hidden");
    }
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
      case "hidden":
        this._cellHTML.style.backgroundColor = Colors.HIDDEN;
        break;
      case "flag":
        this._cellHTML.style.backgroundColor = Colors.FLAG;
        break;
      case "success":
        this._cellHTML.style.backgroundColor = Colors.SUCCESS;
        break;
      default:
        this._cellHTML.style.backgroundColor = Colors.HIGH;
        break;
    }
  }
}

export default GridCell;
