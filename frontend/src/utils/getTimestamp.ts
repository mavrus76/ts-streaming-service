export const getTimestamp = (value: number | string): number => {
	if (typeof value === "number") {
		return value;
	}
	if (typeof value === "string") {
		return new Date(value).getTime();
	}
};
