// Model
/*
  1 = target (yellow)
  0 = non-target (pink)
  -1 = wrong (black)
*/

const COLORS = {
  target: "rgba(3, 250, 252, 0.9)",
  normal: "rgba(0, 0, 100, 0.7)",
  wrong: "rgba(255, 0, 40, 0.7)"
};

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
      this.color === 1
        ? COLORS.target
        : this.color === -1
        ? COLORS.wrong
        : COLORS.normal;
    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);
  }
}

export default Tile;
