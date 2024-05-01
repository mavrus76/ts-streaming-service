import { Wrapper } from "@components/wrapper/wrapper";
import { Header } from "@components/wrapper/header/header";
import { User } from "@components/wrapper/header/user/user";
import { Content } from "@components/wrapper/content/content";
import { Footer } from "@components/wrapper/footer/footer";
import { Aside } from "@components/wrapper/content/aside/aside";
import { ItemAsideList } from "@components/wrapper/content/aside/itemAsideList";
import { Main } from "@components/wrapper/content/main/main";
import { presenterTracks } from "@helpers/presenterTracks";
import { presenterPlaylist } from "@helpers/presenterPlaylist";
import { presenterModal } from "@helpers/presenterModal";
import { Overlay } from "@components/overlay/overlay";
import { getData } from "@api/getData";
import { presenterPlayer } from "@helpers/presenterPlayer";
import { Warning } from "@components/wrapper/footer/warning/warning";

export const render = async () => {
	try {
		const { users, playlists, tracks } = await getData();
		if (users && playlists && tracks) {
			const overlayEntity = new Overlay();
			overlayEntity.getElement();
			await presenterModal();

			const wrapperEntity = new Wrapper();
			wrapperEntity.getElement();

			const headerEntity = new Header(playlists);
			headerEntity.getElement();

			const userEntity = new User(users);
			userEntity.getElement();

			const contentEntity = new Content();
			contentEntity.getElement();

			const footerEntity = new Footer();
			footerEntity.getElement();
			presenterPlayer(tracks);

			const warningEntity = new Warning();
			warningEntity.getElement();

			const asideEntity = new Aside();
			asideEntity.getElement();

			const itemAsideListEntity = new ItemAsideList(playlists);
			itemAsideListEntity.getElement();

			const mainEntity = new Main();
			mainEntity.getElement();

			await presenterPlaylist();
			await presenterTracks();
		} else {
			console.error("Failed to fetch necessary data.");
		}
	} catch (error) {
		console.error("An error occurred while rendering:", error);
	}
};
