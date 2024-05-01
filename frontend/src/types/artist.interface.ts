import { IAlbum } from "./album.interface";

export interface IArtist {
	id: number;
	name: string;
	image: string;
	createdAt: string;
	albums: IAlbum[];
	likes: string[];
}
