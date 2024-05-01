import { formatDuration } from "../formatDuration";

describe("formatDuration function", () => {
	it("formats duration correctly when hours are present", () => {
		expect(formatDuration(3665)).toBe("01:01:05");
	});

	it("formats duration correctly when only minutes are present", () => {
		expect(formatDuration(125)).toBe("02:05");
	});

	it("formats duration correctly when only seconds are present", () => {
		expect(formatDuration(45)).toBe("00:45");
	});

	it("formats duration correctly when duration is exactly 1 hour", () => {
		expect(formatDuration(3600)).toBe("01:00:00");
	});

	it("formats duration correctly when duration is less than 1 minute", () => {
		expect(formatDuration(30)).toBe("00:30");
	});

	it("formats duration correctly when duration is 0", () => {
		expect(formatDuration(0)).toBe("00:00");
	});
});
