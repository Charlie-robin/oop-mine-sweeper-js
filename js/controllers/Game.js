import PlayLevel from "./PlayLevel.js";
import SelectLevel from "./SelectLevel.js";
import Player from "./Player.js";

class Game {
  constructor() {
    this._target = document.body;
    this._currentDisplay = new SelectLevel(this.handleLevelSelected.bind(this));
    this._currentDisplay.display();
    this._player = new Player();
  }

  handleLevelSelected(selectedLevel) {
    this._target.innerHTML = "";
    this._currentDisplay = new PlayLevel(
      selectedLevel.mineCount,
      selectedLevel.gridSize,
      this.handleLevelPlayed.bind(this),
      this._player.getPlayerDisplayHTML()
    );
    this._currentDisplay.display();
  }

  handleLevelPlayed(experience) {
    this._player.handleGameEnd(experience);
    this._target.innerHTML = "";
    this._currentDisplay = new SelectLevel(this.handleLevelSelected.bind(this));
    this._currentDisplay.display();
  }
}

export default Game;
