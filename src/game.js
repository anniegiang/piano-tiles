// Controller

import Board from "./board";

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimentions = { width: canvas.width, height: canvas.height };
    this.gameOver = false;
    this.totalSec = 6000;
    this.endSec = 0;
    this.timer = 0;
    this.resetCounter();
    this.resetTimer();
    this.registerEvents();
    this.start();
  }

  start() {
    this.board = new Board(this.dimentions, 4, 4);
    this.animate();
  }

  registerEvents() {
    const playBtn = document.querySelector("#play-btn");

    this.boundClickHandler = this.click.bind(this);
    this.boundRestartHandler = this.restart.bind(this);

    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    playBtn.addEventListener("click", this.boundRestartHandler);
  }

  restart() {
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    this.gameOver = false;
    this.resetTimer();
    this.resetCounter();

    this.start();
  }

  click(e) {
    if (
      !this.gameOver &&
      this.board.isValidTargetBoundary(e.offsetX, e.offsetY)
    ) {
      this.play();
    } else {
      this.ctx.canvas.removeEventListener("mousedown", this.boundClickHandler);
      this.board.renderWrongTile(this.ctx, e.offsetX, e.offsetY);
      this.gameOver = true;
      this.startTimer = false;
      this.count = 0;
    }
  }

  play() {
    this.board.move = !this.board.move;
    this.startTimer = true;
    this.startCount = true;
    this.lastTime = Date.now();
    this.renderCount();
    this.animate();
  }

  animate() {
    let dt = Date.now() - this.lastTime;
    this.lastTime = Date.now();
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.animateGrid();
    this.updateGrid();
    this.renderTime(dt);
    if (!this.gameOver && !this.board.move) {
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

  renderTime(dt) {
    const timer = document.querySelector("#timer");
    // console.log(dt);

    if (this.startTimer) {
      // this.endSec = ts + this.totalSec;
      if (!dt) return;
      this.totalSec -= dt;
      timer.textContent = this.totalSec;
    }
    // } else {
    //   if (ts >= this.endSec) {
    //     // this.startTimer = true;
    //     this.gameOver = true;
    //   }
    // }

    // this.timer = this.endSec - ts;

    // timer.textContent = this.second + "." + this.millSec-- + "''";
    //   if (!ts) return;
    //   this.second = this.second - ts;
    if (this.totalSec <= 0) {
      this.totalSec = 6000;
      timer.textContent = 0;
      this.gameOver = true;
      this.startTimer = false;
    }
    // } else {
    //   this.gameOver = false;
    // }
  }

  resetTimer() {
    const timer = document.querySelector("#timer");
    this.totalSec = 6000;
    this.millSec = 999;
    this.startTimer = false;
    timer.textContent = this.totalSec + "." + "000" + "''";
  }

  resetCounter() {
    this.startCount = false;
    this.count = 0;
    counter.innerText = 0;
  }
}

export default Game;
