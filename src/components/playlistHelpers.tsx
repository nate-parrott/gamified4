import React from 'react'
import ModalPlayer, {ModalItem, ModalPlaylist} from './modalPlayer.tsx';

const windowGlobal: any = typeof window !== 'undefined' && window;

let shouldOpenFramesInNewTab = () => {
	if (!windowGlobal) return false;
	let iOS = /iPad|iPhone|iPod/.test(windowGlobal.navigator.userAgent) && !windowGlobal.MSStream;
	return iOS || windowGlobal.innerWidth < 500;
}

export function web(url: string): ModalItem | undefined {
	if (shouldOpenFramesInNewTab()) {
		windowGlobal.open(url, '_blank');
		return undefined;
	}
	
	return new ModalItem(({ full }) => {
		if (!full) {
			return null;
		}
		return <iframe src={url} />;
	}, 'web');
}
