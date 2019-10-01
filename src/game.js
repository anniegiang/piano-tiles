// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.board = new Board(4, 4);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.board.animate(this.ctx);
  }

  start() {
    this.board.renderGrid(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Game;
