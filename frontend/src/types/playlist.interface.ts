import { IUser } from "./user.interface";
import { ITrack } from "./track.interface";

export interface IPlaylist {
	id: number;
	name: string;
	createdAt: string;
	user: IUser;
	songs: ITrack[];
}
