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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  KEYS: [\"d\", \"f\", \"j\", \"k\"],\n  VELOCITY: 150\n};\n\nclass Board {\n  constructor(dimentions, rows, columns) {\n    this.dimentions = dimentions;\n    this.rows = rows;\n    this.columns = columns;\n    this.move = false;\n    this.grid = []; // 2d array\n\n    // initialize rows to display at the start\n    for (let i = 0; i < this.rows; i++) {\n      this.grid.push(this.createRow(i));\n    }\n  }\n\n  createRow(r = 0) {\n    let row = [];\n    let tile, tX, tY;\n\n    let targetIdx = Math.floor(Math.random() * this.columns); // random target tile\n\n    for (let i = 0; i < this.columns; i++) {\n      tX = i * CONST.WIDTH;\n      tY = r * CONST.HEIGHT; // calculate y position given r\n\n      if (targetIdx === i) {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 1, CONST.KEYS[i]); //  target color = 1\n      } else {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 0, CONST.KEYS[i]);\n      }\n      row.push(tile);\n    }\n    return row;\n  }\n\n  drawGrid(ctx) {\n    this.grid.forEach(row => {\n      row.forEach(tile => {\n        tile.drawTile(ctx);\n      });\n    });\n  }\n\n  moveRows() {\n    for (let row of this.grid) {\n      for (let tile of row) {\n        tile.y += CONST.HEIGHT;\n        if (tile.y >= CONST.HEIGHT) {\n          // this.move = !this.move;\n        }\n      }\n    }\n  }\n\n  getCurrentRow() {\n    return this.grid[this.grid.length - 1];\n  }\n\n  currentTargetPosition() {\n    let currentRow = this.getCurrentRow();\n    for (let tile of currentRow) {\n      if (tile.color === 1) {\n        let res = { targetX: tile.x, targetY: tile.y };\n        return res;\n      }\n    }\n  }\n\n  validTargetBoundary() {\n    let currentTargetPos = this.currentTargetPosition();\n\n    let minX = currentTargetPos.targetX;\n    let maxX = currentTargetPos.targetX + CONST.WIDTH;\n\n    let minY = currentTargetPos.targetY;\n    let maxY = currentTargetPos.targetY + CONST.HEIGHT;\n\n    return { minX, maxX, minY, maxY };\n  }\n\n  validBoundary() {\n    let minValidWidth = 0;\n    let maxValidWidth = this.dimentions.width;\n\n    let minValidHeight = this.dimentions.height - CONST.HEIGHT;\n    let maxValidHeight = minValidHeight + CONST.HEIGHT;\n\n    return { minValidHeight, maxValidHeight, minValidWidth, maxValidWidth };\n  }\n\n  isValidTargetBoundary(mX, mY) {\n    let { minX, maxX, minY, maxY } = this.validTargetBoundary();\n\n    let withinX = mX >= minX && mX <= maxX;\n    let withinY = mY >= minY && mY <= maxY;\n    if (withinX && withinY) {\n      return true;\n    }\n    return false;\n  }\n\n  animate(ctx) {\n    this.drawGrid(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n// Controller\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimentions = { width: canvas.width, height: canvas.height };\n\n    this.registerEvents();\n    this.start();\n  }\n\n  start() {\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimentions, 4, 4);\n    // this.move = this.board.move; // false at the start\n    this.animate();\n  }\n\n  registerEvents() {\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n  }\n\n  click(e) {\n    if (!this.move && this.board.isValidTargetBoundary(e.offsetX, e.offsetY)) {\n      this.play();\n    }\n  }\n\n  play() {\n    this.board.move = !this.board.move;\n\n    this.animate();\n  }\n\n  animate() {\n    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    this.animateGrid();\n    this.update();\n\n    if (!this.board.move) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  update() {\n    if (this.board.move) {\n      this.board.moveRows();\n    }\n  }\n\n  animateGrid() {\n    this.board.animate(this.ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n// Model\n/*\n  1 = target (yellow)\n  0 = non-target (pink)\n  -1 = wrong (black)\n  2 = correct {grey}\n*/\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  SPACING: 2\n};\n\nclass Tile {\n  constructor(x, y, color, key) {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n    this.key = key;\n  }\n\n  drawTile(ctx) {\n    ctx.fillStyle =\n      this.color === 1 ? \"rgba(255, 255, 0, 0.5 )\" : \"rgba(255, 0, 0, 0.5)\";\n    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);\n  }\n\n  changeColor(ctx, color) {\n    this.color = color;\n    ctx.fillStyle = this.color === 2 ? \"rgba(0, 0, 0, 0.5 )\" : \"rgb(0, 0, 0)\";\n    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });