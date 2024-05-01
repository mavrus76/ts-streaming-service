import { IAlbum } from "./album.interface";
import { IArtist } from "./artist.interface";
import { ITrack } from "./track.interface";

export interface ILike {
	albumLikes: IAlbum[];
	artistLikes: IArtist[];
	songLikes: ITrack[];
}
