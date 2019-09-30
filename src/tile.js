const CONSTANTS = {
  TILE_WIDTH: 100,
  TILE_HEIGHT: 130
};

class Tile {
  constructor(dimentions, color) {
    this.dimentions = dimentions;
    this.x = this.dimentions.width / 2;
    this.y = this.dimentions.height / 2;
    this.color = color;
  }

  drawTile(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, CONSTANTS.TILE_WIDTH, CONSTANTS.TILE_HEIGHT);
  }
}

export default Tile;
