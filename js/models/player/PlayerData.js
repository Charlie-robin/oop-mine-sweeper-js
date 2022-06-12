class PlayerData {
  constructor(level = 1, experience = 0, coins = 0) {
    this._level = level;
    this._experience = experience;
    this._coins = coins;
  }

  get level() {
    return this._level;
  }

  get experience() {
    return this._experience;
  }

  gainExperience(experience) {
    this._experience += experience;
    while (this._experience > 100) {
      this._incrementLevel();
      this._experience -= 100;
    }
  }

  _incrementLevel() {
    this._level++;
  }

  getAllFields() {
    return Object.values(this);
  }
}

export default PlayerData;
