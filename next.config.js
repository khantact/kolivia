/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.weatherapi.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
