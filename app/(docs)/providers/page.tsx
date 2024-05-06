import { CircleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { BiCircle } from 'react-icons/bi';
import { getProviders } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { ProviderLogo } from '~/ui';
import { Text } from '~/ui/Text';

export default async function Page() {
	const guides = await getProviders();

	return (
		<div className="flex flex-col gap-10">
			<header>
				<Text variant="h1">All providers</Text>
			</header>
			<ul className="flex list-none flex-col gap-5">
				{guides.map((guide) => {
					return (
						<li key={guide.id}>
							<Link href={ROUTES.provider(guide.id)}>
								<div className="flex gap-3 items-center">
									<div className="flex items-center justify-center w-[40px]">
										{guide.hasLogo ? (
											<ProviderLogo id={guide.id} width="18px" />
										) : (
											<BiCircle className="w-1" />
										)}
									</div>
									<h2 className="text-contrastn text-lg">{guide.title}</h2>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
