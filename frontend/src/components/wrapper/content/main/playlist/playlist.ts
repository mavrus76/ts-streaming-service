import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";

export class Playlist extends AbstractComponent {
	getElement() {
		this.parent = document.getElementById("main") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <section
      class="playlist section tabs-content"
      data-target="playlists"
      >
        <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
        <ul class="playlist__list" id="mainList"></ul>
      </section>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".playlist") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}
}
