import { getFragment } from "./getFragment";

export const createElement = (
	parent: HTMLElement,
	element: HTMLElement,
	template: string,
) => {
	if (!element) {
		element = getFragment(template);
		if (parent) {
			parent.append(element);
		}
	}
};
