import { ModalItem, ModalPlaylist } from './modalPlayer';
import { BasicPageItem } from './trophy.jsx';
import HScroll from './hscroll.jsx';
import React from 'react'
import './incentives.css';
import { coinUnlockModalItem } from './coinUnlockModalItem.jsx';
import { withPrefix } from './utils';
import ActivityStore from './activityStore';

export interface Incentive {
	cost: number;
	id: string;
	name: string;
	playlist: ModalItem[];
	activityText: string;
	coinMultiplier?: number;
	cssUnlock?: string;
}

export let Incentives: Incentive[] = [
	{
		cost: 5,
		id: 'resume',
		name: "Download my (2018) Resume",
		playlist: [BasicPageItem({ title: "Here's my (2018) resume!", bigText: '📄 Resume', bigTextUrl: withPrefix('/Resume2018.pdf'), nextButtonTitle: 'Fine, whatever' })],
		activityText: "You paid 5 coins to download my resume!"
	},
	{
		cost: 15,
		id: 'email',
		name: "Send Me an Email",
		playlist: [BasicPageItem({ title: "Send me an email!", bigText: '💌 nate@nateparrott.com', bigTextUrl: 'mailto:nate@nateparrott.com', nextButtonTitle: 'Ok...' })],
		activityText: "You paid 15 coins to send me an email!"
	},
	{
		cost: 20,
		id: 'premiumCursor',
		name: "Unlock a Premium Cursor",
		playlist: [BasicPageItem({ title: "Premium cursor unlocked", subtitle: "This premium cursor is larger and more powerful.", nextButtonTitle: 'See how it feels' })],
		activityText: "You paid 15 coins to send me an email!",
		cssUnlock: 'premiumCursor',
	},
	{
		cost: 24,
		id: '2x',
		name: "Earn 2x for every Coin",
		playlist: [BasicPageItem({ title: "Double coins bonus unlocked!", subtitle: "Move over, Mr. Moneybags.", bigText: '🤑🤑🤑', nextButtonTitle: 'Take advantage!' })],
		activityText: "Paid 24 coins to unlock 💰 DOUBLE COINS 💰 going forward",
		coinMultiplier: 2
	},
	// https://m.me/join/AbbqCUCEphSULk3r
	// {
	// 	cost: 42,
	// 	id: 'chatroom',
	// 	name: "Join the VIP Chatroom",
	// 	playlist: [BasicPageItem({ bigText: '🤝 Join', title: 'Please don’t be weird.', nextButtonTitle: 'Done' })],
	// 	activityText: "You paid 42 coins to join the exclusive VIP chatroom. Why would you do that?"
	// },
	{
		cost: 56,
		id: 'goldmode',
		name: "Unlock 🏆Gold Mode🏆",
		playlist: [BasicPageItem({ bigText: '🏆 Gold Mode 🏆', title: 'You’ve unlocked gold mode.', subtitle: 'This is what the kids would call a "weird flex."', nextButtonTitle: 'Swoosh' })],
		activityText: "You paid 56 coins to unlock 🏆 Gold Mode 🏆!",
		cssUnlock: 'goldMode'
	},
	{
		cost: 200,
		id: 'sticker',
		name: "Get a Sticker in the Mail",
		playlist: [BasicPageItem({ title: "Email me, and I’ll send you a sticker!", subtitle: "Just tell me where to send it.", bigText: '📭 Request', bigTextUrl: 'mailto:nate@nateparrott.com?subject=I%20want%20a%20sticker', nextButtonTitle: 'Done' })],
		activityText: "You paid 152 coins to send me an email requesting a sticker. Good luck receiving it."
	},
]

interface IncentiveViewProps {
	name: string
	cost: number
	unlocked: boolean
	onClick: () => void
}
const IncentiveView = ({ name, cost, unlocked, onClick }: IncentiveViewProps) => {
	let className = 'IncentiveView ' + (unlocked ? 'unlocked' : '');
	return (
	  <div className={className} onClick={onClick}>
			<div className='lock'>
				<label>{cost}</label>
			</div>
			<h6>{name}</h6>
		</div>
	);
}

interface IncentivesSectionProps {
	playPlaylist: (playlist: ModalPlaylist) => void;
	activityStore: ActivityStore;
}
const IncentivesSection = ({ playPlaylist, activityStore }: IncentivesSectionProps) => {
	return (
		<HScroll>
			{ Incentives.map((incentive, i) => {
				let unlocked = activityStore.hasIncentive(incentive.id);
				let onClick = () => {
					let showIncentiveContent = () => {
						playPlaylist(new ModalPlaylist(incentive.playlist));
					};
					if (activityStore.hasIncentive(incentive.id)) {
						showIncentiveContent();
						return;
					}
					let canUnlock = activityStore.coinBalance() >= incentive.cost;
					playPlaylist(new ModalPlaylist([coinUnlockModalItem(() => {
						if (!canUnlock) {
							return;
						}
						activityStore.unlockIncentive(incentive);
						setTimeout(() => {
							showIncentiveContent();
						}, 200);
					}, !canUnlock)]));
				};
				return <IncentiveView key={i} name={incentive.name} cost={incentive.cost} onClick={onClick} unlocked={unlocked} />
			} ) }
		</HScroll>
	)
}

export default IncentivesSection;
