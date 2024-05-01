import { ITrack } from "../types/track.interface";
export const getBtnLikeFilled = (songs: ITrack[]) => {
	const buttons = Array.from<HTMLElement>(
		document.querySelectorAll(".track__like-btn"),
	);
	const btnPlayer = document.querySelector<HTMLElement>(".player__track__like");

	songs.forEach((song) => {
		buttons.forEach((btn) => {
			if (+btn.dataset.trackId === song.id) {
				if (song.likes.length > 0) {
					btn.classList.add("like-btn--active");
				} else {
					btn.classList.remove("like-btn--active");
				}
			}

			if (+btnPlayer.dataset.trackId === song.id) {
				if (song.likes.length > 0) {
					btnPlayer.classList.add("active");
				} else {
					btnPlayer.classList.remove("active");
				}
			}
		});
	});
};
