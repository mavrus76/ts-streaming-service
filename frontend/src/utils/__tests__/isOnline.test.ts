import { isOnline } from "../isOnline";

describe("isOnline function", () => {
	// let originalAlert: any;

	// beforeEach(() => {
	// 	originalAlert = window.alert;
	// });
	// afterEach(() => {
	// 	window.alert = originalAlert;
	// });

	it("should return true if the fetch request to URL_API succeeds", async () => {
		(window as any).fetch = jest.fn().mockResolvedValueOnce({});

		const result = await isOnline();

		expect(result).toBeTruthy();
	});

	it("should return alert if the fetch request to URL_API fails", async () => {
		const expectedMessage = "Please check your internet connection";

		const mockAlert = jest.fn();
		window.alert = mockAlert;

		(window as any).fetch = jest
			.fn()
			.mockRejectedValueOnce(new Error("Failed to fetch"));
		await isOnline();

		expect(mockAlert).toHaveBeenCalledWith(expectedMessage);
	});

	it("should return false if the fetch request to URL_API fails", async () => {
		(window as any).fetch = jest
			.fn()
			.mockRejectedValueOnce(new Error("Failed to fetch"));

		const result = await isOnline();

		expect(result).toBeFalsy();
	});
});
