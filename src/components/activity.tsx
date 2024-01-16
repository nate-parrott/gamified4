import React, { useEffect, useState } from 'react'
import './activity.css';
import coin from '../images/coin.png';
import ActivityStore, { Award, Message } from './activityStore';

const windowGlobal = typeof window !== 'undefined' && window;

// const ActivityMessage = ({ message, activityStore }: { message: Message, activityStore: ActivityStore }) => {
// 	if (message.type === 'divider') {
// 		return <div className='divider' />;
// 	}
// 	return (
// 		<div className={`message type-${message.type}`}>
// 			<div className='bubble'>
// 				{message.text}
// 			</div>
// 		</div>
// 	);
// }

const TOAST_DURATION = 6000;
const TOAST_DISAPPEAR_TIME = TOAST_DURATION - 500;

interface ActivityProps {
	activityStore: ActivityStore;
}

interface ActivityState {
	expanded: boolean;
	messages: Message[];
	toast?: ToastContent;
}

export default class Activity extends React.Component<ActivityProps, ActivityState> {
	coinImageRef: HTMLImageElement | undefined | null;
	cancelChangeListener: (() => void) | undefined;
	cancelNewAwardListener: (() => void) | undefined;

	constructor(props: ActivityProps) {
		super(props);
		this.state = { messages: [], expanded: false, toast: { emoji: "🕹", text: "Nice clicking! You’ve unlocked the CLICKER CLIQUE trophy for clicking 20 times. Here’s 10 coins." }};
		// setTimeout(() => {
		// 	this.playCoinAnimation(5);
		// }, 500);
	}
	componentDidMount() {
		let { activityStore } = this.props;
		this.cancelChangeListener = activityStore.onChange((store: ActivityStore) => {
			this.setState({ messages: activityStore.messages });
		});
		this.cancelNewAwardListener = activityStore.newAwardAnnouncer.listen((award: Award) => {
			if (award.notification.coinAnim) {
				this.playCoinAnimation(award.coins);
			}
			if (award.notification.toast) {
				this.toast({text: award.activityText, emoji: award.notification.toastEmoji});
			}
		});
	}
	componentWillUnmount() {
		if (this.cancelChangeListener) {
			this.cancelChangeListener();
			this.cancelChangeListener = undefined;
		}
		if (this.cancelNewAwardListener) {
			this.cancelNewAwardListener();
			this.cancelNewAwardListener = undefined;
		}
	}
	toggleExpanded() {
		this.setState({ expanded: !this.state.expanded })
	}
	render() {
		let { activityStore } = this.props;
		let { toast } = this.state;
		let coins = activityStore.coinBalance();

		return (
			<div className='activity-container'>
				<div className='activity coin-count' onClick={() => this.toggleExpanded()}>
					<img src={coin} className='coin' ref={(el) => {this.coinImageRef = el}} />
					<label>{coins} coins</label>
				</div>
				{ toast && <Toast onClick={this.dismissToast.bind(this)}><ToastContentView {...toast} /></Toast> }
			</div>
		)
	}
	playCoinAnimation(coins: number) {
		const imageNode = this.coinImageRef;
		if (!imageNode) return;
		
		let nCoins = Math.min(coins, 10);
		let timeBetweenCoins = Math.min(nCoins * 200, 1000) / nCoins;
		
		for (let i=0; i<nCoins; i++) {
			playSingleCoinFlightAnimation(imageNode, i * timeBetweenCoins);
		}
	}
	toast(content: ToastContent) {
		this.setState({ toast: content });
		setTimeout(() => {
			this.setState(s => {
				if (s.toast?.text === content.text) {
					return {...s, toast: undefined};
				}
				return s;
			})
		}, TOAST_DURATION);
	}
	dismissToast() {
		this.setState({toast: undefined});
	}
}

interface ToastContent {
	text: string;
	emoji?: string;
}

// The label
const ToastContentView = ({text, emoji}: ToastContent) => {
	return (
		<div className='toast-content-view'>
			{ emoji && <span className='toast-emoji'>{emoji}</span> }
			<span>{text}</span>
		</div>
	)
}

interface ToastProps {
	children: React.ReactNode;
	onClick: () => void;
}

// The actual floating thing, with padding
const Toast = ({children, onClick}: ToastProps) => {
	const [phase, setPhase] = useState<'start' | 'middle' | 'end'>('start');
	
	useEffect(() => {
		if (phase === 'start') {
			setTimeout(() => {
				setPhase('middle');
			}, 0);
		} else if (phase === 'middle') {
			setTimeout(() => {
				setPhase('end');
			}, TOAST_DISAPPEAR_TIME);
		}
	}, [phase]);

	return (
		<div className={`toast toast-anim-${phase}`} onClick={onClick}>
			{children}
		</div>
	)
}

const playSingleCoinFlightAnimation = (targetCoinsImageNode: HTMLImageElement, delay: number) => {
	if (!windowGlobal) return;
	let body = windowGlobal.document.body;
	let targetRect = targetCoinsImageNode.getBoundingClientRect();
	
	let container = document.createElement('div');
	container.setAttribute("class", "coinAnimationContainer");
	
	let flyingCoin = document.createElement("img");
	flyingCoin.src = targetCoinsImageNode.src;
	container.appendChild(flyingCoin);
	flyingCoin.style.left = targetRect.left + 'px';
	flyingCoin.style.top = targetRect.top + 'px';
	flyingCoin.style.width = targetRect.width + 'px';
	flyingCoin.style.height = targetRect.height + 'px';
	
	body.appendChild(container);
	setTimeout(() => {
		container.setAttribute("class", "coinAnimationContainer started");
	}, delay);
	
	const duration = 1000;
	setTimeout(() => {
		body.removeChild(container);
	}, delay + duration);
}

