# Piano Tiles

Live: https://piano-tiles.herokuapp.com

A single-player game containing two modes where the goal is to tap tiles quickly while avoiding non-target tiles, built using Vanilla JavaScript, HTML5 Canvas, and OOP design principles.

![](piano-tiles-demo.mov.gif)

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

```
updateGrid() {
    if (this.board.move && this.mode === "zen") {
      this.board.zenMoveRows();
    } else if (this.board.move && this.mode === "classic") {
      this.board.classicMoveRows();
    }
  }

```

### Features in progress

- [ ] Build a mode that has inifinite scrolling of tiles
