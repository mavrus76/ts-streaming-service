import { IEventListeners } from "../types/listeners.interface";

export class Events {
	public eventListeners: IEventListeners[] = [];
	public removeEventListeners() {
		this.eventListeners.forEach(({ button, callback }) => {
			if (button) {
				button.removeEventListener("click", callback as EventListener);
			}
		});
	}
}
