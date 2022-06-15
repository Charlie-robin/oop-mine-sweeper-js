import PlayerData from "../models/player/PlayerData.js";
import PlayerDisplay from "../views/player/PlayerDisplay.js";

class Player {
  constructor() {
    this._playerData = new PlayerData();
    this._playerDisplay = new PlayerDisplay(...this._playerData.getAllFields());
  }

  handleGameEnd(experience) {
    this._playerData.gainExperience(experience);
    this._playerDisplay.updateDisplay(this._playerData.level, this._playerData.getExperience());
  }

  getPlayerDisplayHTML() {
    return this._playerDisplay._displayHTML;
  }
}

export default Player;
