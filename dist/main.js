/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  VELOCITY: 20,\n  KEYS: [68, 70, 74, 75] // d = 68 f = 70 j = 74 k = 75\n};\n\nclass Board {\n  constructor(dimentions, rows, columns) {\n    this.dimentions = dimentions;\n    this.rows = rows;\n    this.columns = columns;\n    this.movement = 0;\n    this.play = true;\n    this.move = false;\n    this.classic = 0;\n    this.grid = []; // 2d array, target row = last el in arr\n\n    // initialize rows to display at the start\n    for (let i = 0; i < this.rows; i++) {\n      this.grid.push(this.createRow(i));\n    }\n  }\n\n  createRow(r = 0) {\n    let row = [];\n    let tile, tX, tY;\n\n    let targetIdx = Math.floor(Math.random() * this.columns); // random target tile\n\n    for (let i = 0; i < this.columns; i++) {\n      tX = i * CONST.WIDTH;\n      tY = r * CONST.HEIGHT; // calculate y position given r\n\n      if (targetIdx === i) {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 1, CONST.KEYS[i]); //  target color = 1\n      } else {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 0, CONST.KEYS[i]);\n      }\n      row.push(tile);\n    }\n    return row;\n  }\n\n  drawGrid(ctx) {\n    this.grid.forEach(row => {\n      row.forEach(tile => {\n        tile.drawTile(ctx);\n      });\n    });\n  }\n\n  zenMoveRows() {\n    for (let row of this.grid) {\n      for (let tile of row) {\n        tile.y += CONST.HEIGHT;\n      }\n    }\n    this.move = !this.move;\n    this.grid.unshift(this.createRow());\n    this.grid.pop();\n  }\n\n  classicMoveRows() {\n    for (let row of this.grid) {\n      for (let tile of row) {\n        tile.y += CONST.HEIGHT;\n      }\n    }\n    this.move = !this.move;\n    this.grid.pop();\n    if (this.classic < 21) {\n      this.grid.unshift(this.createRow());\n      this.classic++;\n    }\n  }\n\n  getTargetRow() {\n    return this.grid[this.grid.length - 1];\n  }\n\n  currentTargetPosition() {\n    let currentRow = this.getTargetRow();\n    for (let tile of currentRow) {\n      if (tile.color === 1) {\n        let res = { targetX: tile.x, targetY: tile.y };\n        return res;\n      }\n    }\n  }\n\n  currentTargetTile() {\n    let res = this.currentTargetPosition();\n    let tile = this.getClickedTile(res.targetX, res.targetY);\n    return tile;\n  }\n\n  validTargetBoundary() {\n    let currentTargetPos = this.currentTargetPosition();\n\n    let minX = currentTargetPos.targetX;\n    let maxX = currentTargetPos.targetX + CONST.WIDTH;\n\n    let minY = currentTargetPos.targetY;\n    let maxY = currentTargetPos.targetY + CONST.HEIGHT;\n\n    return { minX, maxX, minY, maxY };\n  }\n\n  isValidTargetBoundary(mX, mY) {\n    let bounds = this.validTargetBoundary();\n    let { minX, maxX, minY, maxY } = bounds;\n\n    let withinX = mX >= minX && mX <= maxX;\n    let withinY = mY >= minY && mY <= maxY;\n\n    if (withinX && withinY) return true;\n\n    return false;\n  }\n\n  getClickedTile(mX, mY) {\n    let targetRow = this.getTargetRow();\n    let res = {};\n\n    for (let t = 0; t < targetRow.length; t++) {\n      let tile = targetRow[t];\n      let minX = tile.x;\n      let minY = tile.y;\n      let maxX = minX + CONST.WIDTH;\n      let maxY = minY + CONST.HEIGHT;\n\n      let withinX = mX >= minX && mX <= maxX;\n      let withinY = mY >= minY && mY <= maxY;\n\n      if (withinX && withinY) {\n        res.tile = tile;\n        res.tileIdx = t;\n      }\n    }\n    return res;\n  }\n\n  getPressedTile(keyCode) {\n    let targetRow = this.getTargetRow();\n    let res = {};\n    for (let t = 0; t < targetRow.length; t++) {\n      let tile = targetRow[t];\n      if (tile.key === keyCode) {\n        res.tile = tile;\n        res.tileIdx = t;\n      }\n    }\n    return res;\n  }\n\n  validPress(keyCode) {\n    let tile = this.currentTargetTile();\n    if (keyCode === tile.tile.key) {\n      return true;\n    }\n    return false;\n  }\n\n  renderWrongTile(ctx, mX, mY) {\n    let res = this.getClickedTile(mX, mY);\n    let { tileIdx, tile } = res;\n    let newTile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tile.x, tile.y, -1);\n    this.replaceTile(newTile, tileIdx);\n  }\n\n  renderWrongKeyPress(ctx, keyCode) {\n    let res = this.getPressedTile(keyCode);\n    let { tile, tileIdx } = res;\n    let newTile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tile.x, tile.y, -1);\n    this.replaceTile(newTile, tileIdx);\n  }\n\n  replaceTile(newTile, tileIdx) {\n    let targetRow = this.getTargetRow();\n    targetRow[tileIdx] = newTile;\n  }\n\n  animate(ctx) {\n    this.drawGrid(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _music__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./music */ \"./src/music.js\");\n\n\nclass Game {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimentions = { width: canvas.width, height: canvas.height };\n    this.gameOver = false;\n    this.totalSec = 6000;\n    this.endSec = 0;\n    this.timer = 0;\n    this.start = true;\n    this.playMusic = true;\n    this.playMusicEvent();\n    this.resetCounter();\n    this.resetTimer();\n    this.registerEvents();\n    this.restart(\"classic\");\n  }\n\n  registerEvents() {\n    const zen = document.querySelector(\"#zen\");\n    const classic = document.querySelector(\"#classic\");\n    const audio = document.querySelector(\"#audio\");\n    const mute = document.querySelector(\"#mute\");\n\n    this.boundClickHandler = this.click.bind(this);\n    this.boundToggleMusicEventHandler = this.toggleMusicEvent.bind(this);\n    this.boundkeyPressHandler = this.keyPress.bind(this);\n    this.boundRestartHandler = this.restart.bind(this);\n    this.boundSpaceBarHandler = this.spaceBar.bind(this);\n\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n    document.addEventListener(\"keydown\", this.boundkeyPressHandler);\n    document.addEventListener(\"keydown\", this.boundSpaceBarHandler);\n    audio.addEventListener(\"click\", this.boundToggleMusicEventHandler);\n    mute.addEventListener(\"click\", this.boundToggleMusicEventHandler);\n    zen.addEventListener(\"click\", () => this.boundRestartHandler(\"zen\"));\n    classic.addEventListener(\"click\", () =>\n      this.boundRestartHandler(\"classic\")\n    );\n  }\n\n  animate() {\n    let dt = Date.now() - this.lastTime;\n    this.lastTime = Date.now();\n    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    this.updateGrid();\n    this.animateGrid();\n\n    if (this.start) {\n      this.drawStart();\n    }\n\n    if (this.mode === \"zen\") {\n      this.renderCountdown(dt);\n    } else if (this.mode === \"classic\") {\n      this.renderTimer(dt);\n    }\n\n    if (!this.gameOver) {\n      requestAnimationFrame(this.animate.bind(this));\n    } else {\n      this.drawGameOver();\n      this.ctx.canvas.removeEventListener(\"mousedown\", this.boundClickHandler);\n      document.removeEventListener(\"keydown\", this.boundkeyPressHandler);\n    }\n  }\n\n  restart(mode) {\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n    document.addEventListener(\"keydown\", this.boundkeyPressHandler);\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimentions, 4, 4);\n    this.mode = mode;\n    this.gameOver = false;\n    this.resetTimer();\n    this.resetCounter();\n    this.animate();\n  }\n\n  spaceBar(e) {\n    if (e.keyCode === 32) {\n      this.start = false;\n      this.restart(this.mode);\n    }\n  }\n\n  keyPress(e) {\n    if (!this.gameOver && !this.start && this.board.validPress(e.keyCode)) {\n      this.play();\n    } else {\n      if (!this.start) {\n        this.board.renderWrongKeyPress(this.ctx, e.keyCode);\n        this.gameOver = true;\n        this.startTimer = false;\n      }\n    }\n  }\n\n  click(e) {\n    if (\n      !this.gameOver &&\n      this.board.isValidTargetBoundary(e.offsetX, e.offsetY) &&\n      !this.start\n    ) {\n      this.play();\n    } else {\n      if (!this.start) {\n        this.board.renderWrongTile(this.ctx, e.offsetX, e.offsetY);\n        this.gameOver = true;\n        this.startTimer = false;\n      }\n    }\n  }\n\n  play() {\n    this.gameOver = false;\n    this.board.move = true;\n    this.startTimer = true;\n    this.startCount = true;\n    this.lastTime = Date.now();\n    this.renderCount();\n    this.animate();\n  }\n\n  updateGrid() {\n    if (this.board.move && this.mode === \"zen\") {\n      this.board.zenMoveRows();\n    } else if (this.board.move && this.mode === \"classic\") {\n      this.board.classicMoveRows();\n    }\n  }\n\n  animateGrid() {\n    this.board.animate(this.ctx);\n  }\n\n  renderCount() {\n    const counter = document.querySelector(\"#counter\");\n\n    if (this.startCount) {\n      if (this.mode === \"classic\") {\n        counter.textContent = --this.count;\n      } else if (this.mode === \"zen\") {\n        counter.textContent = ++this.count;\n      }\n    }\n  }\n\n  renderCountdown(dt) {\n    const timer = document.querySelector(\"#timer\");\n\n    if (this.startTimer) {\n      if (!dt) return;\n      this.totalSec -= dt;\n\n      if (this.totalSec <= this.totalSec / 2) {\n        timer.style.color = \"red\";\n      }\n      timer.textContent = this.totalSec / 1000 + \"''\";\n    }\n\n    if (this.totalSec <= 0) {\n      this.totalSec = 6000;\n      timer.textContent = 0 + \".\" + \"000\" + \"''\";\n      this.gameOver = true;\n      this.startTimer = false;\n    }\n  }\n\n  renderTimer(dt) {\n    const timer = document.querySelector(\"#timer\");\n\n    if (this.startTimer) {\n      if (!dt) return;\n      this.totalSec += dt + 1;\n\n      timer.textContent = this.totalSec / 1000 + \"''\";\n    }\n\n    if (this.board.grid.length === 0) {\n      // this.totalSec = 6000;\n      this.gameOver = true;\n      this.startTimer = false;\n      timer.textContent = this.totalSec / 1000 + \"''\";\n    }\n  }\n\n  resetTimer() {\n    const timer = document.querySelector(\"#timer\");\n    timer.style.color = \" rgba(200, 255, 255, 0.9)\";\n    this.startTimer = false;\n    if (this.mode === \"zen\") {\n      this.totalSec = 7000;\n      timer.textContent = this.totalSec / 1000 + \".\" + \"000\" + \"''\";\n    } else {\n      this.totalSec = 0;\n      timer.textContent = 0 + \".\" + \"000\" + \"''\";\n    }\n  }\n\n  resetCounter() {\n    this.startCount = false;\n    if (this.mode === \"classic\") {\n      this.count = 25;\n    } else if (this.mode === \"zen\") {\n      this.count = 0;\n    }\n    counter.innerText = this.count;\n  }\n\n  drawStart() {\n    // background\n    this.ctx.fillStyle = \"rgba(0, 0, 0, 0.8)\";\n    this.ctx.fillRect(0, 0, this.dimentions.width, this.dimentions.height);\n    this.ctx.font = \"30px Verdana\";\n\n    // title\n    this.ctx.fillStyle = \"rgba(200, 255, 255, 0.9)\";\n    this.ctx.textAlign = \"center\";\n    this.ctx.fillText(`${this.mode.toUpperCase()}`, 200, 210);\n\n    // mode instructions\n    this.ctx.fillStyle = \"rgba(0, 255, 255, 0.9)\";\n    this.ctx.font = \"20px Verdana\";\n    if (this.mode === \"zen\") {\n      this.ctx.fillText(\"Get tiles within 7 seconds!\", 200, 260);\n    } else if (this.mode === \"classic\") {\n      this.ctx.fillText(\"Get 25 tiles as fast as you can!\", 200, 260);\n    }\n\n    //  how to play\n    this.ctx.fillStyle = \"rgba(200, 255, 255, 0.9)\";\n    this.ctx.font = \"17px Tahoma\";\n    this.ctx.fillText(\n      \" ‣ Play by keypress (d f j k) or by clicking.\",\n      200,\n      300\n    );\n    this.ctx.font = \"17px Tahoma\";\n    this.ctx.fillText(\"‣ A valid tile is in the last row.\", 200, 340);\n    this.ctx.font = \"15px Tahoma\";\n\n    // space bar\n    this.ctx.fillText(\"Press the spacebar to start.\", 200, 380);\n  }\n\n  drawGameOver() {\n    const timer = document.querySelector(\"#timer\");\n    timer.style.color = \"yellow\";\n    // background\n    this.ctx.fillStyle = \"rgba(0, 0, 0, 0.6)\";\n    this.ctx.fillRect(0, 0, this.dimentions.width, this.dimentions.height);\n    this.ctx.font = \"30px Verdana\";\n\n    // title\n    this.ctx.fillStyle = \"rgba(200, 255, 255, 0.9)\";\n    this.ctx.textAlign = \"center\";\n\n    if (this.board.grid.length === 0) {\n      this.ctx.fillText(\"Nice!\", 200, 250);\n    } else {\n      this.ctx.fillText(\"GAME OVER\", 200, 250);\n    }\n\n    // score\n    this.ctx.fillStyle = \"rgba(0, 255, 255, 0.9)\";\n    if (this.mode === \"zen\") {\n      this.ctx.font = \"35px Verdana\";\n      this.ctx.fillText(`${this.count}`, 200, 310);\n    } else if (this.mode === \"classic\") {\n      const timer = document.querySelector(\"#timer\");\n      this.ctx.font = \"35px Verdana\";\n      this.ctx.fillText(`${timer.textContent}`, 200, 310);\n    }\n\n    // restart\n    this.ctx.fillStyle = \"rgba(200, 255, 255, 0.9)\";\n    this.ctx.font = \"20px Tahoma\";\n    this.ctx.fillText(\"Press the spacebar to restart\", 200, 360);\n  }\n\n  playMusicEvent() {\n    const audio = document.querySelector(\"#sound\");\n    this.music = new _music__WEBPACK_IMPORTED_MODULE_1__[\"default\"](audio, \"../assets/music/make-ya-moves.wav\");\n\n    if (this.playMusic) {\n      this.music.play();\n    }\n  }\n\n  toggleMusicEvent(e) {\n    let audio = document.querySelector(\"#sound\");\n    let mute = document.querySelector(\"#mute\");\n\n    this.playMusic = !this.playMusic;\n\n    if (this.playMusic) {\n      mute.style.display = \"none\";\n\n      let promise = this.music.play();\n      if (promise !== undefined) {\n        promise\n          .then(_ => {\n            // Autoplay started!\n          })\n          .catch(error => {\n            console.log(\"Loading\");\n          });\n      }\n    } else {\n      mute.style.display = \"block\";\n      this.music.stop();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\n\nconst canvas = document.querySelector(\"#piano-tiles\");\nconst playBtn = document.querySelector(\"#play-btn\");\n\nlet game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\nconst start = () => {\n  game.play.bind(undefined);\n};\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/music.js":
/*!**********************!*\
  !*** ./src/music.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Music {\n  constructor(sound, src) {\n    this.sound = sound;\n    this.sound.src = src;\n    this.init();\n  }\n\n  init() {\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    this.sound.setAttribute(\"loop\", \"true\");\n    this.sound.style.display = \"none\";\n  }\n\n  play() {\n    this.sound.play();\n  }\n  stop() {\n    this.sound.pause();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Music);\n\n\n//# sourceURL=webpack:///./src/music.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst COLORS = {\n  target: \"rgba(3, 250, 252, 0.9)\",\n  normal: \"rgba(0, 0, 100, 0.7)\",\n  wrong: \"rgba(255, 0, 40, 0.7)\"\n};\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  SPACING: 2\n};\n\nclass Tile {\n  constructor(x, y, color, key) {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n    this.key = key;\n  }\n\n  drawTile(ctx) {\n    ctx.fillStyle =\n      this.color === 1\n        ? COLORS.target\n        : this.color === -1\n        ? COLORS.wrong\n        : COLORS.normal;\n    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });