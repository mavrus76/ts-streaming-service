import { URL_API } from "../auth/register";

export const isOnline = async () => {
	try {
		await fetch(`${URL_API}`);
		return true;
	} catch (err) {
		alert("Please check your internet connection");
		return false;
	}
};
