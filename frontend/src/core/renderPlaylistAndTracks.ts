import { IPlaylist } from "../types/playlist.interface";
import { presenterPlaylist } from "../helpers/presenterPlaylist";
import { presenterTracks } from "../helpers/presenterTracks";
import { Playlist } from "../components/wrapper/content/main/playlist/playlist";
import { Tracks } from "../components/wrapper/content/main/tracks/tracks";

export const renderPlaylistAndTracks = async (playlist?: IPlaylist) => {
	const playlistEntity = new Playlist();
	if (playlistEntity != null) {
		playlistEntity.removeElement();
	}
	await presenterPlaylist();
	const tracksEntity = new Tracks();
	if (tracksEntity != null) {
		tracksEntity.removeElement();
	}
	if (playlist != null) {
		await presenterTracks(playlist);
	} else {
		await presenterTracks();
	}
};
