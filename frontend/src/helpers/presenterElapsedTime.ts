import { ElapsedTime } from "../components/wrapper/footer/player/elapsedTime/elapsedTime";
import { ITrack } from "../types/track.interface";

export const presenterElapsedTime = (tracks: ITrack[]) => {
	const elapsedTimeEntity = new ElapsedTime(tracks);
	elapsedTimeEntity.getElement();
};
