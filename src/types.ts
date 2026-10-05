export interface ConicalGradient {
  addColorStop(pos: number, color: string): void;
  /**
   * A `CanvasGradient` when the native `createConicGradient()` is used, or a
   * `CanvasPattern` when the gradient is rendered by this package. Either value
   * can be assigned to `CanvasRenderingContext2D.fillStyle` / `strokeStyle`.
   */
  readonly pattern: CanvasPattern | CanvasGradient;
  readonly stops: [pos: number, color: string][];
}

declare global {
  interface CanvasRenderingContext2D {
    /**
     * @param ox The x-axis coordinate of the origin of the gradient pattern, which default value is `0`.
     * @param oy The y-axis coordinate of the origin of the gradient pattern, which default value is `0`.
     * @param startAngle The angle at which the arc starts in radians measured from the positive x-axis, which default
     *                   value is `0`.
     * @param endAngle The angle at which the arc ends in radians measured from the positive x-axis, which default value
     *                 is `2 * Math.PI`.
     * @param anticlockwise An optional `Boolean`. If `true`, draws the gradient counter-clockwise between the start and
     *                      end angles. The default is `false` (clockwise).
     */
    createConicalGradient(
      ox?: number,
      oy?: number,
      startAngle?: number,
      endAngle?: number,
      anticlockwise?: boolean
    ): ConicalGradient;
  }
}
