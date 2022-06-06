import Grid from "./view/Grid.js";

const mines = 10;
const gridSize = 3;
const reset = document.getElementById("reset");
const grid = new Grid(10, 10, document.querySelector(".grid"));
grid.generateGrid();
document.querySelector(".grid").addEventListener("click", event => {
  if (!event.target.id) return;

  const cell = grid.getCellById(event.target.id);

  cell.handleDisplay();

  if (cell.isBomb) {
    alert("BOMB");
    return;
  }

  if (cell.value > 0) {
    return;
  }

  grid.handleSurroundingCells(cell);
});

reset.addEventListener("click", () => window.location.reload());
