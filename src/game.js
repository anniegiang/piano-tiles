import Tile from "./tile";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
  }

  createTile() {
    let dimentions = { width: 100, height: 300 };
    let t = new Tile(dimentions, "black");
    t.drawTile(this.ctx);
  }
}

export default Game;
