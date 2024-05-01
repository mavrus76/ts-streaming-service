export class MockLocalStorage {
	private store: { [key: string]: string };
	constructor() {
		this.store = {};
	}
	public clear() {
		this.store = {};
	}
	public getItem(key: string) {
		return this.store[key] || null;
	}
	public setItem(key: string, value: string) {
		this.store[key] = String(value);
	}
	public removeItem(key: string) {
		delete this.store[key];
	}
}
