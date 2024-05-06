import Link from 'next/link';
import { Provider } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { ProviderLogo } from '~/ui/ProviderLogo';

interface Props {
	infos: Provider[];
}

export function ProviderGrid({ infos }: Props) {
	const els = infos.map((info) => (
		<Link key={info.id} href={ROUTES.provider(info.id)}>
			<div className="hover:bg-foreground text-contrast flex h-[45px] flex-row items-center gap-3 rounded-md border px-3.5">
				<ProviderLogo id={info.id} width={20} style={{ maxHeight: '20px' }} />
				{info.title}
			</div>
		</Link>
	));

	return <>{els}</>;
}
