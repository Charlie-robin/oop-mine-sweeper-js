import Grid from "./view/Grid.js";

const mines = 10;
const gridSize = 3;

const grid = new Grid(10, 10, document.querySelector(".grid"));
grid.generateGrid();
document.querySelector(".grid").addEventListener("click", event => {
  if (event.target.id) {
    grid.displayCell(event.target.id);
  }
});
