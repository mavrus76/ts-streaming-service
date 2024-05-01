export abstract class AbstractComponent {
	protected parent: HTMLElement | null;
	protected element: HTMLElement | null;
	protected button: HTMLElement | null;

	protected abstract getElement(): void;
	protected abstract getTemplate(): string;
	protected abstract removeElement(): void;

	static isAbstractComponent(object: unknown): object is AbstractComponent {
		return object instanceof AbstractComponent;
	}
}
