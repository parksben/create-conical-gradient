export default class ColorInterpolate {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly rgbaSet: Uint8ClampedArray;

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

    this.rgbaSet = this.ctx.getImageData(0, 0, segment, 1).data;
  }

  getColor(offset: number) {
    const rgba = this.rgbaSet.slice(4 * offset, 4 * offset + 4);
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
  }
}
