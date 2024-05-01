import { createElement } from "@utils/createElement";
import { AbstractComponent } from "../abstractComponent";

export class PlaylistsModal extends AbstractComponent {
	getElement() {
		this.parent = document.getElementById("overlay") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
			this.setupEventModal();
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return `
      <div class="playlists-modal">
        <div class="playlists-modal__title">Добавить в плейлист</div>
        <div class="playlists-modal__playlist_content" id="modalContent"></div>
        <div class="playlists-modal__footer">
          <div class="playlists-modal__close-btn">Отменить</div>
        </div>
      </div>
    `;
	}

	removeElement() {
		this.element = document.querySelector(".playlists-modal") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	setupEventModal() {
		const modal = document.querySelector(".playlists-modal") ?? null;
		if (modal) {
			modal.addEventListener("click", (event: MouseEvent) => {
				event.preventDefault();
				const target = event.target as HTMLElement;

				if (target.closest(".playlists-modal__close-btn")) {
					modal.classList.remove("show");
					document.getElementById("overlay").classList.remove("show");
				}
			});
		}
	}
}
