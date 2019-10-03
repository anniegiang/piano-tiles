import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  KEYS: ["d", "f", "j", "k"],
  VELOCITY: 10
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
    for (let row of this.grid) {
      for (let tile of row) {
        tile.y += CONST.VELOCITY;
      }
    }
  }

  getCurrentRow() {
    return this.grid[this.grid.length - 1];
  }

  currentTargetPosition() {
    let currentRow = this.getCurrentRow();
    for (let tile of currentRow) {
      if (tile.color === 1) {
        let res = { targetX: tile.x, targetY: tile.y };
        return res;
      }
    }
  }

  validTargetBoundary() {
    let currentTargetPos = this.currentTargetPosition();

    let minX = currentTargetPos.targetX;
    let maxX = currentTargetPos.targetX + CONST.WIDTH;

    let minY = currentTargetPos.targetY;
    let maxY = currentTargetPos.targetY + CONST.HEIGHT;

    return { minX, maxX, minY, maxY };
  }

  validBoundary() {
    let minValidWidth = 0;
    let maxValidWidth = this.dimentions.width;

    let minValidHeight = this.dimentions.height - CONST.HEIGHT;
    let maxValidHeight = minValidHeight + CONST.HEIGHT;

    return { minValidHeight, maxValidHeight, minValidWidth, maxValidWidth };
  }

  isValidTargetBoundary(mX, mY) {
    let { minX, maxX, minY, maxY } = this.validTargetBoundary();

    let withinX = mX >= minX && mX <= maxX;
    let withinY = mY >= minY && mY <= maxY;
    if (withinX && withinY) {
      return true;
    }
    return false;
  }

  animate(ctx) {
    this.moveRows();
    this.drawGrid(ctx);
  }
}

export default Board;
