export default class ColorInterpolate {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(stops: [number, string][] = [], segment = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = segment;
    canvas.height = 1;
    this.ctx = canvas.getContext('2d')!;

    const gradient = this.ctx.createLinearGradient(0, 0, segment, 0);
    for (const stop of stops) {
      gradient.addColorStop(...stop);
    }

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, segment, 1);
  }

  getColor(offset: number) {
    const imgData = this.ctx.getImageData(offset, 0, 1, 1);
    return `rgba(${imgData.data.slice(0, 3).join(',')}, ${imgData.data[3] / 255})`;
  }
}
