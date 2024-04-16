import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				"rotate-360": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				typing: {
					"0%": {
						width: "0%",
						visibility: "hidden",
					},
					"100%": {
						width: "100%",
					},
				},
				blink: {
					"50%": {
						borderColor: "transparent",
					},
					"100%": {
						borderColor: "white",
					},
				},
				blinkAI: {
					"50%": {
						borderColor: "transparent",
					},
					"100%": {
						borderColor: "black",
					},
				},
			},
			animation: {
				"rotate-360": "rotate-360 10s linear infinite",
				typing: "typing 2s steps(30) alternate, blink 1s infinite",
				typingAI: "typing 1.5s steps(40) alternate",
			},
		},
	},
	plugins: [],
};
export default config;
