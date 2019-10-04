// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimentions = { width: canvas.width, height: canvas.height };
    this.gameOver = false;
    this.startTimer = false;
    this.startCount = false;
    this.second = 0;
    this.millSec = 0;
    this.count = 0;
    this.registerEvents();
    this.start();
  }

  start() {
    this.board = new Board(this.dimentions, 4, 4);
    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
  }

  click(e) {
    if (
      !this.gameOver &&
      this.board.isValidTargetBoundary(e.offsetX, e.offsetY)
    ) {
      this.play();
    } else {
      this.board.renderWrongTile(this.ctx, e.offsetX, e.offsetY);
      this.gameOver = true;
    }
  }

  play() {
    this.board.move = !this.board.move;
    this.startTimer = true;
    this.startCount = true;
    this.renderCount();
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.animateGrid();
    this.updateGrid();
    this.renderTime();
    if (!this.gameOver) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  updateGrid() {
    if (this.board.move) {
      this.board.moveRows();
    }
  }

  animateGrid() {
    this.board.animate(this.ctx);
  }

  renderCount() {
    const counter = document.querySelector("#counter");

    if (this.startCount) {
      counter.textContent = ++this.count;
    }
  }

  renderTime() {
    const timer = document.querySelector("#timer");
    if (this.startTimer) {
      timer.textContent = this.second + "." + this.millSec++ + "''";
      if (this.millSec >= 1000) {
        this.millSec = 0;
        this.second++;
      }
    } else {
      timer.textContent = this.second + "." + "000" + "''";
    }
  }
}

export default Game;
