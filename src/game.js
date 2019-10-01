// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.board = new Board(4, 4);
    this.grid = [];
  }

  renderGrid() {
    this.board.createGrid(this.ctx);
    this.board.renderGrid(this.ctx);
  }

  renderRow() {
    this.board.renderRow(this.ctx);
  }
}

export default Game;
