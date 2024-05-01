import { IPlaylist } from "~/types/playlist.interface";
import { createElement } from "@utils/createElement";
import { AbstractComponent } from "../../../abstractComponent";
import { getUpdatedDataAndRender } from "@helpers/getUpdatedDataAndRender";
import { Player } from "../../footer/player/player";
import { Events } from "@utils/events";
import { getData } from "@api/getData";
import { getWarning } from "@helpers/getWarning";

export class ItemAsideList extends AbstractComponent {
	private readonly eventEmitter: Events;

	constructor(private readonly playlists: IPlaylist[]) {
		super();
		this.eventEmitter = new Events();
	}

	getElement() {
		this.parent = document.getElementById("asideList") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
			this.setupEventAsidePlaylist();
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return this.playlists
			.map(
				(playlist) =>
					`
      <li class="aside__item">
        <button class="aside__btn aside__btn--${playlist.id}" data-playlist-id="${playlist.id}">
          ${playlist.name}
        </button>
      </li>
    `,
			)
			.join("");
	}

	removeElement() {
		this.element = document.querySelector(".aside__item") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	handleEventAsidePlaylist() {
		return async (event: MouseEvent) => {
			event.preventDefault();
			const target = event.target as HTMLElement;
			const playlistId = (target as HTMLButtonElement).dataset.playlistId;
			const selectedPlaylist = this.playlists.find(
				(playlist) => playlist.id === +playlistId,
			);

			if (selectedPlaylist && (window as any).isPlayingGlobal === false) {
				await getUpdatedDataAndRender(selectedPlaylist);

				const { tracks } = await getData();
				const playerEntity = new Player(selectedPlaylist.songs);
				playerEntity.updateElement(tracks, selectedPlaylist);
			} else {
				getWarning();
			}
		};
	}

	setupEventAsidePlaylist() {
		const callback = this.handleEventAsidePlaylist();
		this.playlists.forEach((p) => {
			const button = document.querySelector(`.aside__btn--${p.id}`);
			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}
}
