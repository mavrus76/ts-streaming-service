import { postPlaylist } from "../api/post/postPlaylist";
import { IPlaylist } from "../types/playlist.interface";

export const addPlaylist = async (playlists: IPlaylist[]) => {
	if (playlists.length === 0) {
		await postPlaylist("Любимые песни");
		await postPlaylist("Плейлист №1");
		await postPlaylist("Плейлист №2");
		await postPlaylist("Плейлист №3");
	}
};
