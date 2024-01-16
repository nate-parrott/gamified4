import ActivityStore, { Award } from "./activityStore";

const windowGlobal = typeof window !== 'undefined' && window;

interface ClickCountTrophy {
	clicks: number;
	award: Award
}

let clickCountTrophies: ClickCountTrophy[] = [
	{
		clicks: 3,
		award: {
			id: 'cheapo',
			name: 'Test Badge',
			coins: 10,
			activityText: '🫵 Nice clicking! You’ve unlocked the CHEAPO trophy for clicking 2 times. Here’s 10 coins.',
			notification: { 
				coinAnim: false, 
				modal: { emoji: "🫵", title: "Test Badge", message: "Nice clicking! You’ve unlocked the CHEAPO trophy for clicking 2 times. Here’s 10 coins." } 
			},
			category: 'trophy'
		}
	},
	{
		clicks: 20,
		award: {
			id: 'clicker-clique',
			name: 'Clicker Clique',
			coins: 10,
			activityText: '🕹 Nice clicking! You’ve unlocked the CLICKER CLIQUE trophy for clicking 20 times. Here’s 10 coins.',
			notification: { coinAnim: true },
			category: 'trophy'
		}
	},
	{
		clicks: 100,
		award: {
			id: 'big-click-energy',
			coins: 20,
			activityText: '🤞 Finger-clickin’ good! You’ve unlocked the BIG CLICK ENERGY trophy for clicking 100 times. Enjoy the prestige and luxury that comes with 25 COINS!',
			name: 'Big Click Energy',
			notification: { coinAnim: true },
			category: 'trophy'
		}
	},
];

interface CategoryTrophy {
	category: string;
	count: number;
	award: Award
}

let categoryTrophies: CategoryTrophy[] = [
	{
		category: 'content',
		count: 5,
		award: {
			id: 'reading-rainbow',
			name: 'Reading Rainbow',
			coins: 30,
			activityText: '🌈 Looks like you love reading! Here’s a READING RAINBOW badge for reading 5 pieces of content. I know knowledge is the real reward, but here’s 30 coins on the side.',
			notification: { coinAnim: true },
			category: 'trophy'
		}
	}
]

export default class TrophyLogicTracker {
	activityStore: ActivityStore;

	constructor(activityStore: ActivityStore) {
		this.activityStore = activityStore;
		let body = windowGlobal ? windowGlobal.document.body : null;
		if (body) {
			body.addEventListener('click', () => {
				this.click();
			});
		}
		activityStore.newAwardAnnouncer.listen((award: Award) => {
			setTimeout(() => {
				this.triggerCategoryAwards();
			}, 1200);
		});
	}
	click() {
		this.activityStore.values.clicks = (this.activityStore.values.clicks || 0) + 1;
		for (let trophy of clickCountTrophies) {
			if (this.activityStore.hasAward(trophy.award.id)) continue;
			if (this.activityStore.values.clicks >= trophy.clicks) {
				this.activityStore.unlockAward(trophy.award);
			}
		}
	}
	triggerCategoryAwards() {
		let categoryCounts: {[key: string]: number} = {};
		for (let award of Object.values(this.activityStore.awards)) {
			if (award.category) {
				categoryCounts[award.category] = (categoryCounts[award.category] || 0) + 1;
			}
		}
		for (let trophy of categoryTrophies) {
			if (this.activityStore.hasAward(trophy.award.id)) continue;
			if (categoryCounts[trophy.category] >= trophy.count) {
				this.activityStore.unlockAward(trophy.award);
			}
		}
	}
}
