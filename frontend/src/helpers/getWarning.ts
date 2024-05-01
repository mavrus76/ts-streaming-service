export const getWarning = () => {
	const warning = document.getElementById("warning") ?? null;
	if (warning) {
		warning.classList.add("active");
		setTimeout(() => {
			warning.classList.remove("active");
		}, 3000);
	}
};
