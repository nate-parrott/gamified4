import { pick1 } from './utils.ts';
import React from 'react'
import {ModalItem, ModalPlaylist} from './modalPlayer';
import EarnedCoinsModal from './earnedCoinsModal.jsx';
import { BasicPageItem } from './trophy';
import ActivityStore from './activityStore.js';

interface PlaylistWithRewardOptions {
	coins?: number
	category?: string; // todo: used?
}

export function playlistWithAward(awardId: string, items: ModalItem[], activityStore: ActivityStore, onDismiss: () => void, options: PlaylistWithRewardOptions | undefined) {
	let {coins, category} = (options || {});
	coins = coins || 5;
	
	let rewardEmoji = pick1(['💅', '👌', '💋', '🌝', '💕', '✨', '🌈', '💰', '💸', '😻', '🤑']);
	let rewardCongrats = pick1(['Nice going!', 'Wow!', 'Keep it up!', 'You got it!', 'As promised!', 'Exceptional!', 'Wild!']);
	if (!activityStore.hasAward(awardId)) {
		let awardItem = new ModalItem(({full}) => {
			if (!full) return null;
			
			if (!activityStore.hasAward(awardId)) {
				// unlock in the next run loop:
				setTimeout(() => {
					activityStore.unlockAward({
						id: awardId,
						coins: coins as number,
						activityText: `🤑 You earned ${coins} coins for content consumption!`,
						notification: {
							coinAnim: false
						},
						category: category as string
					});
				}, 0);
			}
			let title = rewardEmoji + ' ' + rewardCongrats;
			return <EarnedCoinsModal coins={coins} title={title} subtitle={`You’ve earned ${coins} coins for viewing!`} onDismiss={onDismiss} />;
		}, 'earnedCoinsModalItem');
		items = [...items, awardItem];
	}
	return new ModalPlaylist(items);
}

export function comingSoonPage() {
	return BasicPageItem({
		title: "Coming soon!",
		subtitle: "I guess you can have the coins anyway, though.",
		nextButtonTitle: "Whatever"
	})
}
