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

	return (
		<div className="w-fit [&_div]:w-4 [&_div]:h-4">
			<div
				style={{
					// WebkitMaskImage: `url('/images/logos/${id}.svg')`,
					backgroundImage: `url('/images/logos/${id}.svg')`,
					backgroundRepeat: 'no-repeat',
					// maskImage: `url('/images/logos/${id}.svg')`,
					// backgroundColor: 'white',
					maskRepeat: 'no-repeat',
				}}
				{...props}
			/>
		</div>
		//  src={`/images/logos/${id}.svg`} alt={`Logo for ${id}`} {...props} />
	);
}
