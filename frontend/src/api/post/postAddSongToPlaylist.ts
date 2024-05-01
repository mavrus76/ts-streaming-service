import { URL_API, token } from "@auth/register";

export const postAddSongToPlaylist = async (
	playlistId: number,
	songId: number,
) => {
	if (!token) return;
	const response = await fetch(
		`${URL_API}/playlists/${playlistId}/add/${songId}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		},
	);

	if (!response.ok) {
		console.error("Network response was not ok");
	}
};
