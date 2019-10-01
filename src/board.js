// View

import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  KEYS: ["d", "f", "j", "k"]
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
        tile = new Tile(tX + 2, tY, 1, CONST.KEYS[i]); // color = target color = 1
      } else {
        tile = new Tile(tX + 2, tY, 0, CONST.KEYS[i]);
      }
      row.push(tile);
    }
    return row;
  }

  renderRow(ctx, row) {
    let row1 = this.createRow(ctx, 0);
    let row2 = this.createRow(ctx, 1);
    let row3 = this.createRow(ctx, 2);
    let row4 = this.createRow(ctx, 3);
    row1.forEach(r => r.drawTile(ctx));
    row2.forEach(r => r.drawTile(ctx));
    row3.forEach(r => r.drawTile(ctx));
    row4.forEach(r => r.drawTile(ctx));
  }

  createGrid(ctx) {
    let row;
    for (let i = 0; i < this.rows; i++) {
      row = this.createRow(ctx);
      this.grid.push(row);
    }
  }

  renderGrid(ctx) {
    console.log(this.grid);
    this.grid.forEach(row => {
      row.forEach(tile => {
        tile.drawTile(ctx);
      });
    });
  }
}

export default Board;
