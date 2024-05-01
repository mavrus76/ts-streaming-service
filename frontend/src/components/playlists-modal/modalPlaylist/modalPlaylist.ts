import { IPlaylist } from "~/types/playlist.interface";
import { ITrack } from "~/types/track.interface";
import { createElement } from "@utils/createElement";
import { AbstractComponent } from "../../abstractComponent";
import { Events } from "@utils/events";
import { postAddSongToPlaylist } from "@api/post/postAddSongToPlaylist";

export class ModalPlaylist extends AbstractComponent {
	private readonly eventEmitter: Events;
	constructor(
		private readonly tracks: ITrack[],
		private readonly playlists: IPlaylist[],
	) {
		super();
		this.eventEmitter = new Events();
	}

	getElement() {
		this.parent = document.getElementById("modalContent") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		const withoutLikes = this.playlists.slice(1);
		return withoutLikes
			.map(
				(playlist: IPlaylist) => `
      <div class="playlists-modal__playlist">
        <img src=${
					playlist.songs.length > 0
						? playlist.songs[0].image
						: "https://i.pravatar.cc/300"
				}
          alt="Gangsta's Paradise"
          class="playlists-modal__playlist__image"
        />
        <div class="playlists-modal__playlist__title">${playlist.name}</div>
        <div class="playlists-modal__playlist__info">
          ${playlist.songs.length} треков
        </div>
      </div>
    `,
			)
			.join("");
	}

	removeElement() {
		this.element = document.querySelector(".playlists-modal__playlist") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	handlePlaylistButtonClick(track: ITrack, playlists: IPlaylist[]) {
		return async (event: MouseEvent) => {
			event.preventDefault();
			const target = event.currentTarget as HTMLElement;
			const modal = document.querySelector(".playlists-modal");
			const selectedPlaylist = playlists.find((playlist: IPlaylist) =>
				target.textContent.includes(playlist.name),
			);

			modal.classList.remove("show");
			document.getElementById("overlay").classList.remove("show");

			if (
				selectedPlaylist &&
				!selectedPlaylist.songs.some((song) => song.id === track.id)
			) {
				await postAddSongToPlaylist(selectedPlaylist.id, track.id);

				this.eventEmitter.removeEventListeners();
			}
		};
	}

	setupEventModalPlaylist(track: ITrack) {
		const buttons = document.querySelectorAll(".playlists-modal__playlist");
		if (this.playlists && this.playlists.length > 1) {
			const playlists = this.playlists.slice(1);
			const callback = this.handlePlaylistButtonClick(track, playlists);

			if (buttons.length > 0) {
				buttons.forEach((button) => {
					button.addEventListener("click", callback);
					this.eventEmitter.eventListeners.push({ button, callback });
				});
			}
		}
	}
}
