import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.board = new Board(this.dimentions);
  }

  renderBoard() {
    this.board.renderTile();
  }
}

export default Game;