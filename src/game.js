// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimentions = { width: canvas.width, height: canvas.height };
    this.registerEvents();
    this.restart();
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.board.animate(this.ctx);

    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }

  click(e) {
    if (!this.running) {
      // play if  not running & the mouse click is clicked on the target
      this.play();
      // console.log(this.board.validBoundary());
      // console.log("x: ", e.offsetX);
      // console.log("y: ", e.offsetY);
    }
  }

  restart() {
    this.running = false;
    this.board = new Board(this.dimentions, 4, 4);
    this.animate();
  }

  play() {
    this.running = true;
    this.animate();
  }
}

export default Game;
