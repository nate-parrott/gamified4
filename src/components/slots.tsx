import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import flower from '../images/icons/FLOWER.png';
import soup from '../images/icons/SOUP.png';

import coin from '../images/coin.png';
import { ModalPlaylist } from './modalPlayer.tsx';
import ActivityStore, { GetGlobalActivityStore } from './activityStore';
import { bigEmojiModalItem } from './bigEmojiModal';
import { mostRepeats, remap, uuid } from './utils.ts';
import { Parallax } from 'react-scroll-parallax';

// const images = [aol, arcscape, burger, chef, covid, feeeed, weasel, minion, seeds, sushi, toast];
const images = [flower, chef, minion, burger, feeeed, weasel, sushi, arcscape, covid, soup];

const slotIconSizeEm = 8; // 8em
const kCoinsFor2Match = 3;
const kCoinsFor3Match = 50;

interface WheelProps {
    spinToIndex: number;
}

function Wheel({spinToIndex}: WheelProps) {
    const ref = useRef<HTMLDivElement | null>();

    // Snap index within images.length * 0.5 ... images.length * 1.5
    let snappedIndex = spinToIndex % images.length; // (spinToIndex + images.length * 0.5) % images.length;
    if (snappedIndex < images.length * 0.5) {
        snappedIndex += images.length;
    }

    useEffect(() => {
        if (ref.current) {
            ref.current.style.top = `${-snappedIndex *slotIconSizeEm }em`
        }
    }, [ref, snappedIndex]);

    const repeatedImages = images.concat(images);

    return (
        <div className='slot-wheel' ref={(el) => ref.current = el}>
            {
                repeatedImages.map((img, i) => {
                    return (
                        <div className='slot-icon' key={i}>
                            <img src={img} key={i} />
                        </div>
                    )
                })
            }
        </div>
    )
}

interface SlotMachineProps {
    playPlaylist: (playlist: ModalPlaylist) => void;
    activityStore: ActivityStore;
    coins: number;
}

interface WheelSimulation {
    x: number;
    v?: number; // velocity
    // timeUntilHardStop?: number; // we increase forces when this happens
}

const epsilon = 0.1;
const kFriction = 2; // per second
// const snappingForce = 5; // per second
const mass = 1;

// dt: seconds
function advanceWheelSimulation(sim: WheelSimulation, dt: number) {
    if (sim.v === undefined) {
        return sim;
    }

    // This math does not make sense in any way physically but that is ok

    const friction = -kFriction * sim.v;
    // Snapping force snaps towards the nearest slot ahead of the current one, or very close to it
    const snapTarget = Math.round(sim.x); // sim.v < 0 ? Math.floor(sim.x + 0.1) : Math.ceil(sim.x - 0.1);
    const snapAmt = remap(sim.v, 10, 5, 0, 1);
    // const snapping = -snappingForce * (sim.x - snapTarget);
    const force = friction;
    const a = force / mass;
    const v = sim.v + a * dt;
    let x = sim.x + v * dt;
    x = remap(snapAmt, 0, 1, x, snapTarget);

    if (Math.abs(x - Math.round(x)) < epsilon && Math.abs(v) < 5) {
        return { x: Math.round(x) };
    }
    return { x, v };
}

function SlotMachine(props: SlotMachineProps) {
    const { playPlaylist, activityStore } = props;
    const initialState: WheelSimulation[] = [0,0,0].map((x) => ({ x }));
    const [wheels, setWheels] = useState(initialState);
    const [anim, setAnim] = useState<'' | 'shakeNO' | 'shakeYES' | 'shakeYES_XL'>('');

    const requestAnimationFrameIdRef = useRef<number | undefined>(undefined);

    function scheduleSpinStep() {
        if (window === undefined) { return }
        requestAnimationFrameIdRef.current = requestAnimationFrame(() => {
            setWheels((wheels) => {
                const newWheels = wheels.map((wheel) => advanceWheelSimulation(wheel, 1/60));
                const allStopped = newWheels.every((wheel) => wheel.v === undefined);
                if (allStopped) {
                    requestAnimationFrameIdRef.current = undefined;
                    
                    // match param type of `anim`
                    function playAnimation(name: typeof anim) {
                        setAnim(name);
                        // Unset after 2s
                        setTimeout(() => {
                            setAnim((a) => a === name ? '' : a);
                        }, 2000);
                    }

                    // did we win?
                    // if there are 7 images
                    // the prob of drawing 3 unique items (losing)
                    // is 1.0 * 6/7 * 5/7 = 0.612
                    // so the prob of winning is 1 - 0.612 = 0.388
                    // If you get 2 coins per win, that's an expected value
                    // of 0.388 * 2 = 0.776 coins per spin

                    const indices = newWheels.map((wheel) => Math.round(wheel.x) % images.length);
                    const matchCount = mostRepeats(indices);
                    
                    if (matchCount === 3) {
                        playAnimation('shakeYES_XL');
                        activityStore.unlockAward({
                            id: `slots-${uuid()}`,
                            name: '3 in a row!',
                            coins: kCoinsFor3Match,
                            activityText: `You won ${kCoinsFor3Match} coins at the slot machine!`,
                            category: 'slot-win',
                            notification: { coinAnim: true }
                        })    
                    } else if (matchCount === 2) {
                        playAnimation('shakeYES');
                        activityStore.unlockAward({
                            id: `slots-${uuid()}`,
                            name: '2 in a row!',
                            coins: kCoinsFor2Match,
                            activityText: `You won ${kCoinsFor2Match} coins at the slot machine!`,
                            category: 'slot-win',
                            notification: { coinAnim: true }
                        })    
                    } else {
                        playAnimation('shakeNO');
                    }

                } else {
                    scheduleSpinStep();
                }
                return newWheels;
            });
        });
    }

    const spin = useCallback(() => {
        if (requestAnimationFrameIdRef.current !== undefined) {
            return;
        }

        activityStore.addMessage({ text: "You spun the wheel...", type: 'admin', coins: -1 });

        // Apply initial impulse
        setWheels((wheels) => {
            return wheels.map((wheel, i) => {
                const x = wheel.x;
                const v = 20 + Math.random() * 13 + i * 47;
                return { x, v };
            });
        });
        scheduleSpinStep();
        // activityStore.addMessage({ text: "slots", type: 'admin', coins: 1 });
        // playPlaylist(new ModalPlaylist([bigEmojiModalItem({ emoji: '🎰', message: 'Spinning...', buttonLabel: 'Stop!' })]));
    }, [playPlaylist, activityStore, requestAnimationFrameIdRef]);

    return (
        <div className={`slot-machine-container ${anim}`}>
            <Parallax speed={10}>
                <div className='slot-machine'>
                    <div className='slot-header' role="heading" aria-label="Gamble away your hard-earned coins at the slot machine" />
                    <div className='slot-box'>
                        <div className='slot-wheels'>
                            <Wheel spinToIndex={wheels[0].x} />
                            <Wheel spinToIndex={wheels[1].x} />
                            <Wheel spinToIndex={wheels[2].x} />
                        </div>
                        <div className='slot-cover'></div>
                    </div>
                    <div className='slot-footer'>
                        <SpinButton onClick={spin} hasCoins={props.coins > 0} />
                        <p>
                            I made these icons, mainly in Blender. 
                            Pay 1 coin to spin. Get {kCoinsFor2Match} coins if 2 match and {kCoinsFor3Match} coins if 3 match!
                        </p>
                    </div>
                </div>
            </Parallax>
        </div>
    )
}

export default SlotMachine;

// Can be enabled, or disabled if no coins
interface SpinButtonProps {
    onClick: () => void;
    hasCoins: boolean;
}

function SpinButton(props: SpinButtonProps) {
    const { onClick, hasCoins } = props;
    const className = `skeu-button-inset cursor-default ${hasCoins ? '' : 'disabled'}`
    return (
        <div className={className} onClick={ hasCoins ? onClick : undefined } role='button'>
            <img src={coin} alt="" />
            <span>
                { hasCoins ? 'Spin!' : 'No Coins' }
            </span>
        </div>
    )
}

