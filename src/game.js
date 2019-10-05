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
    this.boundkeyPressHandler = this.keyPress.bind(this);
    this.boundRestartHandler = this.restart.bind(this);

    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    document.addEventListener("keydown", this.boundkeyPressHandler);
    playBtn.addEventListener("click", this.boundRestartHandler);
  }

  restart() {
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    this.gameOver = false;
    this.resetTimer();
    this.resetCounter();
    this.start();
  }

  keyPress(e) {
    if (!this.gameOver && this.board.validPress(e.keyCode)) {
      this.play();
    } else {
      this.ctx.canvas.removeEventListener("mousedown", this.boundClickHandler);
      this.board.renderWrongTile(this.ctx, e.offsetX, e.offsetY);
      this.gameOver = true;
      this.startTimer = false;
      this.count = 0;
    }
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
      this.startTimer = false;
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
    } else {
      this.drawGameOver();
      this.ctx.canvas.removeEventListener("mousedown", this.boundClickHandler);
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

    if (this.startTimer) {
      if (!dt) return;
      this.totalSec -= dt;
      timer.textContent = this.totalSec / 1000 + "''";
    }

    if (this.totalSec <= 0) {
      this.totalSec = 6000;
      timer.textContent = 0 + "." + "000" + "''";
      this.gameOver = true;
      this.startTimer = false;
    }
  }

  resetTimer() {
    const timer = document.querySelector("#timer");
    this.totalSec = 6000;
    this.millSec = 999;
    this.startTimer = false;
    timer.textContent = this.totalSec / 1000 + "." + "000" + "''";
  }

  resetCounter() {
    this.startCount = false;
    this.count = 0;
    counter.innerText = 0;
  }

  drawGameOver() {
    this.ctx.font = "40px Tahoma";
    this.ctx.fillStyle = "rgba(255, 0, 40, 0.7)";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GAME OVER", 200, 280);
    this.ctx.fillText(`Tiles: ${this.count}`, 200, 350);
  }
}

export default Game;
