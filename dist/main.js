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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  KEYS: [\"d\", \"f\", \"j\", \"k\"],\n  VELOCITY: 1\n};\n\nclass Board {\n  constructor(dimentions, rows, columns) {\n    this.dimentions = dimentions;\n    this.rows = rows;\n    this.columns = columns;\n    this.grid = []; // 2d array\n\n    // initialize rows to display at the start\n    for (let i = 0; i < this.rows; i++) {\n      this.grid.push(this.createRow(i));\n    }\n  }\n\n  createRow(r = 0) {\n    let row = [];\n    let tile, tX, tY;\n\n    let targetIdx = Math.floor(Math.random() * this.columns); // random target tile\n\n    for (let i = 0; i < this.columns; i++) {\n      tX = i * CONST.WIDTH;\n      tY = r * CONST.HEIGHT; // calculate y position given r\n\n      if (targetIdx === i) {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 1, CONST.KEYS[i]); //  target color = 1\n      } else {\n        tile = new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tX, tY, 0, CONST.KEYS[i]);\n      }\n      row.push(tile);\n    }\n    return row;\n  }\n\n  drawGrid(ctx) {\n    this.grid.forEach(row => {\n      row.forEach(tile => {\n        tile.drawTile(ctx);\n      });\n    });\n  }\n\n  moveRows() {\n    this.grid.forEach(row => {\n      row.forEach(tile => {\n        // if the correct target in the current row is clicked\n        //  remove the borrom row (shift)\n        // create a new row (push)\n        // push all rows down by adding to the tile's height\n        // get current Row\n      });\n    });\n  }\n\n  currentRow() {\n    this.currentRow = this.grid[0];\n  }\n\n  currentTargetPosition() {\n    this.currentRow.forEach(row => {\n      if (row.color === 1) {\n        return { x: row.x, y: row.y };\n      }\n    });\n  }\n\n  validBoundary() {\n    let minValidHeight = this.dimentions.height - CONST.HEIGHT;\n    let maxValidHeight = minValidHeight + CONST.HEIGHT;\n\n    let minValidWidth = 0;\n    let maxValidWidth = CONST.WIDTH;\n    return { minValidHeight, maxValidHeight, minValidWidth, maxValidWidth };\n  }\n\n  validTargetBoundary(mX, mY) {}\n\n  animate(ctx) {\n    this.moveRows();\n    this.drawGrid(ctx);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n// Controller\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.ctx = canvas.getContext(\"2d\");\n    this.dimentions = { width: canvas.width, height: canvas.height };\n    this.registerEvents();\n    this.restart();\n  }\n\n  animate() {\n    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);\n    this.board.animate(this.ctx);\n\n    if (this.running) {\n      requestAnimationFrame(this.animate.bind(this));\n    }\n  }\n\n  registerEvents() {\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n  }\n\n  click(e) {\n    if (!this.running) {\n      // play if  not running & the mouse click is clicked on the target\n      this.play();\n      // console.log(this.board.validBoundary());\n      // console.log(\"x: \", e.offsetX);\n      // console.log(\"y: \", e.offsetY);\n    }\n  }\n\n  restart() {\n    this.running = false;\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimentions, 4, 4);\n    this.animate();\n  }\n\n  play() {\n    this.running = true;\n    this.animate();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n// Model\n/*\n  1 = target (yellow)\n  0 = non-target (pink)\n  -1 = wrong (black)\n*/\n\nconst CONST = {\n  WIDTH: 100,\n  HEIGHT: 150,\n  SPACING: 2\n};\n\nclass Tile {\n  constructor(x, y, color, key) {\n    this.x = x;\n    this.y = y;\n    this.color = color;\n    this.key = key;\n  }\n\n  drawTile(ctx) {\n    ctx.fillStyle =\n      this.color === 1 ? \"rgba(255, 255, 0, 0.5 )\" : \"rgba(255, 0, 0, 0.5)\";\n    ctx.fillRect(this.x, this.y, CONST.WIDTH, CONST.HEIGHT);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });