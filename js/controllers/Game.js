import LevelDatabase from "../models/level/LevelDatabase.js";
import LevelSelect from "../views/level/LevelSelect.js";
import PlayLevel from "./PlayLevel.js";

class Game {
  constructor() {
    this._levelDataBase = new LevelDatabase();
    this._levelSelect = new LevelSelect(this._levelDataBase.getLevels());
    this._levelSelect.levelHTML.addEventListener("click", this._handleSelectLevel.bind(this));
    this._selectedLevel = null;
    this._target = document.body;
  }

  displayLevels() {
    this._target.innerHTML = "";
    const levelSelectHTML = this._levelSelect.levelHTML;
    this._target.appendChild(levelSelectHTML);
  }

  _startSelectedLevel() {
    this._target.innerHTML = "";
    this._selectedLevel.play();
  }

  _handleSelectLevel(event) {
    if (!event.target.id) return;
    const levelData = this._levelDataBase.getLevelById(event.target.id);
    this._selectedLevel = new PlayLevel(levelData.mineCount, levelData.gridSize);
    this._startSelectedLevel();
  }
}

export default Game;
