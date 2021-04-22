export default class ColorInterpolate {
    private readonly ctx;
    private readonly rgbaSet;
    constructor(stops?: [number, string][], segment?: number);
    getColor(offset: number): string;
}
