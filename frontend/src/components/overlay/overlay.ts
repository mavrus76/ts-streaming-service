import { createElement } from "@utils/createElement";
import { AbstractComponent } from "../abstractComponent";

export class Overlay extends AbstractComponent {
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
      <div id="overlay"></div>
    `;
	}

	removeElement() {
		this.element = document.getElementById("overlay") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	setupEventCloseModal() {
		const modal = document.querySelector(".playlists-modal");
		const overlay = document.getElementById("overlay");
		if (!overlay || !modal) return;
		overlay.addEventListener("click", (event) => {
			const target = event.target as HTMLElement;
			if (
				!target.closest(".track__add-btn") &&
				!target.closest(".playlists-modal")
			) {
				modal.classList.remove("show");
				overlay.classList.remove("show");
			}
		});
	}
}
