// View

import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  KEYS: ["d", "f", "j", "k"],
  dY: 4
};

class Board {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = []; // 2d array of n rows * m columns
  }

  createRow(ctx, r) {
    let row = [];
    let tile, tX, tY;

    let targetIdx = Math.floor(Math.random() * this.columns);

    for (let i = 0; i < this.columns; i++) {
      tX = i * CONST.WIDTH;
      tY = CONST.HEIGHT * r;
      if (targetIdx === i) {
        tile = new Tile(tX, tY, 1, CONST.KEYS[i]); // color = target color = 1
      } else {
        tile = new Tile(tX, tY, 0, CONST.KEYS[i]);
      }
      row.push(tile);
    }
    return row;
  }

  createGrid(ctx) {
    let row;
    for (let i = 0; i < this.rows; i++) {
      row = this.createRow(ctx, i);
      this.grid.push(row);
    }
  }

  renderGrid(ctx) {
    this.createGrid(ctx);
    this.grid.forEach(row => {
      row.forEach(tile => {
        tile.drawTile(ctx);
      });
    });
  }

  moveRows() {
    this.grid.forEach(row => {
      row.forEach(tile => {
        tile.y += CONST.dY;
      });
    });
  }

  animate(ctx) {
    requestAnimationFrame(this.animate.bind(this));
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.moveRows();
  }
}

export default Board;
