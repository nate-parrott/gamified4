
export type SubscriptionCanceller = () => void;

export default class Announcer<T> {
	lastCallbackId: number;
	callbacks: {[key: number]: (value: T) => void};

	constructor() {
		this.lastCallbackId = 0;
		this.callbacks = {};
	}
	// Returns callable cancellation token
	listen(callback: (value: T) => void): () => SubscriptionCanceller {
		// returns a function to unregister the listener when called
		let id = this.lastCallbackId++;
		this.callbacks[id] = callback;
		return () => {
			delete this.callbacks[id];
		}
	}
	announce(value: T) {
		for (let callback of Object.values(this.callbacks)) {
			callback(value);
		}
	}
}
