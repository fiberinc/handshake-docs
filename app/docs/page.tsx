import Link from 'next/link';
import { getProviders } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { Text } from '~/ui/Text';

export default async function Page() {
	const guides = await getProviders();

	return (
		<div className="flex flex-col gap-10">
			<header>
				<Text variant="h1">Guides</Text>
			</header>
			<ul className="flex list-none flex-col gap-5">
				{guides.map((guide) => {
					return (
						<li key={guide.id}>
							<Link href={ROUTES.provider(guide.id)}>
								<div className="">
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
