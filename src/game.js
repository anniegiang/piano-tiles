import Board from "./board";
import Music from "./music";
class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.dimentions = { width: canvas.width, height: canvas.height };
    this.gameOver = false;
    this.totalSec = 6000;
    this.endSec = 0;
    this.timer = 0;
    this.start = true;
    this.playMusic = true;
    this.playMusicEvent();
    this.resetCounter();
    this.resetTimer();
    this.registerEvents();
    this.restart("classic");
  }

  registerEvents() {
    const zen = document.querySelector("#zen");
    const classic = document.querySelector("#classic");
    const audio = document.querySelector("#audio");
    const mute = document.querySelector("#mute");

    this.boundClickHandler = this.click.bind(this);
    this.boundToggleMusicEventHandler = this.toggleMusicEvent.bind(this);
    this.boundkeyPressHandler = this.keyPress.bind(this);
    this.boundRestartHandler = this.restart.bind(this);
    this.boundSpaceBarHandler = this.spaceBar.bind(this);

    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    document.addEventListener("keydown", this.boundkeyPressHandler);
    document.addEventListener("keydown", this.boundSpaceBarHandler);
    audio.addEventListener("click", this.boundToggleMusicEventHandler);
    mute.addEventListener("click", this.boundToggleMusicEventHandler);
    zen.addEventListener("click", () => this.boundRestartHandler("zen"));
    classic.addEventListener("click", () =>
      this.boundRestartHandler("classic")
    );
  }

  animate() {
    let dt = Date.now() - this.lastTime;
    this.lastTime = Date.now();
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.updateGrid();
    this.animateGrid();

    if (this.start) {
      this.drawStart();
    }

    if (this.mode === "zen") {
      this.renderCountdown(dt);
    } else if (this.mode === "classic") {
      this.renderTimer(dt);
    }

    if (!this.gameOver) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.drawGameOver();
      this.ctx.canvas.removeEventListener("mousedown", this.boundClickHandler);
      document.removeEventListener("keydown", this.boundkeyPressHandler);
    }
  }

  restart(mode) {
    this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    document.addEventListener("keydown", this.boundkeyPressHandler);
    this.board = new Board(this.dimentions, 4, 4);
    this.mode = mode;
    this.gameOver = false;
    this.resetTimer();
    this.resetCounter();
    this.animate();
  }

  spaceBar(e) {
    if (e.keyCode === 32) {
      this.restart(this.mode);
    }
  }

  keyPress(e) {
    if (!this.gameOver && this.board.validPress(e.keyCode)) {
      this.play();
    } else {
      this.board.renderWrongKeyPress(this.ctx, e.keyCode);
      this.gameOver = true;
      this.startTimer = false;
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
    this.gameOver = false;
    this.board.move = true;
    this.startTimer = true;
    this.startCount = true;
    this.lastTime = Date.now();
    this.renderCount();
    this.animate();
  }

  updateGrid() {
    if (this.board.move && this.mode === "zen") {
      this.board.zenMoveRows();
    } else if (this.board.move && this.mode === "classic") {
      this.board.classicMoveRows();
    }
  }

  animateGrid() {
    this.board.animate(this.ctx);
  }

  renderCount() {
    const counter = document.querySelector("#counter");

    if (this.startCount) {
      if (this.mode === "classic") {
        counter.textContent = --this.count;
      } else if (this.mode === "zen") {
        counter.textContent = ++this.count;
      }
    }
  }

  renderCountdown(dt) {
    const timer = document.querySelector("#timer");

    if (this.startTimer) {
      if (!dt) return;
      this.totalSec -= dt;

      if (this.totalSec <= this.totalSec / 2) {
        timer.style.color = "red";
      }
      timer.textContent = this.totalSec / 1000 + "''";
    }

    if (this.totalSec <= 0) {
      this.totalSec = 6000;
      timer.textContent = 0 + "." + "000" + "''";
      this.gameOver = true;
      this.startTimer = false;
    }
  }

  renderTimer(dt) {
    const timer = document.querySelector("#timer");

    if (this.startTimer) {
      if (!dt) return;
      this.totalSec += dt + 1;

      timer.textContent = this.totalSec / 1000 + "''";
    }

    if (this.board.grid.length === 0) {
      // this.totalSec = 6000;
      this.gameOver = true;
      this.startTimer = false;
      timer.textContent = this.totalSec / 1000 + "''";
    }
  }

  resetTimer() {
    const timer = document.querySelector("#timer");
    timer.style.color = " rgba(200, 255, 255, 0.9)";
    this.startTimer = false;
    if (this.mode === "zen") {
      this.totalSec = 7000;
      timer.textContent = this.totalSec / 1000 + "." + "000" + "''";
    } else {
      this.totalSec = 0;
      timer.textContent = 0 + "." + "000" + "''";
    }
  }

  resetCounter() {
    this.startCount = false;
    if (this.mode === "classic") {
      this.count = 25;
    } else if (this.mode === "zen") {
      this.count = 0;
    }
    counter.innerText = this.count;
  }

  drawStart() {
    // background
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.dimentions.width, this.dimentions.height);
    this.ctx.font = "30px Verdana";

    // title
    this.ctx.fillStyle = "rgba(200, 255, 255, 0.9)";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`${this.mode.toUpperCase()}`, 200, 210);

    // mode instructions
    this.ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
    this.ctx.font = "20px Verdana";
    if (this.mode === "zen") {
      this.ctx.fillText("Get tiles within 7 seconds!", 200, 260);
    } else if (this.mode === "classic") {
      this.ctx.fillText("Get 25 tiles as fast as you can!", 200, 260);
    }

    //  how to play
    this.ctx.fillStyle = "rgba(200, 255, 255, 0.9)";
    this.ctx.font = "17px Tahoma";
    this.ctx.fillText(
      " ‣ Play by keypress (d f j k) or by clicking.",
      200,
      300
    );
    this.ctx.font = "17px Tahoma";
    this.ctx.fillText("‣ A valid tile is in the last row.", 200, 340);
    this.ctx.font = "15px Tahoma";

    // space bar
    this.ctx.fillText("Press the spacebar to start.", 200, 380);
  }

  drawGameOver() {
    const timer = document.querySelector("#timer");
    timer.style.color = "yellow";
    // background
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    this.ctx.fillRect(0, 0, this.dimentions.width, this.dimentions.height);
    this.ctx.font = "30px Verdana";

    // title
    this.ctx.fillStyle = "rgba(200, 255, 255, 0.9)";
    this.ctx.textAlign = "center";

    if (this.board.grid.length === 0) {
      this.ctx.fillText("Nice!", 200, 250);
    } else {
      this.ctx.fillText("GAME OVER", 200, 250);
    }

    // score
    this.ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
    if (this.mode === "zen") {
      this.ctx.font = "35px Verdana";
      this.ctx.fillText(`${this.count}`, 200, 310);
    } else if (this.mode === "classic") {
      const timer = document.querySelector("#timer");
      this.ctx.font = "35px Verdana";
      this.ctx.fillText(`${timer.textContent}`, 200, 310);
    }

    // restart
    this.ctx.fillStyle = "rgba(200, 255, 255, 0.9)";
    this.ctx.font = "20px Tahoma";
    this.ctx.fillText("Press the spacebar to restart", 200, 360);
  }

  playMusicEvent() {
    const audio = document.querySelector("#sound");
    this.music = new Music(audio, "../assets/music/make-ya-moves.wav");

    if (this.playMusic) {
      this.music.play();
    }
  }

  toggleMusicEvent(e) {
    let audio = document.querySelector("#sound");
    let mute = document.querySelector("#mute");

    this.playMusic = !this.playMusic;

    if (this.playMusic) {
      mute.style.display = "none";

      let promise = this.music.play();
      if (promise !== undefined) {
        promise
          .then(_ => {
            // Autoplay started!
          })
          .catch(error => {
            console.log("Loading");
          });
      }
    } else {
      mute.style.display = "block";
      this.music.stop();
    }
  }
}

export default Game;
