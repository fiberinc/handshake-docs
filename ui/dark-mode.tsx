'use client';

import { useEffect, useState } from 'react';
import { useTimeout } from 'react-use';

export function toggleDarkMode() {
	const isDarkMode = document.documentElement.classList.toggle('dark');
	window.localStorage.isDarkMode = isDarkMode;
}

export function DarkModeScript() {
	// With <Script /> this is flashing the light mode on dark.
	return (
		<script
			id="dark-mode-toggle"
			suppressHydrationWarning
			dangerouslySetInnerHTML={{
				__html: `
				try {
					if (localStorage.isDarkMode === 'true') {
						console.log('adding')
						document.documentElement.classList.add('dark');
					} else if (localStorage.isDarkMode === 'false') {
						console.log('removing')
						// document.documentElement.classList.remove('dark');
					} else if (!('isDarkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
						console.log('adding')
						document.documentElement.classList.add('dark');
					} else {
						console.log('removing 2')
						// document.documentElement.classList.remove('dark');
					}
				} catch (e) {
					console.log('DarkModeScript failed', e)
				}
		`,
			}}
		/>
	);
}

export function useIsDarkMode() {
	// useTimeout(600);

	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		setIsDarkMode(document.documentElement.classList.contains('dark'));

		// Listen for changes in the document.
		const observer = new MutationObserver(() => {
			setIsDarkMode(document.documentElement.classList.contains('dark'));
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});
	}, []);

	return isDarkMode;
}
