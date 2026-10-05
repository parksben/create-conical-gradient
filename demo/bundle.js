/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ColorInterpolate.ts"
/*!*********************************!*\
  !*** ./src/ColorInterpolate.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = ColorInterpolate;


/***/ },

/***/ "./src/index.ts"
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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
exports["default"] = createConicalGradient;
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
Object.defineProperty(exports, "ConicalGradient", ({ enumerable: true, get: function () { return types_1.ConicalGradient; } }));


/***/ },

/***/ "./src/types.ts"
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/demo.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");

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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map