import { Playlist } from "../components/wrapper/content/main/playlist/playlist";
import { ItemPlaylist } from "../components/wrapper/content/main/playlist/itemPlaylist";
import { getData } from "../api/getData";

export const presenterPlaylist = async () => {
	const { playlists } = await getData();
	if (playlists) {
		const playlistEntity = new Playlist();
		playlistEntity.getElement();
		const itemPlaylistEntity = new ItemPlaylist(playlists);
		itemPlaylistEntity.getElement();
	}
};
