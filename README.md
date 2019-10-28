# Piano Tiles

Live: https://piano-tiles.herokuapp.com

A single-player game containing two modes where the goal is to tap tiles quickly while avoiding non-target tiles, built using Vanilla JavaScript, HTML5 Canvas, and OOP design principles.

(The actual game is much smoother than what the following GIF displays.)
![](piano-tiles.gif)

### Features

- Two game modes (Classic and Zen).
- Dynamic play functionality using key press (d f j k) and mouse click.
- Storage of best times and scores.

#### Classic Mode

- Tap 25 tiles in the fastest time.

#### Zen Mode

- Tap as many tiles in 7 seconds.

### Key designs

- Designed dynamic game play by incorporating keypress and mouse click functionality using the event listeners to access keypress codes and mouse offset values to calculate the vertical and horizontal boundaries of valid target taps.
- Utilized Canvas’s request animation frame to animate the movement of tiles by a pre-specified amount, simultaneously adding new rows of tiles at the top of the canvas as rows animated out of the canvas frame.
- Assured accurate countdown timers using JavaScript’s Date object to achieve stable frame-rates, compensating for time taken from computations by calculating the delta time between animation frames.
- Incorporated two modes of game play by designing modular functions that executed the appropriate game logic given a mode, alongside achieving DRY code.

### Key code snippets

```
// Animate rows to shift down by a specified amount
// to control the total movement per animation frame call

 zenMoveRows() {
  for (let row of this.grid) {
    for (let tile of row) {
      tile.y += CONST.HEIGHT;
    }
  }
  this.move = !this.move;
  this.grid.unshift(this.createRow());
  this.grid.pop();
}

```

```
// Dynamically updates game logic given a mode

updateGrid() {
  if (this.board.move && this.mode === "zen") {
    this.board.zenMoveRows();
  } else if (this.board.move && this.mode === "classic") {
    this.board.classicMoveRows();
  }
}

```

```
// Stable timers rates using delta time

animate() {
  let dt = Date.now() - this.lastTime;
  this.lastTime = Date.now();

  if (this.mode === "zen") {
    this.renderCountdown(dt);
  } else if (this.mode === "classic") {
    this.renderTimer(dt);
  }

    ....
}

```

```
// Store the best played scores and times using local storage

// Zen
if (this.count > this.bestZenScore) {
  this.bestZenScore = this.count;
  localStorage.removeItem("zenScore");
  localStorage.setItem("zenScore", this.count);
  this.renderZenScore();
}

// Classic
if (totalTime < this.bestClassicScore) {
  this.bestClassicScore = totalTime;
  localStorage.removeItem("classicScore");
  localStorage.setItem("classicScore", totalTime);
  this.renderClassicScore();
}

```

### Features in progress

- [ ] Build a mode that has inifinite scrolling of tiles
