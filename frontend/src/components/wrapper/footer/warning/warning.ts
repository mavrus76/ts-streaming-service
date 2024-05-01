import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";

export class Warning extends AbstractComponent {
	getElement() {
		this.parent = document.getElementById("footer") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <div class="warning" id="warning">Warning! Остановите проигрывание чтобы переключиться</div>
    `;
	}

	removeElement() {
		this.element = document.getElementById("warning") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
