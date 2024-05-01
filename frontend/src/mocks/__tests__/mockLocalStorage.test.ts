import { MockLocalStorage } from "../mockLocalStorage";

describe("MockLocalStorage", () => {
	let localStorage: MockLocalStorage;

	beforeEach(() => {
		localStorage = new MockLocalStorage();
	});

	it("should set and get item correctly", () => {
		localStorage.setItem("key", "value");
		expect(localStorage.getItem("key")).toBe("value");
	});

	it("should return null for non-existent item", () => {
		expect(localStorage.getItem("nonExistentKey")).toBe(null);
	});

	it("should remove item correctly", () => {
		localStorage.setItem("key", "value");
		localStorage.removeItem("key");
		expect(localStorage.getItem("key")).toBe(null);
	});

	it("should clear all items correctly", () => {
		localStorage.setItem("key1", "value1");
		localStorage.setItem("key2", "value2");
		localStorage.clear();
		expect(localStorage.getItem("key1")).toBe(null);
		expect(localStorage.getItem("key2")).toBe(null);
	});
});
