import { IArtist } from "./artist.interface";
import { ITrack } from "./track.interface";

export interface IAlbum {
	id: number;
	name: string;
	image: string;
	createdAt: string;
	songs: ITrack[];
	artist: IArtist[];
	likes: string[];
}
