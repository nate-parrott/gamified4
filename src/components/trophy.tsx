import React from 'react'
import './trophy.css';
import { ModalItem } from './modalPlayer';
import HScroll from './hscroll.jsx';
import snapcodeBitmoji from '../images/snapcodeBitmoji.svg'
import ActivityStore from './activityStore';

interface TrophyProps {
	emoji: string;
	name: string;
	desc: string;
	value: number;
	action?: () => void;
	unlocked: boolean;
}
const Trophy = ({ emoji, name, desc, value, action, unlocked }: TrophyProps) => (
  <div className={`trophy ${unlocked ? 'unlocked' : 'locked'}`} onClick={action}>
		<div className='emoji'><span>{emoji}</span></div>
		<div className='name'>{name}</div>
		<div className='desc'>{desc}</div>
		<UnlockButton hasAction={!!action} unlocked={unlocked} />
	</div>
)

interface UnlockButtonProps {
	hasAction: boolean;
	unlocked: boolean;
}
const UnlockButton = ({ hasAction, unlocked }: UnlockButtonProps) => {
	if (unlocked) {
		return <div className='unlocked'>Unlocked!</div>
	}
	if (hasAction) {
		return <div className='unlock'>Click here!</div>
	}
	return <div className='not-unlocked'>Not unlocked</div>
}

interface BasicPageItemProps {
	bigText?: string;
	bigTextUrl?: string;
	bigImage?: string;
	title?: string;
	subtitle?: string;
	nextButtonTitle?: string;
	pageClass?: string;
}

export let BasicPageItem = ({ bigText, bigTextUrl, bigImage, title, subtitle, nextButtonTitle, pageClass }: BasicPageItemProps) => {
	const item = new ModalItem(({ full, onForward }) => {
		let content = null;
		if (full) {
			content = [
					bigText ? <a key='bigText' className='bigText' href={bigTextUrl} target='_blank'>{bigText}</a> : null,
					bigImage ? <img key='bigImage' className="bigImage" src={bigImage} /> : null,
					title ? <h1 key='title' className='title'>{title}</h1> : null,
					subtitle ? <div key='subtitle' className='subtitle'>{subtitle}</div> : null,
					// nextButtonTitle ? <div key='nextButton' className='nextButton' onClick={ onForward }>{nextButtonTitle}</div> : null
			];
		}
		return <div className='BasicPageItemContent'>{content}</div>;
	}, pageClass || '');
	item.nextButtonTitle = nextButtonTitle;
	return item;
}

let policePage = () => {
	return BasicPageItem({
		title: "👮‍♀️ Hey you!",
		subtitle: "I can’t actually check if you’ve done this before giving you the coins. But if I realize you’ve lied...",
		nextButtonTitle: "I Promise! 🤝"
	})
}

let instagramPage = () => {
	let handle = 'nate_loved_an_image';
	return BasicPageItem({
		bigText: '@' + handle,
		bigTextUrl: `https://instagram.com/${handle}`,
		subtitle: "Go ahead, smash the follow button...",
		nextButtonTitle: "I did, I promise 👮‍♀️",
		pageClass: "instagram"
	});
}

let snapchatPage = () => {
	return BasicPageItem({
		bigImage: snapcodeBitmoji,
		subtitle: "Go ahead, scan that code...",
		nextButtonTitle: "Did it! 👮‍♀️",
		pageClass: "snapchat"
	});
}

let cashAppPage = () => {
	let cashtag = 'n8p';
	return BasicPageItem({
		bigText: "$" + cashtag,
		bigTextUrl: "https://cash.me/$" + cashtag,
		subtitle: "Go ahead, send that $3...",
		nextButtonTitle: "Sent! 👮‍♀️",
		pageClass: "cashApp"
	})
}


interface TrophiesProps {
	activityStore: ActivityStore;
	playWithRewards: (id: string, playlist: ModalItem[], activity: any) => void;
}
export let Trophies = ({ activityStore, playWithRewards }: TrophiesProps) => {
	
	return (
		<HScroll>
			<Trophy emoji="🌈" name="Reading Rainbow" desc="Read 5 pieces of content!" value={10} unlocked={activityStore.hasAward('reading-rainbow')} />
			<Trophy emoji="🤞" name="Big Click Energy" desc="Click 100 times anywhere!" value={5} unlocked={activityStore.hasAward('big-click-energy')} />
			<Trophy emoji="🕹" name="Clicker Clique" desc="Click 20 times anywhere!" value={5} unlocked={activityStore.hasAward('clicker-clique')} />
			<Trophy emoji="👻" name="Toasty Ghost" desc="Add me on the Snapchat!" value={7} unlocked={activityStore.hasAward('snapchat')} action={() => playWithRewards('snapchat', [policePage(), snapchatPage()], {coins: 5}) } />
			<Trophy emoji="🐮" name="Cash Cow" desc="Send me $3 on Cash App" value={10} unlocked={activityStore.hasAward('cashApp')} action={() => playWithRewards('cashApp', [policePage(), cashAppPage()], {coins: 7}) } />
			<Trophy emoji="👀" name="Eyewitness" desc="Follow me on Instagram!" value={5} unlocked={activityStore.hasAward('instagram')} action={() => playWithRewards('instagram', [policePage(), instagramPage()], {coins: 5})} />
		</HScroll>
	)
}

