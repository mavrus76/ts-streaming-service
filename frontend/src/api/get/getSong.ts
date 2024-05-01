import { URL_API, token } from "../../auth/register";

export const getSong = async (songId: number) => {
	if (!token) return;
	const response = await fetch(`${URL_API}/songs/${songId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const data = await response.json();
	return data;
};
