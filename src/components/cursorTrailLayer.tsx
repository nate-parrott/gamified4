import cursor from '../images/cursor-2x.png';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { XY, lerpXY, xyDist } from './timingCurve';



// function curMousePos(): XY {
//     if (window) {
//         const evt = window.screenX
//         return {x: evt.pos}
//     }
// }

interface TrailingCursor {
    id: string;
    speed: number // 0..1
    pos?: XY;
}

function step(cursor: TrailingCursor, target: XY): TrailingCursor {
    const {id, speed, pos} = cursor;
    if (pos) {
        const newPos = lerpXY(pos, target, speed);
        return {id, pos: newPos, speed};
    }
    return {id, speed, pos};
}

function trailingCursorIsSettled(cursor: TrailingCursor, target: XY | undefined): boolean {
    if (!target) return true;
    if (!cursor.pos) return true;
    const dist = xyDist(cursor.pos, target);
    return dist < 1;
}

function defaultTrails(): TrailingCursor[] {
    const trails: TrailingCursor[] = [];
    for (let i=0; i<10; i++) {
        trails.push({
            id: `${i}`,
            speed: 0.5 + (i / 10) * 0.5,
        })
    }
    return trails
}

class CursorTrailHandler {
    node: HTMLDivElement
    divs: HTMLDivElement[]
    trails: TrailingCursor[]
    pos: XY | undefined;

    constructor() {
        this.node = document.createElement('div');
        this.trails = defaultTrails();
        this.node.addEventListener('mousemove', e => {
            this.pos = {x: e.clientX, y: e.clientY};
            this.animateStep()
        });
        this.divs = this.trails.map(_ => {
            const el = document.createElement("div");
            el.className = 'trailingCursor'
            return el;
        })
    }

    animateStep() {
        if (this.pos) {
            this.trails = this.trails.map(t => step(t, this.pos as XY));
            updateDisplay();
        }
    }
}

export default function CursorTrailLayer() {
    const [trails, setTrails] = useState(defaultTrails());
    const pos = useRef<XY | undefined>();
    const animator = useRef<number | undefined>();

    function animateStep() {

    }

    useEffect(() => {
        const listener: EventListener = (e: any) => {
            pos.current = {x: e.clientX, y: e.clientY};
            animateStep();
        };
        if (window) {
            window.addEventListener('mousemove', listener);
            return () => window.removeEventListener('mousemove', listener);
        }
    });
}
