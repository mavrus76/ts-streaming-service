import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const getDateOfCreation = (timestamp: number) =>
	format(new Date(timestamp), "dd MMMM yyyy", {
		locale: ru,
	});
