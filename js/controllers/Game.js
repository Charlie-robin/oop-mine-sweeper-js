import LevelDatabase from "../models/level/LevelDataBase.js";
import LevelSelect from "../views/level/LevelSelect.js";
import LevelPlay from "./LevelPlay.js";

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

  startSelectedLevel() {
    this._target.innerHTML = "";
    this._selectedLevel.start();
  }

  _handleSelectLevel(event) {
    if (!event.target.id) return;
    const levelData = this._levelDataBase.getLevelById(event.target.id);
    this._selectedLevel = new LevelPlay(levelData.mineCount, levelData.gridSize);
    this.startSelectedLevel();
  }
}

export default Game;
