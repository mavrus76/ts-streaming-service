import { IAlbum } from "./album.interface";
import { IArtist } from "./artist.interface";
import { IPlaylist } from "./playlist.interface";
import { ITrack } from "./track.interface";

export interface IUser {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	playlists: IPlaylist[];
	artistLikes: IArtist[];
	albumLikes: IAlbum[];
	songLikes: ITrack[];
}
