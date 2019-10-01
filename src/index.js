import Game from "./game";

const canvas = document.querySelector("#piano-tiles");

let game = new Game(canvas);

game.renderBoard();
