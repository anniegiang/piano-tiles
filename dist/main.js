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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  VELOCITY: 150\n};\n\nclass Board {\n  constructor(dimentions, rows, columns) {\n    this.dimentions = dimentions;\n    this.rows = rows;\n    this.columns = columns;\n    this.move = false;\n    this.grid = []; // 2d array, target row = last el in arr\n\n    // initialize rows to display at the start\n    for (let i = 0; i < this.rows; i++) {\n      this.grid.push(this.createRow(i));\n    }\n  }\n\n  createRow(r = 0) {\n    let row = [];\n    let tile, tX, tY;\n\n    let targetIdx = Math.floor(Math.random() * this.columns); // random target tile\n\n    for (let i = 0; i < this.columns; i++) {\n      tX = i * CONST.WIDTH;\n      tY = r * CONST.HEIGHT; // calculate y position given r\n\n      if (targetIdx === i) {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 1); //  target color = 1\n      } else {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 0);\n      }\n      row.push(tile);\n    }\n    return row;\n  }\n\n  drawGrid(ctx) {\n    this.grid.forEach(row => {\n      row.forEach(tile => {\n        tile.drawTile(ctx);\n      });\n    });\n  }\n\n  moveRows() {\n    for (let row of this.grid) {\n      for (let tile of row) {\n        tile.y += CONST.HEIGHT;\n      }\n    }\n    this.move = !this.move;\n    this.grid.unshift(this.createRow());\n    this.grid.pop();\n  }\n\n  getTargetRow() {\n    return this.grid[this.grid.length - 1];\n  }\n\n  currentTargetPosition() {\n    let currentRow = this.getTargetRow();\n    for (let tile of currentRow) {\n      if (tile.color === 1) {\n        let res = { targetX: tile.x, targetY: tile.y };\n        return res;\n      }\n    }\n  }\n\n  validTargetBoundary() {\n    let currentTargetPos = this.currentTargetPosition();\n\n    let minX = currentTargetPos.targetX;\n    let maxX = currentTargetPos.targetX + CONST.WIDTH;\n\n    let minY = currentTargetPos.targetY;\n    let maxY = currentTargetPos.targetY + CONST.HEIGHT;\n\n    return { minX, maxX, minY, maxY };\n  }\n\n  isValidTargetBoundary(mX, mY) {\n    let bounds = this.validTargetBoundary();\n    let { minX, maxX, minY, maxY } = bounds;\n\n    let withinX = mX >= minX && mX <= maxX;\n    let withinY = mY >= minY && mY <= maxY;\n\n    if (withinX && withinY) return true;\n\n    return false;\n  }\n\n  getClickedTile(mX, mY) {\n    let targetRow = this.getTargetRow();\n    let res = {};\n\n    for (let t = 0; t < targetRow.length; t++) {\n      let tile = targetRow[t];\n      let minX = tile.x;\n      let minY = tile.y;\n      let maxX = minX + CONST.WIDTH;\n      let maxY = minY + CONST.HEIGHT;\n\n      let withinX = mX >= minX && mX <= maxX;\n      let withinY = mY >= minY && mY <= maxY;\n\n      if (withinX && withinY) {\n        res.tile = tile;\n        res.tileIdx = t;\n      }\n    }\n    return res;\n  }\n\n  renderWrongTile(ctx, mX, mY) {\n    let res = this.getClickedTile(mX, mY);\n    let { tileIdx, tile } = res;\n    let newTile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tile.x, tile.y, -1);\n    this.replaceTile(newTile, tileIdx);\n  }\n\n  replaceTile(newTile, tileIdx) {\n    let targetRow = this.getTargetRow();\n    targetRow[tileIdx] = newTile;\n  }\n\n  animate(ctx) {\n    this.drawGrid(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n// Controller\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimentions = { width: canvas.width, height: canvas.height };\n    this.gameOver = false;\n    this.startTimer = false;\n    this.startCount = false;\n    this.second = 0;\n    this.millSec = 0;\n    this.count = 0;\n    this.registerEvents();\n    this.start();\n  }\n\n  start() {\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimentions, 4, 4);\n    this.animate();\n  }\n\n  registerEvents() {\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n  }\n\n  click(e) {\n    if (\n      !this.gameOver &&\n      this.board.isValidTargetBoundary(e.offsetX, e.offsetY)\n    ) {\n      this.play();\n    } else {\n      this.board.renderWrongTile(this.ctx, e.offsetX, e.offsetY);\n      this.gameOver = true;\n    }\n  }\n\n  play() {\n    this.board.move = !this.board.move;\n    this.startTimer = true;\n    this.startCount = true;\n    this.renderCount();\n    this.animate();\n  }\n\n  animate() {\n    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    this.animateGrid();\n    this.updateGrid();\n    this.renderTime();\n    if (!this.gameOver) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  updateGrid() {\n    if (this.board.move) {\n      this.board.moveRows();\n    }\n  }\n\n  animateGrid() {\n    this.board.animate(this.ctx);\n  }\n\n  renderCount() {\n    const counter = document.querySelector(\"#counter\");\n\n    if (this.startCount) {\n      counter.textContent = ++this.count;\n    }\n  }\n\n  renderTime() {\n    const timer = document.querySelector(\"#timer\");\n    if (this.startTimer) {\n      timer.textContent = this.second + \".\" + this.millSec++ + \"''\";\n      if (this.millSec >= 1000) {\n        this.millSec = 0;\n        this.second++;\n      }\n    } else {\n      timer.textContent = this.second + \".\" + \"000\" + \"''\";\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\n\nconst canvas = document.querySelector(\"#piano-tiles\");\n\nlet game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Model\n/*\n  1 = target (yellow)\n  0 = non-target (pink)\n  -1 = wrong (black)\n*/\n\nconst COLORS = {\n  target: \"rgba(255, 255, 0, 0.9)\",\n  normal: \"rgba(100, 0, 255, 0.8)\",\n  wrong: \"rgba(255, 0, 40, 0.9)\"\n};\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  SPACING: 2\n};\n\nclass Tile {\n  constructor(x, y, color) {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n  }\n\n  drawTile(ctx) {\n    ctx.fillStyle =\n      this.color === 1\n        ? COLORS.target\n        : this.color === -1\n        ? COLORS.wrong\n        : COLORS.normal;\n    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });