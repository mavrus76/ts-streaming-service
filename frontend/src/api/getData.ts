import { getUsers } from "./get/getUsers";
import { getPlaylists } from "./get/getPlaylists";
import { getSongs } from "./get/getSongs";
import { addPlaylist } from "@helpers/addPlaylist";
import { IPlaylist } from "~/types/playlist.interface";
import { ITrack } from "~/types/track.interface";
import { IUser } from "~/types/user.interface";
import { getLikes } from "./get/getLikes";
import { ILike } from "~/types/like.interface";

export interface IData {
	users: IUser[];
	tracks: ITrack[];
	playlists: IPlaylist[];
}

export const getData = async (): Promise<IData> => {
	const apiUsers: IUser[] = await getUsers();
	if (apiUsers) {
		const users = [...apiUsers];

		await addPlaylist(await getPlaylists(apiUsers[0].username)); // add playlists

		const apiPlaylists: IPlaylist[] = await getPlaylists(apiUsers[0].username);
		const apiLikes: ILike = await getLikes(apiUsers[0].username);
		const apiTracks: ITrack[] = await getSongs();

		if (apiPlaylists && apiTracks && apiLikes) {
			const playlists = [...apiPlaylists];
			const tracks = [...apiTracks];
			const songLikes = [...apiLikes.songLikes];
			playlists[0].songs = [...songLikes];

			return { users, playlists, tracks };
		}
	}
};
