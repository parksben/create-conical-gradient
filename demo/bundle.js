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

const canvas = document.getElementById('demo-canvas');
const ctx = canvas.getContext('2d');
const gradient = ctx.createConicalGradient(240, 135, -Math.PI, Math.PI);
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.ConicalGradient = void 0;
var ColorInterpolate_1 = __webpack_require__(/*! ./ColorInterpolate */ "./src/ColorInterpolate.ts");
var TWO_PI = Math.PI * 2;
/** A hair of overlap between neighbouring wedges hides the antialiased seams. */
var SEAM_OVERLAP = 0.5 * (Math.PI / 180);
/**
 * The native implementation, captured at load time so that delegating to it can
 * never end up calling back into this polyfill.
 */
var nativeCreateConicGradient = typeof CanvasRenderingContext2D !== 'undefined'
    ? CanvasRenderingContext2D.prototype.createConicGradient
    : undefined;
/**
 * Resolves the sweep between `startAngle` and `endAngle` into a signed delta:
 * positive clockwise, negative anticlockwise, with a magnitude within
 * `(0, 2 * Math.PI]`. These are the exact semantics of `ctx.arc()`.
 */
function resolveSweep(startAngle, endAngle, anticlockwise) {
    var delta = (endAngle - startAngle) % TWO_PI;
    if (anticlockwise) {
        if (delta === 0)
            delta = -TWO_PI;
        else if (delta > 0)
            delta -= TWO_PI;
    }
    else if (delta <= 0) {
        delta += TWO_PI;
    }
    return delta;
}
function isFullTurn(sweep) {
    return Math.abs(sweep) >= TWO_PI - 1e-9;
}
/** Draws the wedges of the gradient and returns them as a canvas pattern. */
function renderConicalGradient(userContext, colorStops, x, y, startAngle, endAngle, anticlockwise) {
    var _a = userContext.canvas, width = _a.width, height = _a.height;
    // init off-screen canvas
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    // user canvas corners
    var corners = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
    ];
    // gradient radius
    var radius = Math.max.apply(Math, corners.map(function (_a) {
        var cx = _a[0], cy = _a[1];
        return Math.hypot(cx - x, cy - y);
    })) + 10;
    var sweep = resolveSweep(startAngle, endAngle, anticlockwise);
    var segments = Math.max(2, Math.round((Math.abs(sweep) * 180) / Math.PI));
    var step = sweep / segments;
    var overlap = step > 0 ? SEAM_OVERLAP : -SEAM_OVERLAP;
    // color linear interpolate
    var interpolate = new ColorInterpolate_1.default(colorStops, segments);
    // draw gradient image, one wedge per segment
    ctx.translate(x, y);
    for (var i = 0; i < segments; i++) {
        var from = startAngle + step * i;
        var to = from + step;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, from - overlap, to + overlap, step < 0);
        ctx.closePath();
        ctx.fillStyle = interpolate.getColor(i);
        ctx.fill();
    }
    // clip content overflow
    var cvsForClip = document.createElement('canvas');
    cvsForClip.width = width;
    cvsForClip.height = height;
    var clipCtx = cvsForClip.getContext('2d');
    clipCtx.beginPath();
    clipCtx.arc(x, y, radius, startAngle, startAngle + sweep, sweep < 0);
    clipCtx.lineTo(x, y);
    clipCtx.closePath();
    clipCtx.fillStyle = clipCtx.createPattern(canvas, 'no-repeat');
    clipCtx.fill();
    return userContext.createPattern(cvsForClip, 'no-repeat');
}
/** Whether the requested sweep can be handed over to the native implementation. */
function canUseNative(sweep) {
    return !!nativeCreateConicGradient && isFullTurn(sweep);
}
/** Builds the native gradient, mirroring the stops when the sweep is counter-clockwise. */
function renderWithNative(userContext, stops, x, y, startAngle, sweep) {
    var gradient = nativeCreateConicGradient.call(userContext, startAngle, x, y);
    // The native method always sweeps clockwise, so a counter-clockwise turn is
    // expressed by mirroring the color stops.
    var ordered = sweep > 0
        ? stops
        : stops.map(function (_a) {
            var offset = _a[0], color = _a[1];
            return [1 - offset, color];
        });
    for (var _i = 0, ordered_1 = ordered; _i < ordered_1.length; _i++) {
        var _a = ordered_1[_i], offset = _a[0], color = _a[1];
        gradient.addColorStop(offset, color);
    }
    return gradient;
}
/**
 * Builds the gradient handle. A full turn is delegated to the native
 * `createConicGradient()` when the browser has it, so modern browsers get the
 * native quality and speed instead of this simulation; every other sweep (an
 * arc, or a counter-clockwise turn) has no native equivalent and is rendered by
 * `renderConicalGradient()`.
 */
function createGradient(userContext, args) {
    var _a = args[0], ox = _a === void 0 ? 0 : _a, _b = args[1], oy = _b === void 0 ? 0 : _b, _c = args[2], startAngle = _c === void 0 ? 0 : _c, _d = args[3], endAngle = _d === void 0 ? TWO_PI : _d, _e = args[4], anticlockwise = _e === void 0 ? false : _e;
    var sweep = resolveSweep(startAngle, endAngle, anticlockwise);
    var useNative = canUseNative(sweep);
    var stops = [];
    return {
        stops: stops,
        addColorStop: function (offset, color) {
            this.stops.push([offset, color]);
        },
        get pattern() {
            if (useNative) {
                return renderWithNative(userContext, stops, ox, oy, startAngle, sweep);
            }
            return renderConicalGradient(userContext, stops, ox, oy, startAngle, endAngle, anticlockwise);
        },
    };
}
function createConicalGradient(userContext, colorStops, x, y, startAngle, endAngle, anticlockwise) {
    if (colorStops === void 0) { colorStops = [
        [0, '#fff'],
        [1, '#fff'],
    ]; }
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (startAngle === void 0) { startAngle = 0; }
    if (endAngle === void 0) { endAngle = TWO_PI; }
    if (anticlockwise === void 0) { anticlockwise = false; }
    var sweep = resolveSweep(startAngle, endAngle, anticlockwise);
    if (canUseNative(sweep)) {
        return renderWithNative(userContext, colorStops, x, y, startAngle, sweep);
    }
    return renderConicalGradient(userContext, colorStops, x, y, startAngle, endAngle, anticlockwise);
}
exports.default = createConicalGradient;
// Only install the method when it is missing, so that loading this module never
// overwrites an existing implementation.
if (typeof CanvasRenderingContext2D !== 'undefined' &&
    !CanvasRenderingContext2D.prototype.createConicalGradient) {
    CanvasRenderingContext2D.prototype.createConicalGradient = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return createGradient(this, args);
    };
}
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