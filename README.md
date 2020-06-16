# Create Conical Gradeint

![npm](https://img.shields.io/npm/l/create-conical-gradient.svg)
![npm](https://img.shields.io/npm/dt/create-conical-gradient.svg)
![npm](https://img.shields.io/npm/v/create-conical-gradient/latest.svg)

A pretty extension for [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to create a pattern of the conical gradient.

## Demo

![demo](https://raw.githubusercontent.com/parksben/create-conical-gradient/master/demo/house.png)

<a href="https://codesandbox.io/s/create-colorful-house-1o5op?file=/src/App.js" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit markdown-navbar-demo-online">
</a>

## 🍿 Install

Install the **npm** package for development:

```bash
yarn add create-conical-gradient # OR `npm i --save create-conical-gradient`
```

Of course, you can also use the **umd** resources for production:

```html
<script src="//unpkg.com/create-conical-gradient@latest/umd/create-conical-gradient.min.js"></script>
```

## 🌭 Quickstart

Codes:

```html
<canvas id="my-canvas" width="480" height="270">
  Your browser does not support canvas...
</canvas>
```

```js
import 'create-conical-gradient'; // If you use the npm package.

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const gradient = ctx.createConicalGradient(240, 135, -Math.PI, Math.PI);

gradient.addColorStop(0, '#f00');
gradient.addColorStop(0.2, '#00f');
gradient.addColorStop(0.4, '#0ff');
gradient.addColorStop(0.6, '#f0f');
gradient.addColorStop(0.8, '#ff0');
gradient.addColorStop(1, '#f00');

ctx.fillStyle = gradient.pattern;
ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
```

Output:

![quickstart](https://raw.githubusercontent.com/parksben/create-conical-gradient/master/demo/output.png)

<a href="https://codesandbox.io/s/create-conical-gradient-ozw8o?file=/src/App.js" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit markdown-navbar-demo-online">
</a>
