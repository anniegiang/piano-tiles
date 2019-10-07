# Piano Tiles

Live: https://piano-tiles.herokuapp.com

A single-player game containing two modes where the goal is to tap tiles quickly while avoiding non-target tiles, built using Vanilla JavaScript, HTML5 Canvas, and OOP design principles.

![](piano-tiles-demo.mov.gif)

### Features
- Two game modes (Classic and Zen).
- Dynamic play functionality using key press (d f j k) and mouse click.

#### Classic Mode
- Tap 25 tiles in the fastest time.

#### Zen Mode
- Tap as many tiles witin 7 seconds.

### Key designs
- Designed dynamic play by incorporating keypress and mouse click functionality using the event Window API to detect keypress codes and mouse offset positions to calculate the vertical and horizontal boundaries of valid target taps.
- Utilized Canvas’s request animation frame to animate the movement of tiles to move by an amount of the tile’s height, while adding new rows of tiles at the top of the canvas as succeeding rows animated out of the canvas frame.
- Incorporated accurate countdown timers using the Date Object to calculate the delta time between animation frames, allowing stable frame-rates by compensating for time taken by computations.
- Incorporated two modes of game play by designing modular methods that executed the appropriate game logic given a mode, alongside maintaining code to be DRY.

### Features in progress
- [ ] Locally save player scores
- [ ] Build a mode that has inifinite scrolling of tiles
