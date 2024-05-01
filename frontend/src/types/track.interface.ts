import { IArtist } from "./artist.interface";
import { IAlbum } from "./album.interface";
import { IPlaylist } from "./playlist.interface";
import { ILike } from "./like.interface";

export interface ITrack {
	id: number;
	name: string;
	filename: string;
	path: string;
	image: string;
	duration: number;
	createdAt: string | number;
	album: IAlbum;
	artist: IArtist;
	playlists: IPlaylist[];
	likes: ILike[];
}
