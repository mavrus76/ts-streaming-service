/* eslint-disable @typescript-eslint/no-unused-vars */
import { IPlaylist } from "../types/playlist.interface";
import { ITrack } from "../types/track.interface";
import { AbstractComponent } from "./abstractComponent";

export abstract class AbstractSmart extends AbstractComponent {
	constructor() {
		super();
	}

	protected abstract repairHandlers(): void;

	public updateElement(tracks: ITrack[], playlist: IPlaylist, track: ITrack) {}

	public updateData(tracks: ITrack[], playlist: IPlaylist) {}

	static isAbstractSmart(object: unknown): object is AbstractSmart {
		return object instanceof AbstractSmart;
	}
}
