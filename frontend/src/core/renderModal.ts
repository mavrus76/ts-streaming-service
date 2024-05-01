import { presenterModal } from "../helpers/presenterModal";
import { PlaylistsModal } from "../components/playlists-modal/playlistsModal";

export const renderModal = async () => {
	const playlistsModalEntity = new PlaylistsModal();
	if (playlistsModalEntity != undefined) {
		playlistsModalEntity.removeElement();
	}
	await presenterModal();
};
