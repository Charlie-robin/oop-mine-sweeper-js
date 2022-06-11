import LevelDatabase from "../models/level/LevelDatabase.js";
import LevelSelect from "../views/level/LevelSelect.js";

class SelectLevel {
  constructor(handleLevelSelect) {
    this._levelDataBase = new LevelDatabase();
    this._levelSelect = new LevelSelect(this._levelDataBase.getLevels());
    this._levelSelect.levelHTML.addEventListener("click", this._handleSelectLevel.bind(this));
    this._target = document.body;
    this.handleLevelSelect = handleLevelSelect;
  }

  display() {
    this._target.innerHTML = "";
    const levelSelectHTML = this._levelSelect.levelHTML;
    this._target.appendChild(levelSelectHTML);
  }

  _handleSelectLevel(event) {
    if (!event.target.id) return;
    const selectedLevel = this._levelDataBase.getLevelById(event.target.id);
    this.handleLevelSelect(selectedLevel);
  }
}

export default SelectLevel;
