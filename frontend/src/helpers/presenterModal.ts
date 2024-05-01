import { getData } from "../api/getData";
import { ModalPlaylist } from "../components/playlists-modal/modalPlaylist/modalPlaylist";
import { PlaylistsModal } from "../components/playlists-modal/playlistsModal";

export const presenterModal = async () => {
	const { playlists, tracks } = await getData();
	if (tracks && playlists) {
		const playlistsModalEntity = new PlaylistsModal();
		playlistsModalEntity.getElement();
		const modalPlaylistEntity = new ModalPlaylist(tracks, playlists);
		modalPlaylistEntity.getElement();
	}
};
