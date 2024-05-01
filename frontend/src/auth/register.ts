import { login } from "./login";

export const URL_API = "http://localhost:3000/api";
export const token = localStorage.getItem("token");

export const register = async () => {
	try {
		const response = await fetch(`${URL_API}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "admin",
				password: "admin",
				firstName: "Tatiana",
				lastName: "Laker",
			}),
		});

		const data = await response.json();
		if (data.statusCode === 409) {
			await login();
			window.location.reload();
		}
		if (response.ok) {
			localStorage.setItem("token", data.access_token);
		} else {
			throw new Error("Network response was not ok");
		}
	} catch (error) {
		console.error("Error registering:", error);
	}
};
