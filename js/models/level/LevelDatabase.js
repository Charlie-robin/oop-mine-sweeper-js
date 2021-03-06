import Ids from "../../utilities/Ids.js";
import LevelData from "./LevelData.js";

class LevelDatabase {
  constructor() {
    this._levelDictionary = {};
    this._createDatabase();
  }

  getLevelById(id) {
    return this._levelDictionary[id];
  }

  getLevels() {
    return Object.values(this._levelDictionary);
  }

  getLevelIds() {
    return Object.keys(this._levelDictionary);
  }
  
  _createDatabase() {
    const levelValues = [5, 10, 15];
    levelValues.forEach((levelValue, index) => {
      const id = Ids.createLevelId(index + 1);
      this._levelDictionary[id] = new LevelData(id, levelValue, levelValue);
    });
  }
}

export default LevelDatabase;
