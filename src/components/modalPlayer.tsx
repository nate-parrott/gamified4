import React from 'react'
import './modalPlayer.css';
import { uuid } from './utils';

type ModalItemRenderFn = (options: {full: boolean, onForward?: () => void}) => React.ReactElement | null;

export class ModalItem {
	identifier: string;
	render: ModalItemRenderFn;
	itemClass: string; // TODO: Define types
	borderless: boolean

	constructor(render: ModalItemRenderFn, itemClass: string) {
		this.identifier = uuid();
		this.render = render;
		this.itemClass = itemClass;
		this.borderless = false;
	}
}

export class ModalPlaylist {
	identifier: string;
	items: ModalItem[]
	constructor(items: ModalItem[]) {
		this.identifier = uuid();
		this.items = items;
	}
}

interface ModalItemViewProps {
	item: ModalItem;
	onBack?: () => void;
	onForward?: () => void;
	offset: number;
	isLast: boolean;
}

const ModalItemView = ({ item, onBack, onForward, offset, isLast }: ModalItemViewProps) => {
	let borderless = item.borderless;
	let className = `ModalItemView offset_${offset} ${item.itemClass || ''}`;
	if (borderless) className += ' borderless';
	
	let content = item.render({ full: (offset === 0), onForward });
	return (
		<div className={className}>
			<div className='content'>{ content }</div>
			{/* {onBack && !borderless ? <div className='control back' onClick={onBack} key='back' /> : null} */}
			{
				!borderless && (
					<div className='ModalToolbar'>
						<div className='control forward' aria-role='button' onClick={onForward} key='forward'>
							{isLast ? "Done" : "Next"}
						</div>
					</div>
				)
			}
		</div>
	)
}

interface ModalPlayerProps {
	playlist?: ModalPlaylist;
	onDone: () => void;
}

interface ModalPlayerState {
	itemIndex: number
}

export default class ModalPlayer extends React.Component<ModalPlayerProps, ModalPlayerState> {
	constructor(props: ModalPlayerProps) {
		super(props);
		this.state = { itemIndex: 0 };
	}
	componentDidUpdate(prevProps: Readonly<ModalPlayerProps>, prevState: Readonly<ModalPlayerState>) {
		let prevPlaylistId = prevProps.playlist ? prevProps.playlist.identifier : null;
		let newPlaylistId = this.props.playlist ? this.props.playlist.identifier : null;
		if (prevPlaylistId !== newPlaylistId && this.state.itemIndex !== 0) {
			this.setState({ itemIndex: 0 });
		}
	}
	render() {
		let {playlist} = this.props;
		
		let {itemIndex} = this.state;
		let items = playlist ? playlist.items : [];
		
		let offsets = [0, 1, 2];
		let itemViews = offsets.map((offset) => {
			let idx = itemIndex + offset;
			if (idx < 0 || idx >= items.length) {
				return null;
			}
			let actionProps = {};
			if (offset === 0) {
				actionProps = {
					onBack: this.back.bind(this),
					onForward: this.forward.bind(this),
					onDismiss: this.dismiss.bind(this)
				};
			}
			const isLast = idx + 1 === items.length;
			return <ModalItemView key={idx} item={items[idx]} offset={offset} {...actionProps} isLast={isLast} />;
		});
		
		let dismiss = (e: any) => {
			if (e.currentTarget === e.target) {
				this.dismiss();
			}
		}
		return <div className='ModalPlayer' onClick={dismiss}>{itemViews}</div>;
	}
	back() {
		this.advance(-1);
	}
	forward() {
		this.advance(1);
	}
	advance(i: number) {
		let {playlist} = this.props;
		let {itemIndex} = this.state;
		let items = playlist ? playlist.items : [];
		let newIndex = itemIndex + i;
		if (newIndex < 0 || newIndex >= items.length) {
			this.props.onDone();
		} else {
			this.setState({itemIndex: newIndex});
		}
	}
	dismiss() {
		this.props.onDone();
	}
}
