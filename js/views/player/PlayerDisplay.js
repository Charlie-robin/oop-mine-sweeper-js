class PlayerDisplay {
  constructor(level, experience, goal, coins) {
    this._displayHTML = document.createElement("div");
    this._levelHTML = document.createElement("p");
    this._levelHTML.textContent = `Level : ${level}`;
    this._experienceHTML = document.createElement("progress");
    this._experienceHTML.value = experience;
    this._experienceHTML.max = goal;
    this._displayHTML.appendChild(this._levelHTML);
    this._displayHTML.appendChild(this._experienceHTML);
  }

  updateDisplay(level, experience) {
    this._levelHTML.textContent = `Level : ${level}`;
    this._experienceHTML.value = experience.current;
    this._experienceHTML.max = experience.goal;
  }
}

export default PlayerDisplay;
