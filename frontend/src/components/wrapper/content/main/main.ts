import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";

export class Main extends AbstractComponent {
	getElement() {
		this.parent = document.getElementById("content") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <main class="main" id="main"></main>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".main") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
