# Create Conical Gradient

> **⚠️ Note:** Modern browsers support conic gradients natively. In **CSS**, use [`conic-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient) (Chrome 69+, Firefox 83+, Safari 12.1+); in **Canvas**, use [`CanvasRenderingContext2D.createConicGradient()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createConicGradient) (Chrome 99+, Firefox 112+, Safari 16.1+).
>
> **Please prefer these built-in APIs in new projects.** This package is kept mainly for learning purposes and for legacy browsers without native support.
>
> This package does not shadow the native API. On browsers that have `createConicGradient()`, `ctx.createConicalGradient()` delegates a full turn to the native implementation, so you get the native quality and speed; only a partial sweep (an arc), which has no native equivalent, is rendered by the JavaScript simulation in this package.

![npm](https://img.shields.io/npm/l/create-conical-gradient.svg)
![npm](https://img.shields.io/npm/dt/create-conical-gradient.svg)
![npm](https://img.shields.io/npm/v/create-conical-gradient/latest.svg)

A pretty extension for [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) to create a pattern of the conical gradient.

## 🥐 Preface

CSS has long supported the conical gradients by the property [`conic-gradient`](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient), and the [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) has since added its own [`createConicGradient()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createConicGradient). This package implements the same capability by a method similar to [`CanvasRenderingContext2D.createLinearGradient()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient) and [`CanvasRenderingContext2D.createRadialGradient()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient), which makes it handy for legacy browsers or as a reference implementation.

## 🥪 Demo Online

<a href="https://codesandbox.io/p/sandbox/create-conical-gradient-ozw8o?file=/src/App.js" target="_blank">
  <img src="https://raw.githubusercontent.com/parksben/create-conical-gradient/master/demo/demo-online.jpg" alt="demo-online">
</a>

<a href="https://codesandbox.io/p/sandbox/create-conical-gradient-ozw8o?file=/src/App.js" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit on CodeSandbox">
</a>

## 🌮 Install

Install the **npm** package for development.

```bash
npm i create-conical-gradient
```

Of course, you can also use the **umd** resources for production:

```html
<script src="https://unpkg.com/create-conical-gradient@latest/umd/create-conical-gradient.min.js"></script>
```

## 🥯 Quickstart

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
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

Output:

![quickstart](https://raw.githubusercontent.com/parksben/create-conical-gradient/master/demo/output.png)

<a href="https://codesandbox.io/p/sandbox/create-conical-gradient-ozw8o?file=/src/App.js" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit on CodeSandbox">
</a>

## 🍔 Docs

### ctx.createConicalGradient

#### Syntax

```js
void ctx.createConicalGradient(ox, oy, startAngle, endAngle, anticlockwise);
```

#### Parameters

##### `ox`

The x-axis coordinate of the origin of the gradient pattern, which default value is `0`.

##### `oy`

The y-axis coordinate of the origin of the gradient pattern, which default value is `0`.

##### `startAngle`

The angle at which the arc starts in radians measured from the positive x-axis, which default value is `0`.

##### `endAngle`

The angle at which the arc ends in radians measured from the positive x-axis, which default value is `2 * Math.PI`.

##### `anticlockwise`

An optional `Boolean`. If true, draws the gradient counter-clockwise between the start and end angles. The default is `false` (clockwise).

### gradient.addColorStop

#### Syntax

```js
void gradient.addColorStop(offset, color);
```

### gradient.pattern

The gradient as a value you can assign to `fillStyle` / `strokeStyle`. It is a native
`CanvasGradient` when the browser has `createConicGradient()` and the requested sweep is a
full turn, and a `CanvasPattern` rendered by this package otherwise.

#### Parameters

##### `offset`

A number between `0` and `1`, inclusive, representing the position of the color stop. `0` represents the start of the gradient and `1` represents the end; an `INDEX_SIZE_ERR` is raised if the number is outside that range.

##### `color`

A [**CSS \<color\>**](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) value representing the color of the stop. A `SYNTAX_ERR` is raised if the value cannot be parsed as a **CSS \<color\>** value.

## 🍰 License

[MIT License](https://github.com/parksben/create-conical-gradient/blob/master/LICENSE)
