import { IPlaylist } from "~/types/playlist.interface";
import { ITrack } from "~/types/track.interface";

export interface IPlayerState {
	currentTrack: ITrack;
	currentPlaylist: IPlaylist | null;
	isPlaying: boolean;
	currentTime: number;
	volume: number;
}

export class PlayerModel {
	private state: IPlayerState;

	constructor(initialState: IPlayerState) {
		this.state = initialState;
	}

	public getState() {
		return this.state;
	}

	public setCurrentTrack(track: ITrack) {
		this.state.currentTrack = track;
	}

	public setCurrentPlaylist(playlist: IPlaylist) {
		this.state.currentPlaylist = playlist;
	}

	public setIsPlaying(value: boolean) {
		this.state.isPlaying = value;
	}

	public setCurrentTime(time: number) {
		this.state.currentTime = time;
	}

	setVolume(volume: number) {
		this.state.volume = volume;
	}
}
