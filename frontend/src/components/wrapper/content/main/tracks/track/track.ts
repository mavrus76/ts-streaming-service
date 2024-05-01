import { ITrack } from "~/types/track.interface";
import { formatDaysAgo } from "@utils/formatDaysAgo";
import { formatDuration } from "@utils/formatDuration";
import { getTimestamp } from "@utils/getTimestamp";
import { createElement } from "@utils/createElement";
import { AbstractComponent } from "@components/abstractComponent";
import { IPlaylist } from "~/types/playlist.interface";
import { ModalPlaylist } from "@components/playlists-modal/modalPlaylist/modalPlaylist";
import { Events } from "@utils/events";
import { postRemoveSongFromPlaylist } from "@api/post/postRemoveSongFromPlaylist";
import { postSongLike } from "@api/post/postSongLike";
import { postSongUnlike } from "@api/post/postSongUnlike";
import { Player } from "@components/wrapper/footer/player/player";
import { getWarning } from "@helpers/getWarning";
export class Track extends AbstractComponent {
	private readonly eventEmitter: Events;
	constructor(
		private readonly tracks: ITrack[],
		private readonly playlists: IPlaylist[],
	) {
		super();
		this.eventEmitter = new Events();
	}

	getElement() {
		this.parent = document.getElementById("tracksList") ?? null;
		if (this.parent instanceof HTMLElement) {
			createElement(this.parent, this.element, this.getTemplate());
			this.setupEventOnTrack();
			this.setupEventDropdown();
			this.setupEventAddToPlaylist();
			this.setupEventRemoveFromPlaylist();
			this.setupEventLikes();
			this.setupEventDotsClickOutside();
		} else {
			throw new Error("Element is null");
		}
	}

	getTemplate() {
		let count = 0;
		return this.tracks
			.map(
				(track) => `
      <li class="tracks__item flex" data-track-id="${track.id}">
        <div class="tracks__item__number">${++count}</div>
        <div class="tracks__item__name">
          <img
            class="track__img"
            src="${track.album.image}"
            alt="In Bloom"
          />
          <div class="track__content">
            <h3 class="track__name">
              <a class="track__name__link track__name__link--${
								track.id
							}" href="#"  data-track-id="${track.id}">${track.name}</a>
            </h3>
            <span class="track__author">${track.artist.name}</span>
          </div>
        </div>
        <div class="tracks__item__albom">${track.album.name}</div>
        <div class="tracks__item__data flex">
          <span class="data__text">${formatDaysAgo(
						getTimestamp(track.createdAt),
					)}</span>
          <button class="track__like-btn track__like-btn--${
						track.id
					}"  data-track-id="${track.id}">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z"
                fill="#FC6D3E"
              />
            </svg>
          </button>
        </div>
        <time class="tracks__item__time">${formatDuration(
					track.duration / 1000,
				)}</time>
        <div class="tracks__item__drop">
          <button class="track__btn-dropdown track__btn-dropdown--${
						track.id
					}" data-track-id="${track.id}">
            <svg
              width="23"
              height="4"
              viewBox="0 0 23 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="11.5" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="21" cy="2" r="2" fill="#C4C4C4" />
            </svg>
          </button>
          <div class="track__dropdown track__dropdown--${
						track.id
					}" data-track-id="${track.id}">
            <button class="track__add-btn track__add-btn--${
							track.id
						}" data-track-id="${track.id}">
              Добавить в плейлист
            </button>
            <button class="track__delete-btn track__delete-btn--${
							track.id
						}" data-track-id="${track.id}">
              Удалить из плейлиста
            </button>
          </div>
        </div>
      </li>
    `,
			)
			.join("");
	}

	removeElement() {
		this.element = document.querySelector(".tracks__item") ?? null;
		if (this.element instanceof HTMLElement) {
			this.element.remove();
		} else {
			throw new Error("Element is null");
		}
	}

	handleEventOnTrackClick(track: ITrack) {
		return (event: MouseEvent) => {
			event.preventDefault();
			const selectedPlaylist = this.playlists.find((playlist) => {
				return playlist.songs.some((song) => song.id === track.id);
			});

			const playerEntity = new Player(this.tracks);
			if (
				playerEntity.playerModel.getState().currentPlaylist === null &&
				(window as any).isPlayingGlobal === false
			) {
				playerEntity.updateElement(this.tracks, null, track);
			} else if ((window as any).isPlayingGlobal === false) {
				const playerEntity = new Player(selectedPlaylist.songs);
				playerEntity.updateElement(
					selectedPlaylist.songs,
					selectedPlaylist,
					track,
				);
			} else {
				getWarning();
			}
		};
	}

	setupEventOnTrack() {
		this.tracks.forEach((track) => {
			const button =
				document.querySelector<HTMLElement>(
					`.track__name__link--${track.id}`,
				) ?? null;
			const callback = this.handleEventOnTrackClick(track);

			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}

	handleEventDropdownClick(track: ITrack) {
		return (event: MouseEvent) => {
			event.preventDefault();
			const target = event.target as HTMLElement;
			const dropdown = document.querySelector(`.track__dropdown--${track.id}`);
			const dropdowns = Array.from<HTMLElement>(
				document.querySelectorAll(".track__dropdown"),
			);
			const targetId = target.dataset.trackId ?? null;

			if (target.closest(`.track__btn-dropdown--${track.id}`)) {
				if (dropdown.classList.contains("dropdown--active")) {
					dropdown.classList.remove("dropdown--active");
				} else {
					dropdown.classList.add("dropdown--active");
				}
				dropdowns.forEach((d) => {
					const dId = d.dataset.trackId;
					if (targetId !== dId) {
						d.classList.remove("dropdown--active");
					}
				});
			}
		};
	}

	setupEventDropdown() {
		this.tracks.forEach((track) => {
			const button =
				document.querySelector<HTMLButtonElement>(
					`.track__btn-dropdown--${track.id}`,
				) ?? null;
			const callback = this.handleEventDropdownClick(track);

			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}

	setupEventDotsClickOutside() {
		const dropdowns = document.querySelectorAll(".track__dropdown");

		window.addEventListener("click", (event) => {
			const target = event.target as HTMLElement;

			if (
				!target.closest(".track__btn-dropdown") &&
				!target.closest(".track__dropdown")
			) {
				dropdowns.forEach((d) => {
					if (d.classList.contains("dropdown--active")) {
						d.classList.remove("dropdown--active");
					}
				});
			}
		});
	}

	handleAddToPlaylistClick(track: ITrack) {
		return (event: MouseEvent) => {
			event.preventDefault();
			const dropdown = document.querySelector(`.track__dropdown--${track.id}`);
			const modal = document.querySelector(".playlists-modal");

			modal.classList.add("show");
			dropdown.classList.remove("dropdown--active");
			document.getElementById("overlay").classList.add("show");

			const modalPlaylistEntity = new ModalPlaylist(
				this.tracks,
				this.playlists,
			);
			modalPlaylistEntity.setupEventModalPlaylist(track);
		};
	}

	setupEventAddToPlaylist() {
		const buttons = document.querySelectorAll(".track__add-btn");

		if (buttons.length > 0) {
			buttons.forEach((button) => {
				const btnId = (button as HTMLButtonElement).dataset.trackId;
				const track = this.tracks.find((t) => t.id === +btnId);
				if (track) {
					const callback = this.handleAddToPlaylistClick(track);
					button.addEventListener("click", callback);
					this.eventEmitter.eventListeners.push({ button, callback });
				}
			});
		}
	}

	handleEventRemoveFromPlaylistClick(track: ITrack) {
		return async (event: MouseEvent) => {
			event.preventDefault();
			const target = event.target as HTMLElement;
			const dropdown = document.querySelector(`.track__dropdown--${track.id}`);
			const tracksEl = Array.from(document.querySelectorAll(".tracks__item"));

			tracksEl.forEach((el: HTMLElement) => {
				const trackId = el.dataset.trackId;
				if (+trackId === track.id) {
					el.remove();
				}
			});

			const selectedPlaylist = this.playlists.find((playlist) => {
				return playlist.songs.some((song) => song.id === track.id);
			});

			dropdown.classList.remove("dropdown--active");

			if (target.closest(`.track__delete-btn--${track.id}`)) {
				if (this.playlists[0].id === selectedPlaylist.id) {
					await postSongUnlike(track.id);
				} else {
					await postRemoveSongFromPlaylist(selectedPlaylist.id, track.id);
				}
			}
		};
	}

	setupEventRemoveFromPlaylist() {
		this.tracks.forEach((track: ITrack) => {
			const button =
				document.querySelector(`.track__delete-btn--${track.id}`) ?? null;
			const callback = this.handleEventRemoveFromPlaylistClick(track);

			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}

	handleEventLikesClick(track: ITrack) {
		return async (event: MouseEvent) => {
			event.preventDefault();
			const target = event.currentTarget as HTMLElement;

			if (target.closest(`.track__like-btn--${track.id}`)) {
				if (target.closest(".like-btn--active")) {
					await postSongUnlike(track.id);
					target.classList.remove("like-btn--active");
				} else {
					await postSongLike(track.id);
					target.classList.add("like-btn--active");
				}
			}
		};
	}

	setupEventLikes() {
		this.tracks.forEach((track: ITrack) => {
			const button =
				document.querySelector(`.track__like-btn--${track.id}`) ?? null;
			const callback = this.handleEventLikesClick(track);

			if (button) {
				button.addEventListener("click", callback);
				this.eventEmitter.eventListeners.push({ button, callback });
			}
		});
	}
}
