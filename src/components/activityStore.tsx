import Announcer from './announcer';
import { uuid } from './utils';
import TrophyLogicTracker from './trophyLogic';
import { Incentive } from './incentives.js';

const windowGlobal: any = typeof window !== 'undefined' && window;

interface PersistedData {
	messages?: Message[];
	awards?: {[id: string]: Award};
	values?: {[id: string]: string}; // Stores data the user has shared, like email
	unlockedIncentives?: {[id: string]: number};
}

interface MessageWithoutID {
	text?: string;
	type: 'admin' | 'system' | 'user' | 'divider';
	specialType?: 'freeCoin'
	coins?: number;
	coinMultiplier?: number;
	cssUnlock?: string;
}

export interface Message extends MessageWithoutID {
	id: string;
}

export interface Award {
	id: string;
	name?: string;
	coins: number;
	activityText: string;
	notification: AwardNotification
	category: string; // content? any others? Used for 'category awards'
}

export interface AwardNotification {
	coinAnim?: boolean;
	toast?: boolean;
	toastEmoji?: string;
}

export function GetGlobalActivityStore(): ActivityStore {
	let existing = windowGlobal ? windowGlobal.activityStore : null;
	if (!existing) {
		existing = new ActivityStore(new LocalActivityStorage('activity'));
		if (windowGlobal) windowGlobal.activityStore = existing;
	}
	return existing;
}

const STARTING_COINS = 0;

export class LocalActivityStorage<T> {
	key: string;
	constructor(key: string) {
		this.key = key;
	}
	read(): T {
		if (!windowGlobal) {
			return {} as T;
		}
		if (windowGlobal.localStorage[this.key]) {
			return JSON.parse(windowGlobal.localStorage[this.key]);
		} else {
			return {} as T;
		}
	}
	write(data: T) {
		if (!windowGlobal) return;
		windowGlobal.localStorage[this.key] = JSON.stringify(data);
	}
}

export type CancelToken = () => void;

export default class ActivityStore {
	storage: LocalActivityStorage<PersistedData>;
	awards: {[id: string]: Award};
	messages: Message[];
	values: {[id: string]: any};
	unlockedIncentives: {[id: string]: number};
	changeAnnouncer: Announcer<ActivityStore>;
	newAwardAnnouncer: Announcer<Award>;
	trophyLogicTracker: TrophyLogicTracker;

	constructor(storage: LocalActivityStorage<PersistedData>) {
		this.storage = storage;
		
		let data = this.storage.read();
		this.awards = data.awards || {};
		this.messages = data.messages || [];
		this.values = data.values || {};
		this.unlockedIncentives = data.unlockedIncentives || {};
		this.changeAnnouncer = new Announcer();
		this.newAwardAnnouncer = new Announcer();
		// if (this.messages.length === 0) {
		// 	this.sendOnboardingMessages();
		// }
		this.trophyLogicTracker = new TrophyLogicTracker(this);
		for (let message of this.messages) {
			this.processMessageDirectives(message);
		}
	}
	save() {
		this.storage.write({
			awards: this.awards,
			messages: this.messages,
			values: this.values,
			unlockedIncentives: this.unlockedIncentives
		});
	}
	unsave() {
		this.storage.write({});
	}
	coinBalance(): number {
		let coins = STARTING_COINS;
		let multiplier = 1;
		for (let message of this.messages) {
			let msgCoins = message.coins || 0;
			if (msgCoins > 0) {
				msgCoins *= multiplier; // multiplier does not apply to negative coins (expenditures)
			}
			coins += msgCoins;
			multiplier *= message.coinMultiplier || 1;
		}
		return coins;
	}
	// sendOnboardingMessages() {
	// 	// insert in reverse order:
	// 	this.addMessage({
	// 		type: 'admin',
	// 		text: 'On my site, everything’s a ~game~. Go explore, earn coins, and they’ll show up here...'
	// 	});
	// 	this.addMessage({
	// 		type: 'admin',
	// 		text: '👋 Hey! I’m Nate.'
	// 	});
	// 	this.addMessage({ type: 'divider' });
	// }
	onChange(callback: (changed: ActivityStore) => void): CancelToken {
		return this.changeAnnouncer.listen(callback);
	}
	hasAward(awardId: string) {
		return !!this.awards[awardId];
	}
	unlockAward(award: Award) {
		if (this.hasAward(award.id)) {
			return;
		}
		this.awards[award.id] = award;
		// this.coins += (award.coins || 0);
		this.addMessage({
			text: award.activityText,
			coins: award.coins,
			type: 'admin'
		});
		this.changeAnnouncer.announce(this);
		this.newAwardAnnouncer.announce(award);
		this.save();
	}
	hasIncentive(incentiveId: string) {
		return !!this.unlockedIncentives[incentiveId];
	}
	unlockIncentive(incentive: Incentive) {
		if (this.hasIncentive(incentive.id)) return;
		this.unlockedIncentives[incentive.id] = 1;
		if (incentive.activityText) {
			this.addMessage({ type: 'admin', text: incentive.activityText, coins: -incentive.cost, coinMultiplier: incentive.coinMultiplier || 1, cssUnlock: incentive.cssUnlock });
		}
		this.changeAnnouncer.announce(this);
		this.save();
	}
	addMessage(message: MessageWithoutID) {
		this.messages.push({
			...message,
			id: uuid()
		});
		this.processMessageDirectives(this.messages[this.messages.length - 1]);
		this.changeAnnouncer.announce(this);
		this.save();
	}
	mostRecentMessagesReversed() {
		const count = Math.min(60, this.messages.length);
		let messages = this.messages.slice(this.messages.length - count);
		messages.reverse();
		return messages;
	}
	processMessageDirectives(message: Message) {
		if (message.cssUnlock && windowGlobal) {
			windowGlobal.document.body.classList.add(message.cssUnlock);
		}
	}
}
