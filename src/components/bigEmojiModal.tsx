import React from 'react'
import {ModalItem, ModalPlaylist} from './modalPlayer.js';
import './coinUnlockModalItem.css';

interface BigEmojiModalProps {
	emoji: string;
	archText?: string;
	message?: string;
	subtext?: string;
	buttonLabel: string;
}

interface BigEmojiModalPropsFull extends BigEmojiModalProps {
	onDone: () => void;
}

interface BigEmojiModalState {
	stage: 'preAppear' | 'appear' | 'disappear';
}

class BigEmojiModal extends React.Component<BigEmojiModalPropsFull, BigEmojiModalState> {
	constructor(props: BigEmojiModalPropsFull) {
		super(props);
		this.state = {stage: 'preAppear'};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({stage: 'appear'})
		}, 50);
	}
	render() {
		let {stage} = this.state;
		let onClick: () => void = () => {};
		if (stage === 'appear') {
			onClick = () => {
				this.setState({ stage: 'disappear' });
				setTimeout(() => {
					this.props.onDone();
				}, 700);
			}
		}
		let rootClass = `BigEmojiModal stage-${stage}`;
		return (
			<div className={rootClass} onClick={onClick}>
				<div className='inner'>
					<div className='bigEmoji'>{this.props.emoji}</div>

					{this.props.message && <h2>{this.props.message}</h2>}
					{this.props.subtext && <p className='subtext'>{this.props.subtext}</p>}

					<div className='transparent-button' role='button'>{this.props.buttonLabel}</div>
				</div>
			</div>
		)
	}
}


export function bigEmojiModalItem(props: BigEmojiModalProps) {
	let item = new ModalItem(({ full, onForward }) => {
		return <BigEmojiModal {...props} onDone={onForward || (() => {}) } />
	}, 'BigEmojiModal');
	item.borderless = true;
	return item;
}
