class LevelSelect {
  constructor(levels) {
    this._levelHTML = document.createElement("div");
    levels.forEach(level => {
      const levelHTML = document.createElement("div");
      levelHTML.id = level.id;
      levelHTML.textContent = `Grid size:${level.gridSize} \n Mine count:${level.mineCount}`;
      this._levelHTML.appendChild(levelHTML);
    });
  }

  get levelHTML() {
    return this._levelHTML;
  }
}

export default LevelSelect;
