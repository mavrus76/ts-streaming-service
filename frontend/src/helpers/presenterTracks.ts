import { ITrack } from "../types/track.interface";
import { IPlaylist } from "../types/playlist.interface";
import { Track } from "@components/wrapper/content/main/tracks/track/track";
import { createTrack } from "./createTrack";
import { Tracks } from "@components/wrapper/content/main/tracks/tracks";
import { getBtnLikeFilled } from "./getBtnLikeFilled";
import { getData } from "@api/getData";

export const presenterTracks = async (playlist?: IPlaylist) => {
	try {
		const { playlists, tracks } = await getData();
		const songs: ITrack[] = [];
		const tracksEntity = new Tracks();
		tracksEntity.getElement();

		const trackEntity = new Track(
			playlist ? playlist.songs : tracks,
			playlists,
		);
		trackEntity.getElement();

		const target = playlist ? playlist.songs : tracks;
		for (const song of target) {
			songs.push(createTrack(song));
		}

		const buttons = document.querySelectorAll(".track__delete-btn");
		buttons.forEach((btn) => {
			if (playlist) {
				btn.classList.remove("visually-hidden");
			} else {
				btn.classList.add("visually-hidden");
			}
		});

		getBtnLikeFilled(target);
	} catch (error) {
		console.error("Error occurred while fetching data:", error);
	}

	const mainTitle = document.getElementById("title");
	if (playlist != null) {
		mainTitle.innerHTML = playlist.name;
	} else {
		mainTitle.innerHTML = "Треки";
	}
};
