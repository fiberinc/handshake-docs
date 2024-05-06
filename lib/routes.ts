export const BASE_URL = '';
export const REPO_URL = 'https://github.com/fiberinc/handshake';

export const ROUTES = {
	// TODO change to providers
	provider: (id: string) => '/providers/' + id,
	basics: '/basics',
	reference: '/reference',
	framework: {
		next: '/frameworks/next',
	},
};
