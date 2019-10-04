// Model
/*
  1 = target (yellow)
  0 = non-target (pink)
  -1 = wrong (black)
*/

const COLORS = {
  target: "rgba(255, 255, 0, 0.5)",
  normal: "rgba(255, 0, 0, 0.5)",
  wrong: "rgb(0, 0, 0, 0.5)"
};

const CONST = {
  WIDTH: 100,
  HEIGHT: 150,
  SPACING: 2
};

class Tile {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
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
