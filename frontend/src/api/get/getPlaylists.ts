import { URL_API, token } from "@auth/register";

export const getPlaylists = async (username: string) => {
	if (!token) return;
	const response = await fetch(`${URL_API}/users/${username}/playlists`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const data = await response.json();
	return data;
};
