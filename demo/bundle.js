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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ColorInterpolate.ts":
/*!*********************************!*\
  !*** ./src/ColorInterpolate.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorInterpolate = /** @class */ (function () {
    function ColorInterpolate(stops, segment) {
        if (stops === void 0) { stops = []; }
        if (segment === void 0) { segment = 100; }
        var canvas = document.createElement('canvas');
        canvas.width = segment;
        canvas.height = 1;
        this.ctx = canvas.getContext('2d');
        var gradient = this.ctx.createLinearGradient(0, 0, segment, 0);
        for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
            var stop = stops_1[_i];
            gradient.addColorStop.apply(gradient, stop);
        }
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, segment, 1);
        this.rgbaSet = this.ctx.getImageData(0, 0, segment, 1).data;
    }
    ColorInterpolate.prototype.getColor = function (offset) {
        var rgba = this.rgbaSet.slice(4 * offset, 4 * offset + 4);
        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] / 255 + ")";
    };
    return ColorInterpolate;
}());
exports.default = ColorInterpolate;


/***/ }),

/***/ "./src/demo.js":
/*!*********************!*\
  !*** ./src/demo.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.getElementById('demo-canvas');
var ctx = canvas.getContext('2d');
var gradient = ctx.createConicalGradient(240, 135, -Math.PI, Math.PI);
gradient.addColorStop(0, '#f00');
gradient.addColorStop(0.2, '#00f');
gradient.addColorStop(0.4, '#0ff');
gradient.addColorStop(0.6, '#f0f');
gradient.addColorStop(0.8, '#ff0');
gradient.addColorStop(1, '#f00');
ctx.fillStyle = gradient.pattern;
ctx.fillRect(0, 0, canvas.width, canvas.height);

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConicalGradient = void 0;
var ColorInterpolate_1 = __webpack_require__(/*! ./ColorInterpolate */ "./src/ColorInterpolate.ts");
function createConicalGradient(userContext, colorStops, x, y, startAngle, endAngle, anticlockwise) {
    if (colorStops === void 0) { colorStops = [
        [0, '#fff'],
        [1, '#fff'],
    ]; }
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (startAngle === void 0) { startAngle = 0; }
    if (endAngle === void 0) { endAngle = 2 * Math.PI; }
    if (anticlockwise === void 0) { anticlockwise = false; }
    var degStart = Math.floor((startAngle * 180) / Math.PI);
    var degEnd = Math.ceil((endAngle * 180) / Math.PI);
    // init off-screen canvas
    var canvas = document.createElement('canvas');
    canvas.width = userContext.canvas.width;
    canvas.height = userContext.canvas.height;
    var ctx = canvas.getContext('2d');
    // user canvas corners
    var corners = [
        [0, 0],
        [userContext.canvas.width, 0],
        [userContext.canvas.width, userContext.canvas.height],
        [0, userContext.canvas.height],
    ];
    // gradient radius
    var radius = Math.max.apply(Math, corners.map(function (_a) {
        var cx = _a[0], cy = _a[1];
        return Math.sqrt(Math.pow(cx - x, 2) + Math.pow(cy - y, 2));
    })) +
        10;
    ctx.translate(x, y);
    var lineWidth = (2 * Math.PI * (radius + 20)) / 360;
    // color linear interpolate
    var interpolate = new ColorInterpolate_1.default(colorStops, degEnd - degStart + 1);
    // draw gradient image
    for (var i = degStart; i <= degEnd; i++) {
        ctx.save();
        ctx.rotate(((anticlockwise ? -1 : 1) * (Math.PI * i)) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius, -2 * lineWidth);
        ctx.lineTo(radius, 0);
        ctx.fillStyle = interpolate.getColor(i - degStart);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    // clip content overflow
    var cvsForClip = document.createElement('canvas');
    cvsForClip.width = userContext.canvas.width;
    cvsForClip.height = userContext.canvas.height;
    var clipCtx = cvsForClip.getContext('2d');
    clipCtx.beginPath();
    clipCtx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    clipCtx.lineTo(x, y);
    clipCtx.closePath();
    clipCtx.fillStyle = clipCtx.createPattern(canvas, 'no-repeat');
    clipCtx.fill();
    return userContext.createPattern(cvsForClip, 'no-repeat');
}
exports.default = createConicalGradient;
CanvasRenderingContext2D.prototype.createConicalGradient = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var ctx2d = this;
    var obj = {
        stops: [],
        addColorStop: function (offset, color) {
            this.stops.push([offset, color]);
        },
        get pattern() {
            return createConicalGradient.apply(void 0, __spreadArray([ctx2d, this.stops], args));
        },
    };
    return obj;
};
var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");
Object.defineProperty(exports, "ConicalGradient", { enumerable: true, get: function () { return types_1.ConicalGradient; } });


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map