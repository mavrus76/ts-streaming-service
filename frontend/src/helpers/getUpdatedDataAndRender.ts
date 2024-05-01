import { getData } from "../api/getData";
import { renderModal } from "../core/renderModal";
import { IPlaylist } from "../types/playlist.interface";
import { renderPlaylistAndTracks } from "../core/renderPlaylistAndTracks";

export const getUpdatedDataAndRender = async (selectedPlaylist: IPlaylist) => {
	const { playlists } = (await getData()) as { playlists: IPlaylist[] };
	playlists.forEach(async (playlist) => {
		if (playlist.id === selectedPlaylist.id) {
			await renderModal();
			await renderPlaylistAndTracks(playlist);
		}
	});
};
