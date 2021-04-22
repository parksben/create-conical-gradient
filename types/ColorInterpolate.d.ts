export default class ColorInterpolate {
    private readonly ctx;
    constructor(stops?: [number, string][], segment?: number);
    getColor(offset: number): string;
}
