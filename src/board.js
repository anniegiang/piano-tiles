import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  VELOCITY: 20,
  KEYS: [68, 70, 74, 75]
};

// d = 68 f = 70 j = 74 k = 75

class Board {
  constructor(dimentions, rows, columns) {
    this.dimentions = dimentions;
    this.rows = rows;
    this.columns = columns;
    this.movement = 0;
    this.play = true;
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
        tile.y += CONST.HEIGHT;
      }
    }
    this.move = !this.move;
    this.grid.unshift(this.createRow());
    this.grid.pop();
  }

  getTargetRow() {
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

  currentTargetTile() {
    let res = this.currentTargetPosition();
    let tile = this.getClickedTile(res.targetX, res.targetY);
    return tile;
  }

  validTargetBoundary() {
    let currentTargetPos = this.currentTargetPosition();

    let minX = currentTargetPos.targetX;
    let maxX = currentTargetPos.targetX + CONST.WIDTH;

    let minY = currentTargetPos.targetY;
    let maxY = currentTargetPos.targetY + CONST.HEIGHT;

    return { minX, maxX, minY, maxY };
  }

  isValidTargetBoundary(mX, mY) {
    let bounds = this.validTargetBoundary();
    let { minX, maxX, minY, maxY } = bounds;

    let withinX = mX >= minX && mX <= maxX;
    let withinY = mY >= minY && mY <= maxY;

    if (withinX && withinY) return true;

    return false;
  }

  getClickedTile(mX, mY) {
    let targetRow = this.getTargetRow();
    let res = {};

    for (let t = 0; t < targetRow.length; t++) {
      let tile = targetRow[t];
      let minX = tile.x;
      let minY = tile.y;
      let maxX = minX + CONST.WIDTH;
      let maxY = minY + CONST.HEIGHT;

      let withinX = mX >= minX && mX <= maxX;
      let withinY = mY >= minY && mY <= maxY;

      if (withinX && withinY) {
        res.tile = tile;
        res.tileIdx = t;
      }
    }
    return res;
  }

  getPressedTile(keyCode) {
    let targetRow = this.getTargetRow();
    let res = {};
    for (let t = 0; t < targetRow.length; t++) {
      let tile = targetRow[t];
      if (tile.key === keyCode) {
        res.tile = tile;
        res.tileIdx = t;
      }
    }
    return res;
  }

  validPress(keyCode) {
    let tile = this.currentTargetTile();
    if (keyCode === tile.tile.key) {
      return true;
    }
    return false;
  }

  renderWrongTile(ctx, mX, mY) {
    let res = this.getClickedTile(mX, mY);
    let { tileIdx, tile } = res;
    let newTile = new Tile(tile.x, tile.y, -1);
    this.replaceTile(newTile, tileIdx);
  }

  renderWrongKeyPress(ctx, keyCode) {
    if (CONST.KEYS.includes(keyCode)) {
      let res = this.getPressedTile(keyCode);
      let { tile, tileIdx } = res;
      let newTile = new Tile(tile.x, tile.y, -1);
      this.replaceTile(newTile, tileIdx);
    }
  }

  replaceTile(newTile, tileIdx) {
    let targetRow = this.getTargetRow();
    targetRow[tileIdx] = newTile;
  }

  animate(ctx) {
    this.drawGrid(ctx);
  }
}

export default Board;
