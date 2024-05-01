import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";

export class Footer extends AbstractComponent {
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
      <footer class="footer" id="footer"></footer>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".footer") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
