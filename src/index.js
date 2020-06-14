import ColorInterpolate from './ColorInterpolate';

export default function createConicalGradient(
  userContext,
  x,
  y,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  anticlockwise = false,
  colorStops = [
    [0, '#fff'],
    [1, '#fff'],
  ],
) {
  const degStart = Math.floor((startAngle * 180) / Math.PI);
  const degEnd = Math.ceil((endAngle * 180) / Math.PI);

  // init off-screen canvas
  const canvas = document.createElement('canvas');
  canvas.width = userContext.canvas.width;
  canvas.height = userContext.canvas.height;
  const ctx = canvas.getContext('2d');

  // gradient radius
  const radius = Math.ceil(
    Math.sqrt(Math.pow(userContext.canvas.width, 2) + Math.pow(userContext.canvas.height, 2)),
  );

  ctx.translate(x, y);
  const lineWidth = (2 * Math.PI * (radius + 20)) / 360;

  // color linear interpolate
  const interpolate = new ColorInterpolate(colorStops, degEnd - degStart + 1);

  // draw gradient image
  for (let i = degStart; i <= degEnd; i++) {
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
  const cvsForClip = document.createElement('canvas');
  cvsForClip.width = userContext.canvas.width;
  cvsForClip.height = userContext.canvas.height;
  const clipCtx = cvsForClip.getContext('2d');
  clipCtx.beginPath();
  clipCtx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  clipCtx.lineTo(x, y);
  clipCtx.closePath();
  clipCtx.fillStyle = clipCtx.createPattern(canvas, 'no-repeat');
  clipCtx.fill();

  return userContext.createPattern(cvsForClip, 'no-repeat');
}
