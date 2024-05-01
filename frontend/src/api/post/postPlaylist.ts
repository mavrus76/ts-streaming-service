import { URL_API, token } from "@auth/register";

export const postPlaylist = async (name: string) => {
	if (!token) return;
	const response = await fetch(`${URL_API}/playlists`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify({
			name: `${name}`,
		}),
	});

	if (!response.ok) {
		console.error("Network response was not ok");
	}
};
