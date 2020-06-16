import './index';

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
