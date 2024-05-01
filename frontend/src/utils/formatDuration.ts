export const formatDuration = (durationInSeconds: number): string => {
	const seconds = Math.floor(durationInSeconds % 60);
	const minutes = Math.floor((durationInSeconds / 60) % 60);
	const hours = Math.floor(durationInSeconds / 3600);

	const formatNumber = (num: number): string =>
		num < 10 ? `0${num}` : `${num}`;

	if (hours > 0) {
		return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
			seconds,
		)}`;
	} else if (minutes > 0) {
		return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
	} else {
		return `00:${formatNumber(seconds)}`;
	}
};
