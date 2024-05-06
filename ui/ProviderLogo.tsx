'use client';

import { ComponentProps, ReactNode } from 'react';
import { useIsDarkMode } from './dark-mode';
import { providerLogoExistsFor } from '.';

export function ProviderLogo({
	id,
	fallback,
	...props
}: { id: string; fallback?: ReactNode } & ComponentProps<'img'>) {
	const darkMode = useIsDarkMode();

	if (!providerLogoExistsFor(id)) {
		return fallback || null;
	}

	return (
		<img
			src={`/images/provider-logos/${darkMode ? 'light/' : 'original/'}${id}.svg`}
			alt={`Logo for ${id}`}
			{...props}
		/>
	);
}
