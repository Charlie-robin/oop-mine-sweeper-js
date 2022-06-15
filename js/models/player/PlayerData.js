class PlayerData {
  constructor(level = 1, experience = 0, coins = 0) {
    this._level = level;
    this._experience = experience;
    this._goal = this._level * 100 * 1.25;
    this._coins = coins;
  }

  get level() {
    return this._level;
  }

  getExperience() {
    return { current: this._experience, goal: this._goal };
  }

  gainExperience(experience = 0) {
    this._experience += experience;

    if (this._experience > this._goal) {
      this._experience -= this._goal;
      this._levelUp();
      this.gainExperience();
    }
  }

  _levelUp() {
    this._level++;
    this._goal = this._level * 100 * 1.25;
  }

  getAllFields() {
    return Object.values(this);
  }
}

export default PlayerData;
