import { useMedia, useTimeout } from 'react-use';

export function useIsDarkMode() {
	useTimeout(600);
	return useMedia('(prefers-color-scheme: dark)');
}
