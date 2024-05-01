import { URL_API } from "./register";

export const login = async () => {
	try {
		const response = await fetch(`${URL_API}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "admin",
				password: "admin",
			}),
		});

		if (response.status === 401) {
			console.error("Wrong credentials");
			return false;
		}

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem("token", data.access_token);
			return true;
		} else {
			console.error("Wrong token");
			localStorage.removeItem("token");
			return false;
		}
	} catch (error) {
		console.error("Error logging in:", error);
		return false;
	}
};
