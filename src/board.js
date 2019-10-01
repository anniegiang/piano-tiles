import Tile from "/tile";

class Board {
  constructor(dimentions) {
    this.dimentions = dimentions;
    this.board = new Array(26);
  }

  generateRow() {
    let row = new Array(4);
    let randIdx = Math.random() * row.length;
    row[randIdx] = new Tile()
  }
}

export default Board;
