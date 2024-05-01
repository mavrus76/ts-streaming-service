export const getFragment = (template: string) => {
	const fragment = new DocumentFragment();
	const templateEl = document.createElement("template");
	templateEl.innerHTML = template;
	fragment.append(templateEl.content);
	return fragment as unknown as HTMLElement;
};
