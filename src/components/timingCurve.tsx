
interface XY {
    x: number; y: number;
}

export type TimingCurve = (t: number) => number

function lerp(a: number, b: number, t: number): number {
    return b * t + a * (1 - t);
}

function lerpXY(p1: XY, p2: XY, t: number): XY {
    return {
        x: lerp(p1.x, p2.x, t),
        y: lerp(p1.y, p2.y, t)
    }
}

// export function timingCurve(controlPoint1: XY, controlPoint2: XY): TimingCurve {
//     return t => {
//         const curve1 = lerpXY({x: 0, y: 0}, controlPoint1, t);
//         const curve2 = lerpXY(controlPoint2, {x: 1, y: 1}, t);
//         return lerpXY(curve1, curve2, t).y;
//     };
// }



function computeTimingCurve(duration: number, distTravelled: number): TimingCurve {
    
}
