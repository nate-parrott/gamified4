
export interface XY {
    x: number; y: number;
}

export function lerp(a: number, b: number, t: number): number {
    return b * t + a * (1 - t);
}

export function lerpXY(p1: XY, p2: XY, t: number): XY {
    return {
        x: lerp(p1.x, p2.x, t),
        y: lerp(p1.y, p2.y, t)
    }
}

export function xyDist(p1: XY, p2: XY): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
