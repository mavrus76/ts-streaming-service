import { ITrack } from "../types/track.interface";
import { Player } from "../components/wrapper/footer/player/player";

export const presenterPlayer = (tracks: ITrack[]) => {
	const playerEntity = new Player(tracks);
	playerEntity.getElement();
};
