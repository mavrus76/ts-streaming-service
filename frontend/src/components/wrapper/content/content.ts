import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";

export class Content extends AbstractComponent {
	getElement() {
		this.parent = document.getElementById("wrapper") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <div class="content-wrap flex" id="content"></div>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".content-wrap") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
