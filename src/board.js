import Tile from "/tile";

const CONSTANTS = {
  COLOR: "rgba(255, 0, 0, 0.5)",
  TARGET: "rgba(255, 255, 0, 0.5)"
};

class Board {
  constructor(dimentions) {
    this.dimentions = dimentions;
    this.board = new Array(26);
  }

  renderTile() {
    let tile = new Tile(0, 255, CONSTANTS.COLOR, "j");
    tile.drawTile();
  }
}

export default Board;
