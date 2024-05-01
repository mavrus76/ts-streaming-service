import { URL_API, token } from "../../auth/register";

export const getPlaylist = async (playlistId: number) => {
	if (!token) return;
	const response = await fetch(`${URL_API}/user/playlists/${playlistId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});
	const data = await response.json();
	return data;
};
