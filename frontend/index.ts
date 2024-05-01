import "./index.css";
import { Overlay } from "./src/components/overlay/overlay";
import { render } from "./src/core/render";
import { register, token } from "./src/auth/register";
import { login } from "./src/auth/login";
import { isOnline } from "./src/utils/isOnline";

document.addEventListener("DOMContentLoaded", async () => {
	try {
		const isOnlineStatus = await isOnline();
		if (isOnlineStatus) {
			if (!token) {
				await register();
			}
			const isLogin = await login();

			if (isLogin) {
				await render();

				const overlay = new Overlay();
				overlay.setupEventCloseModal();
			} else {
				console.error("Login failed.");
			}
		} else {
			console.error("User is offline.");
		}
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
});
