// Model

const CONST = {
  WIDTH: 100,
  HEIGHT: 150
};

class Tile {
  constructor(x, y, color, key) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.key = key;
  }

  drawTile() {
    /*
  1 = black
  0 = white
  -1 = red
*/
    context.fillStyle =
      this.color === 1 ? "#333" : this.color === -1 ? "#f00" : "#fff";
    context.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);
  }
}

export default Tile;
