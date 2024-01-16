import React from 'react'
import './accessory.css';
import ball from '../images/ball.png';

export interface Accessory {
    id: string;
    image: string;
    width: number; // in vw
    height: number; // in vw
    friction: number;
    gravity?: number;
}

export const Ball: Accessory = {
    id: 'ball',
    image: ball,
    width: 10,
    height: 10,
    friction: 5,
    gravity: 5
}

interface AccessoryLayerProps {
    accessories: Accessory[];
}

export function AccessoryLayer({accessories}: AccessoryLayerProps) {
    return (
        <div className='accessoryLayer'>
            {accessories.map(a => <AccessoryView accessory={a} key={a.id} />)}
        </div>
    )
}

interface AccessoryState {
    x: number;
    y: number;
    dx?: number;
    dy?: number;
}

function AccessoryView({accessory}: {accessory: Accessory}) {
    return (
        <div className='accessoryView'>
            <img src={accessory.image} style={{
                width: `${accessory.width}vw`,
                height: `${accessory.height}vh`,
            }} />
        </div>
    )
}
