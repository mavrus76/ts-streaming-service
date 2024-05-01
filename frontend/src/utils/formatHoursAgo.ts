import { differenceInHours } from "date-fns";

export function formatHoursAgo(timestamp: number): string {
	let hoursAsString = differenceInHours(
		new Date(),
		new Date(timestamp),
	).toString();

	if (parseInt(hoursAsString, 10) % 10 === 1) hoursAsString += " час назад";
	else if (
		parseInt(hoursAsString, 10) % 10 === 2 ||
		parseInt(hoursAsString, 10) % 10 === 3 ||
		parseInt(hoursAsString, 10) % 10 === 4
	)
		hoursAsString += " часа назад";
	else hoursAsString += " часов назад";
	return hoursAsString;
}
