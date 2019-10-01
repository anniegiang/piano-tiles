const CONSTANTS = {
  TILE_WIDTH: 111,
  TILE_HEIGHT: 155
};

class Tile {
  constructor(x, y, color, key) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.key = key;
  }

  drawTile(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, CONSTANTS.TILE_WIDTH, CONSTANTS.TILE_HEIGHT);
  }
}

export default Tile;
