import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  VELOCITY: 150
};

class Board {
  constructor(dimentions, rows, columns) {
    this.dimentions = dimentions;
    this.rows = rows;
    this.columns = columns;
    this.move = false;
    this.grid = []; // 2d array, target row = last el in arr

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
        tile = new Tile(tX, tY, 1); //  target color = 1
      } else {
        tile = new Tile(tX, tY, 0);
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
        tile.y += CONST.HEIGHT;
      }
    }
    this.move = !this.move;
    this.grid.unshift(this.createRow());
    this.grid.pop();
  }

  getTargetRow() {
    console.log("target row: ", this.grid);
    // debugger;
    return this.grid[this.grid.length - 1];
  }

  currentTargetPosition() {
    let currentRow = this.getTargetRow();
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
    let bounds = this.validTargetBoundary();
    let { minX, maxX, minY, maxY } = bounds;
    console.log("target bounds: ", bounds);
    console.log("valid target?");

    let withinX = mX >= minX && mX <= maxX;
    let withinY = mY >= minY && mY <= maxY;
    if (withinX && withinY) {
      return true;
    }
    return false;
  }

  animate(ctx) {
    this.drawGrid(ctx);
  }
}

export default Board;
