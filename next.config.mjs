/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// swcMinify: true,
	// pageExtensions: ["ts", "tsx"],
	// compiler: { emotion: true },
	transpilePackages: ['next-mdx-remote'],
	async redirects() {
		return [
			{
				source: '/docs',
				destination: '/basics',
				permanent: true,
			},
			{
				source: '/docs/:slug*',
				destination: '/providers/:slug*',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
