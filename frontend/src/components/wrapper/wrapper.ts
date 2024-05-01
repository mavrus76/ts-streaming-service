import { createElement } from "@utils/createElement";
import { AbstractComponent } from "../abstractComponent";

export class Wrapper extends AbstractComponent {
	getElement() {
		this.parent = document.body ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <div class="over-wrapper" id="wrapper" style="position: relative; overflow: hidden"></div>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".over-wrapper") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
