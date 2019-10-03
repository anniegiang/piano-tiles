// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimentions = { width: canvas.width, height: canvas.height };

    this.registerEvents();
    this.start();
  }

  start() {
    this.board = new Board(this.dimentions, 4, 4);
    // this.move = this.board.move; // false at the start
    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }

  click(e) {
    if (this.board.isValidTargetBoundary(e.offsetX, e.offsetY)) {
      console.log("valid click :)");
      this.play();
    } else {
      console.log("invalid click :(");
    }
  }

  play() {
    console.log("play!");
    this.board.move = !this.board.move;
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.update();
    this.animateGrid();

    if (!this.board.move) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  update() {
    if (this.board.move) {
      this.board.moveRows();
    }
  }

  animateGrid() {
    this.board.animate(this.ctx);
  }
}

export default Game;
