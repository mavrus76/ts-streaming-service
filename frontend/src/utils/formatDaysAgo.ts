import { differenceInDays } from "date-fns";

export function formatDaysAgo(timestamp: number): string {
	let daysAsString = differenceInDays(
		new Date(),
		new Date(timestamp),
	).toString();

	if (parseInt(daysAsString, 10) % 10 === 1) daysAsString += " день назад";
	else if (
		parseInt(daysAsString, 10) % 10 === 2 ||
		parseInt(daysAsString, 10) % 10 === 3 ||
		parseInt(daysAsString, 10) % 10 === 4
	)
		daysAsString += " дня назад";
	else daysAsString += " дней назад";
	return daysAsString;
}
