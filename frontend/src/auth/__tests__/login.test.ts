import { login } from "../login";
import fetchMock from "jest-fetch-mock";

const location = {
	reload: jest.fn(),
};

Object.defineProperty(window, "location", {
	value: location,
});

describe("login function", () => {
	let localStorageSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.clearAllMocks();
		localStorageSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
		jest.spyOn(console, "error").mockImplementation(() => {});
		jest.spyOn(window, "fetch");
		fetchMock.resetMocks();
	});

	afterAll(() => {
		localStorageSpy.mockRestore();
		jest.spyOn(console, "error").mockRestore();
	});

	afterEach(() => {
		jest.spyOn(console, "error").mockClear();
	});

	it("should login successfully and set token in localStorage", async () => {
		const mockFetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => ({ access_token: "mockToken" }),
		} as unknown as Response);

		global.fetch = mockFetch;

		const result = await login();

		expect(localStorageSpy).toHaveBeenCalledWith("token", "mockToken");
		expect(result).toBeTruthy();
	});

	it("should remove existing token from localStorage and reload page if login fails due to incorrect credentials", async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
		} as Response);

		localStorage.setItem("token", "existingToken");

		const result = await login();

		expect(localStorageSpy).toHaveBeenCalledWith("token", "existingToken");
		expect(result).toBeFalsy();
	});

	it("should return false and log error if network error occurs during login", async () => {
		fetchMock.mockRejectedValueOnce(new Error("Network error"));
		jest.spyOn(window, "fetch").mockResolvedValueOnce(
			Promise.resolve({
				ok: false,
			} as Response),
		);

		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const result = await login();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Error logging in:",
			expect.any(Error),
		);
		expect(result).toBeFalsy();
	});

	it("should return false if server response indicates incorrect credentials", async () => {
		const mockFetch = jest.fn().mockResolvedValueOnce({
			ok: false,
			status: 401,
		} as unknown as Response);

		global.fetch = mockFetch;
		const result = await login();

		expect(localStorageSpy).not.toHaveBeenCalled();
		expect(result).toBeFalsy();
	});

	it("should not remove token from localStorage if token === existingToken", async () => {
		const removeItemMock = jest.fn();
		const originalRemoveItem = localStorage.removeItem;
		localStorage.removeItem = removeItemMock;
		await login();

		expect(removeItemMock).not.toHaveBeenCalled();
		localStorage.removeItem = originalRemoveItem;
	});

	it("should call false on response is not ok", async () => {
		jest.spyOn(window, "fetch").mockResolvedValueOnce(
			Promise.resolve({
				ok: false,
				json: async () => ({ statusCode: 500 }),
			} as Response),
		);

		const response = await login();

		expect(response).toBeFalsy();
	});

	it("should log 'Wrong credentials' when receiving 401", async () => {
		const errorResponse = new Response(JSON.stringify({}), { status: 401 });
		(window.fetch as jest.Mock).mockResolvedValueOnce(errorResponse);

		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		await login();

		expect(consoleErrorSpy).toHaveBeenCalledWith("Wrong credentials");
	});
});
