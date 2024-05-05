import { ComponentProps } from 'react';

export function ProviderLogo({
	id,
	...props
}: { id: string } & ComponentProps<'img'>) {
	return (
		<img src={`/images/logos/${id}.svg`} alt={`Logo for ${id}`} {...props} />
	);
}
