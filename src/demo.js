import createConicalGradient from './index';

const canvas = document.getElementById('demo-canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = createConicalGradient(ctx, 240, 135, 0, Math.PI * 1.5, false, [
  [0, '#f00'],
  [0.8, '#0f0'],
  [1, '#0ff'],
]);
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
