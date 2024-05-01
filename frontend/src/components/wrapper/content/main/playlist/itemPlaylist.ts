import { IPlaylist } from "~/types/playlist.interface";
import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";
import { getUpdatedDataAndRender } from "@helpers/getUpdatedDataAndRender";
import { Player } from "@components/wrapper/footer/player/player";
import { Events } from "@utils/events";
import { getData } from "@api/getData";
import { getWarning } from "@helpers/getWarning";

export class ItemPlaylist extends AbstractComponent {
	private readonly eventEmitter: Events;

	constructor(private readonly playlists: IPlaylist[]) {
		super();
		this.eventEmitter = new Events();
	}

	getElement() {
		this.parent = document.getElementById("mainList") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
			this.setupEventMainPlaylist();
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		return this.playlists
			.map((playlist) => {
				return `
        <li class="playlist__item">
          <picture>
            <source
              srcset="${
								playlist.songs.length > 0
									? playlist.songs[0].image
									: "https://i.pravatar.cc/300"
							}"
              media="(max-width: 576px)"
            />
            <source
              srcset="${
								playlist.songs.length > 0
									? playlist.songs[0].image
									: "https://i.pravatar.cc/300"
							}"
              media="(max-width: 1440px)"
            />
            <img
              class="playlist__img"
              src="${
								playlist.songs.length > 0
									? playlist.songs[0].image
									: "https://i.pravatar.cc/300"
							}"
              alt=${playlist.name}
            />
          </picture>
          <div class="playlist__content">
            <h3 class="playlist__h3">
              <a class="playlist__h3__link" href="#" data-playlist-id="${
								playlist.id
							}">${playlist.name}</a>
            </h3>
            <span class="playlist__count">${playlist.songs.length} треков</span>
          </div>
        </li>
      `;
			})
			.join("");
	}

	removeElement() {
		this.element = document.querySelector(".playlist__item") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	handleEventMainPlaylistClick() {
		return async (event: MouseEvent) => {
			event.preventDefault();
			const target = event.target as HTMLElement;
			const playlistId = (target as HTMLElement).dataset.playlistId;
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

	setupEventMainPlaylist() {
		const buttons = document.querySelectorAll(".playlist__h3__link");
		const callback = this.handleEventMainPlaylistClick();
		buttons.forEach((button) => {
			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}
}
