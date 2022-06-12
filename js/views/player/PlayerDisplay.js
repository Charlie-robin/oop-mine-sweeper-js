class PlayerDisplay {
  constructor(level, experience, coins) {
    this._displayHTML = document.createElement("div");
    this._levelHTML = document.createElement("p");
    this._levelHTML.textContent = `Level : ${level}`;
    this._experienceHTML = document.createElement("p");
    this._experienceHTML.textContent = `Experience : ${experience}`;
    this._displayHTML.appendChild(this._levelHTML);
    this._displayHTML.appendChild(this._experienceHTML);
  }

  updateDisplay(level, experience) {
    this._levelHTML.textContent = `Level : ${level}`;
    this._experienceHTML.textContent = `Experience : ${experience}`;
  }
}

export default PlayerDisplay;
