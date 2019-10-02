import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  KEYS: ["d", "f", "j", "k"],
  VELOCITY: 1
};

class Board {
  constructor(dimentions, rows, columns) {
    this.dimentions = dimentions;
    this.rows = rows;
    this.columns = columns;
    this.grid = []; // 2d array

    // initialize rows to display at the start
    for (let i = 0; i < this.rows; i++) {
      this.grid.push(this.createRow(i));
    }
  }

  createRow(r = 0) {
    let row = [];
    let tile, tX, tY;

    let targetIdx = Math.floor(Math.random() * this.columns); // random target tile

    for (let i = 0; i < this.columns; i++) {
      tX = i * CONST.WIDTH;
      tY = r * CONST.HEIGHT; // calculate y position given r

      if (targetIdx === i) {
        tile = new Tile(tX, tY, 1, CONST.KEYS[i]); //  target color = 1
      } else {
        tile = new Tile(tX, tY, 0, CONST.KEYS[i]);
      }
      row.push(tile);
    }
    return row;
  }

  drawGrid(ctx) {
    this.grid.forEach(row => {
      row.forEach(tile => {
        tile.drawTile(ctx);
      });
    });
  }

  moveRows() {
    this.grid.forEach(row => {
      row.forEach(tile => {
        // if the correct target in the current row is clicked
        //  remove the borrom row (shift)
        // create a new row (push)
        // push all rows down by adding to the tile's height
        // get current Row
      });
    });
  }

  currentRow() {
    this.currentRow = this.grid[0];
  }

  currentTargetPosition() {
    this.currentRow.forEach(row => {
      if (row.color === 1) {
        return { x: row.x, y: row.y };
      }
    });
  }

  validBoundary() {
    let minValidHeight = this.dimentions.height - CONST.HEIGHT;
    let maxValidHeight = minValidHeight + CONST.HEIGHT;

    let minValidWidth = 0;
    let maxValidWidth = CONST.WIDTH;
    return { minValidHeight, maxValidHeight, minValidWidth, maxValidWidth };
  }

  validTargetBoundary(mX, mY) {}

  animate(ctx) {
    this.moveRows();
    this.drawGrid(ctx);
  }
}

export default Board;
