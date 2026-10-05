import ColorInterpolate from './ColorInterpolate';
import { ConicalGradient } from './types';

const TWO_PI = Math.PI * 2;

/** A hair of overlap between neighbouring wedges hides the antialiased seams. */
const SEAM_OVERLAP = 0.5 * (Math.PI / 180);

/**
 * The native implementation, captured at load time so that delegating to it can
 * never end up calling back into this polyfill.
 */
const nativeCreateConicGradient =
  typeof CanvasRenderingContext2D !== 'undefined'
    ? (CanvasRenderingContext2D.prototype as CanvasRenderingContext2D & {
        createConicGradient?: (
          startAngle: number,
          x: number,
          y: number
        ) => CanvasGradient;
      }).createConicGradient
    : undefined;

/**
 * Resolves the sweep between `startAngle` and `endAngle` into a signed delta:
 * positive clockwise, negative anticlockwise, with a magnitude within
 * `(0, 2 * Math.PI]`. These are the exact semantics of `ctx.arc()`.
 */
function resolveSweep(
  startAngle: number,
  endAngle: number,
  anticlockwise: boolean
) {
  let delta = (endAngle - startAngle) % TWO_PI;

  if (anticlockwise) {
    if (delta === 0) delta = -TWO_PI;
    else if (delta > 0) delta -= TWO_PI;
  } else if (delta <= 0) {
    delta += TWO_PI;
  }

  return delta;
}

function isFullTurn(sweep: number) {
  return Math.abs(sweep) >= TWO_PI - 1e-9;
}

/** Draws the wedges of the gradient and returns them as a canvas pattern. */
function renderConicalGradient(
  userContext: CanvasRenderingContext2D,
  colorStops: [number, string][],
  x: number,
  y: number,
  startAngle: number,
  endAngle: number,
  anticlockwise: boolean
) {
  const { width, height } = userContext.canvas;

  // init off-screen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // user canvas corners
  const corners: [number, number][] = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ];

  // gradient radius
  const radius =
    Math.max(...corners.map(([cx, cy]) => Math.hypot(cx - x, cy - y))) + 10;

  const sweep = resolveSweep(startAngle, endAngle, anticlockwise);
  const segments = Math.max(2, Math.round((Math.abs(sweep) * 180) / Math.PI));
  const step = sweep / segments;
  const overlap = step > 0 ? SEAM_OVERLAP : -SEAM_OVERLAP;

  // color linear interpolate
  const interpolate = new ColorInterpolate(colorStops, segments);

  // draw gradient image, one wedge per segment
  ctx.translate(x, y);
  for (let i = 0; i < segments; i++) {
    const from = startAngle + step * i;
    const to = from + step;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, from - overlap, to + overlap, step < 0);
    ctx.closePath();

    ctx.fillStyle = interpolate.getColor(i);
    ctx.fill();
  }

  // clip content overflow
  const cvsForClip = document.createElement('canvas');
  cvsForClip.width = width;
  cvsForClip.height = height;
  const clipCtx = cvsForClip.getContext('2d')!;
  clipCtx.beginPath();
  clipCtx.arc(x, y, radius, startAngle, startAngle + sweep, sweep < 0);
  clipCtx.lineTo(x, y);
  clipCtx.closePath();
  clipCtx.fillStyle = clipCtx.createPattern(canvas, 'no-repeat')!;
  clipCtx.fill();

  return userContext.createPattern(cvsForClip, 'no-repeat')!;
}

/** Whether the requested sweep can be handed over to the native implementation. */
function canUseNative(sweep: number) {
  return !!nativeCreateConicGradient && isFullTurn(sweep);
}

/** Builds the native gradient, mirroring the stops when the sweep is counter-clockwise. */
function renderWithNative(
  userContext: CanvasRenderingContext2D,
  stops: [number, string][],
  x: number,
  y: number,
  startAngle: number,
  sweep: number
) {
  const gradient = nativeCreateConicGradient!.call(
    userContext,
    startAngle,
    x,
    y
  );
  // The native method always sweeps clockwise, so a counter-clockwise turn is
  // expressed by mirroring the color stops.
  const ordered =
    sweep > 0
      ? stops
      : stops.map(
          ([offset, color]) => [1 - offset, color] as [number, string]
        );
  for (const [offset, color] of ordered) {
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
function createGradient(
  userContext: CanvasRenderingContext2D,
  args: [number?, number?, number?, number?, boolean?]
): ConicalGradient {
  const [
    ox = 0,
    oy = 0,
    startAngle = 0,
    endAngle = TWO_PI,
    anticlockwise = false,
  ] = args;

  const sweep = resolveSweep(startAngle, endAngle, anticlockwise);
  const useNative = canUseNative(sweep);
  const stops: [number, string][] = [];

  return {
    stops,
    addColorStop(offset, color) {
      this.stops.push([offset, color]);
    },
    get pattern() {
      if (useNative) {
        return renderWithNative(userContext, stops, ox, oy, startAngle, sweep);
      }

      return renderConicalGradient(
        userContext,
        stops,
        ox,
        oy,
        startAngle,
        endAngle,
        anticlockwise
      );
    },
  };
}

export default function createConicalGradient(
  userContext: CanvasRenderingContext2D,
  colorStops = [
    [0, '#fff'],
    [1, '#fff'],
  ] as [number, string][],
  x = 0,
  y = 0,
  startAngle = 0,
  endAngle = TWO_PI,
  anticlockwise = false
): CanvasPattern | CanvasGradient {
  const sweep = resolveSweep(startAngle, endAngle, anticlockwise);

  if (canUseNative(sweep)) {
    return renderWithNative(userContext, colorStops, x, y, startAngle, sweep);
  }

  return renderConicalGradient(
    userContext,
    colorStops,
    x,
    y,
    startAngle,
    endAngle,
    anticlockwise
  );
}

// Only install the method when it is missing, so that loading this module never
// overwrites an existing implementation.
if (
  typeof CanvasRenderingContext2D !== 'undefined' &&
  !CanvasRenderingContext2D.prototype.createConicalGradient
) {
  CanvasRenderingContext2D.prototype.createConicalGradient = function (...args) {
    return createGradient(this, args);
  };
}

export { ConicalGradient } from './types';
