import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import "./slots.css";
import aol from '../images/icons/AOL.png';
import arcscape from '../images/icons/ARCSCAPE.png';
import burger from '../images/icons/BURGER.png';
import chef from '../images/icons/CHEF.png';
import covid from '../images/icons/COVIDTEST.png';
import feeeed from '../images/icons/FEEEED.png';
import weasel from '../images/icons/WEASEL.png';
import minion from '../images/icons/MINION.png';
import seeds from '../images/icons/SEEDS.png';
import sushi from '../images/icons/SUSHI.png';
import toast from '../images/icons/TOAST.png';

import coin from '../images/coin.png';

const images = [aol, arcscape, burger, chef, covid, feeeed, weasel, minion, seeds, sushi, toast];

const slotIconSizeEm = 8; // 8em


interface WheelProps {
    spinToIndex: number;
}

function Wheel({spinToIndex}: WheelProps) {
    const ref = useRef<HTMLDivElement | null>();
    useEffect(() => {
        if (ref.current) {
            ref.current.style.top = `${-spinToIndex * slotIconSizeEm}em`
        }
    }, [ref, spinToIndex]);

    return (
        <div className='slot-wheel' ref={(el) => ref.current = el}>
            {
                images.map((img, i) => {
                    return (
                        <div className='slot-icon'>
                            <img src={img} key={i} />
                        </div>
                    )
                })
            }
        </div>
    )
}

function SlotMachine() {
    const [indices, setIndices] = useState([1,2,3]);
    return (
        <div className="slot-machine">
            <div className='slot-header' role="heading" aria-label="Gamble away your hard-earned coins at the slot machine" />
            <div className='slot-box'>
                <div className='slot-wheels'>
                    <Wheel spinToIndex={indices[0]} />
                    <Wheel spinToIndex={indices[1]} />
                    <Wheel spinToIndex={indices[2]} />
                </div>
                <div className='slot-cover'></div>
            </div>
            <div className='skeu-button-inset'>
                <img src={coin} />
                <span>
                Spin!
                </span>
            </div>
            <p>
                I made these icons, mainly in Blender. Roll 3 of the same to win big!
            </p>
        </div>
    )
}

export default SlotMachine;

// export default class SlotMachine extends React.Component {
// 	render() {
// 		let { activityStore } = this.props;
// 		return (
// 			<div className='readable-width boxed-content section'>
// 				<h3>Quiz!</h3>
// 				<QuizContent activityStore={activityStore} />
// 			</div>
// 		)
// 	}
// }
// src/images/icons/WEASEL.png src/images/icons/AOL.png src/images/icons/ARCSCAPE.png src/images/icons/BURGER.png src/images/icons/CHEF.png src/images/icons/COVIDTEST.png src/images/icons/FEEEED.png src/images/icons/MINION.png src/images/icons/SEEDS.png src/images/icons/SOUP.png src/images/icons/SUSHI.png src/images/icons/TOAST.png