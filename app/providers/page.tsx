import { Metadata } from 'next';
import Link from 'next/link';
import { Text } from '~/ui/Text';
import { Banner } from '~/ui/Banner';
import { ProviderList } from './ProviderList';

export const metadata: Metadata = {
	title: 'Handshake Providers',
};

export default function Page() {
	return (
		<div className="m-auto flex flex-col gap-5">
			<Link href="/">
				<Banner>&larr; Back to index</Banner>
			</Link>
			<header className="mb-10 flex flex-col gap-4">
				<Text variant="h1" id="providers">
					Providers
				</Text>
				<Text>This is the list of services we currently support.</Text>
			</header>

			<ul className="flex flex-col gap-6 md:gap-16">
				<ProviderList />
			</ul>
		</div>
	);
}
