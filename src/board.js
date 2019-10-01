// View

import Tile from "./tile";

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  KEYS: ["d", "f", "j", "k"]
};

class Board {
  constructor(rows, columns) {
    this.grid = [];
    this.rows = rows;
    this.columns = columns;
  }

  renderRow(ctx) {
    let row = [];
    let tile, tX, tY;

    let targetIdx = Math.floor(Math.random() * this.columns);

    for (let i = 0; i < this.columns; i++) {
      tX = (i % this.columns) * CONST.WIDTH;
      tY = (i % this.columns) * CONST.HEIGHT;

      if (targetIdx === i) {
        tile = new Tile(tX, tY, 1, CONST.KEYS[i]);
      } else {
        tile = new Tile(tX, tY, 0, CONST.KEYS[i]);
      }
      row.push(tile);
    }
    this.grid.push(row);
  }

  renderGrid() {
    
  }
}

export default Board;
