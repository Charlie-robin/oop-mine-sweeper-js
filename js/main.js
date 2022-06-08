import Game from "./controllers/Game.js";

const reset = document.getElementById("reset");
reset.addEventListener("click", () => window.location.reload());
const game = new Game(5, 5);

game.init();
