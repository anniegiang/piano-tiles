// Model
/*
  1 = target (yellow)
  0 = non-target (pink)
  -1 = wrong (black)
  2 = correct {grey}
*/

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  SPACING: 2
};

class Tile {
  constructor(x, y, color, key) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.key = key;
  }

  drawTile(ctx) {
    ctx.fillStyle =
      this.color === 1 ? "rgba(255, 255, 0, 0.5 )" : "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);
  }

  changeColor(ctx, color) {
    this.color = color;
    ctx.fillStyle = this.color === 2 ? "rgba(0, 0, 0, 0.5 )" : "rgb(0, 0, 0)";
    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);
  }
}

export default Tile;
