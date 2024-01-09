import React from 'react'
import {ModalItem, ModalPlaylist} from './modalPlayer.tsx';
import './bigEmojiModal.css';

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
				<div />
				<div>
					<BigEmoji emoji={this.props.emoji} />
				</div>
				<div>
					{this.props.message && <h2>{this.props.message}</h2>}
					{this.props.subtext && <p className='subtext'>{this.props.subtext}</p>}
					<div className='transparent-button' role='button'>{this.props.buttonLabel}</div>
				</div>
			</div>
		)
	}
}

function BigEmoji({emoji}: {emoji: string}) {
	const offsets = 5;
	const offsetPer = 0.01;
	const brightnessOffset = 0.1;
	const offsetElements = [];
	for (let i = 0; i < offsets; i++) {
		const style: React.CSSProperties = {
			left: `${i * offsetPer}em`,
			top: `${i * offsetPer}em`,
		};
		if (i > 0 ) {
			style.filter = `brightness(${1 - 0.4 - (i * brightnessOffset)})`;
		}
		offsetElements.push(<div key={i} style={style}>{emoji}</div>)
	}
	offsetElements.reverse();
	return (
		<div className='bigEmoji'>
			<div className='glow'>{emoji}</div>
			<div className='shadow'>
				{offsetElements}
			</div>
			<div className='primary'>{emoji}</div>
		</div>
	)
}

export function bigEmojiModalItem(props: BigEmojiModalProps) {
	let item = new ModalItem(({ full, onForward }) => {
		return <BigEmojiModal {...props} onDone={onForward || (() => {}) } />
	}, 'BigEmojiModal');
	item.borderless = true;
	return item;
}
