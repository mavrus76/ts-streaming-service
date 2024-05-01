import { register, URL_API } from "../register";
import { login } from "../login";

jest.mock("../login", () => ({
	login: jest.fn(),
}));

describe("register function", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterAll(() => {
		jest.spyOn(console, "error").mockRestore();
	});

	afterEach(() => {
		jest.spyOn(console, "error").mockClear();
	});

	it("should make a POST request to register a user", async () => {
		const mockResponse = { access_token: "mockToken" };
		const mockFetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		global.fetch = mockFetch;

		await register();

		expect(global.fetch).toHaveBeenCalledWith(`${URL_API}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "admin",
				password: "admin",
				firstName: "Tatiana",
				lastName: "Laker",
			}),
		});
	});

	it("should set token in localStorage when registration is successful", async () => {
		const mockResponse = { access_token: "mockToken" };
		const mockFetch = jest.fn().mockResolvedValueOnce({
			ok: true,
			json: async () => mockResponse,
		} as Response);

		global.fetch = mockFetch;

		const localStorageSetItemMock = jest.spyOn(
			window.localStorage.__proto__,
			"setItem",
		);
		localStorageSetItemMock.mockImplementation(() => {});

		await register();

		expect(localStorageSetItemMock).toHaveBeenCalledWith("token", "mockToken");
	});

	it("should call login and reload when user is already registered", async () => {
		jest.spyOn(window, "fetch").mockResolvedValueOnce(
			Promise.resolve({
				ok: false,
				json: async () => ({ statusCode: 409 }),
			} as Response),
		);

		const loginMock = login as jest.MockedFunction<typeof login>;
		loginMock.mockResolvedValueOnce(true);

		const reloadMock = jest.fn();
		Object.defineProperty(window, "location", {
			value: { reload: reloadMock },
		});

		await register();

		expect(loginMock).toHaveBeenCalled();
		expect(reloadMock).toHaveBeenCalled();
	});

	it("should log error when an error occurs during registration", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error");
		jest
			.spyOn(window, "fetch")
			.mockRejectedValueOnce(new Error("Network error"));

		await register();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Error registering:",
			expect.any(Error),
		);
	});
});
