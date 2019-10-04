import Game from "./game";
import Tile from "./tile";

const canvas = document.querySelector("#piano-tiles");
const playBtn = document.querySelector("#play-btn");

let game = new Game(canvas);

const start = () => {
  game.play.bind(this);
};

