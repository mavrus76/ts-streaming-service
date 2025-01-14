/* eslint-disable no-undef */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		"jest/globals": true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "jest"],
	rules: {
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
		"@typescript-eslint/no-explicit-any": 0,
	},
};
