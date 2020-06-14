export default class ColorInterpolate {
  constructor(stops = [], segment = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = segment;
    canvas.height = 1;
    this.ctx = canvas.getContext('2d');

    const gradient = this.ctx.createLinearGradient(0, 0, segment, 0);
    for (let [offset, color] of stops) {
      gradient.addColorStop(offset, color);
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, segment, 1);
  }

  getColor(offset) {
    const imgData = this.ctx.getImageData(offset, 0, 1, 1);
    return `rgba(${imgData.data.slice(0, 4).join(',')})`;
  }
}
