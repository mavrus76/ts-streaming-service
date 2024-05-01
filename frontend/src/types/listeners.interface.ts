export interface IEventListeners {
	button: Element | null;
	callback: (event: MouseEvent) => void;
}
