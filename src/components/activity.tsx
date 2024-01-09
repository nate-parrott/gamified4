import React from 'react'
import './activity.css';
import coin from '../images/coin.png';
import chevron from '../images/chevron.svg';
import ActivityStore, { Award, Message } from './activityStore';

const windowGlobal = typeof window !== 'undefined' && window;

const ActivityMessage = ({ message, activityStore }: { message: Message, activityStore: ActivityStore }) => {
	if (message.type === 'divider') {
		return <div className='divider' />;
	}
	return (
		<div className={`message type-${message.type}`}>
			<div className='bubble'>
				{message.text}
			</div>
		</div>
	);
}

interface ActivityProps {
	activityStore: ActivityStore;
}

interface ActivityState {
	expanded: boolean;
	messages: Message[];
}

export default class Activity extends React.Component<ActivityProps, ActivityState> {
	coinImageRef: HTMLImageElement | undefined | null;
	cancelChangeListener: (() => void) | undefined;
	cancelNewAwardListener: (() => void) | undefined;

	constructor(props: ActivityProps) {
		super(props);
		this.state = { messages: [], expanded: false };
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
			if (award.suppressDefaultNotification) return;
			this.playCoinAnimation(award.coins);
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
		let { expanded } = this.state;
		let { messages } = activityStore;
		let coins = activityStore.coinBalance();

		return (
			<div className={ expanded ? 'activity expanded' : 'activity' }>
				<div className='coin-count activity-header' onClick={() => this.toggleExpanded()}>
					<img src={coin} className='coin' ref={(el) => {this.coinImageRef = el}} />
					<label>{coins} coins</label>
					<div className='flex-space' />
					<img src={chevron} className='chevron' />
				</div>
				<div className='chat'>
					{activityStore.mostRecentMessagesReversed().map((message) => (
						<ActivityMessage key={message.id} message={message} activityStore={activityStore} />
					))}
				</div>
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

