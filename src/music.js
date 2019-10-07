class Music {
  constructor(sound, src) {
    this.sound = sound;
    this.sound.src = src;
    this.init();
  }

  init() {
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop", "true");
    this.sound.style.display = "none";
  }

  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}

export default Music;
