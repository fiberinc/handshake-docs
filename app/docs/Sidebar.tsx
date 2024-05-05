import { HomeIcon } from '@radix-ui/react-icons';
import { FaCircle } from 'react-icons/fa';
import { ProviderInfo, getProviders } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { ProviderLogo } from '~/ui';
import { SidebarLink } from '~/ui/SidebarLink';
import { Text } from '~/ui/Text';

export async function Sidebar() {
	const providers = await getProviders();

	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col">
				<Text className="font-normal mb-3 text-contrast">Basics</Text>
				<SidebarLink
					href="/"
					icon={<HomeIcon className="w-4" />}
					label="Getting started"
				/>
			</section>
			{/* <section className="flex flex-col">
				<Text className="font-normal mb-3 text-contrast">Providers</Text>
				<ul className="flex flex-col gap-1">
					{providers.map((provider) => {
						return (
							<li key={provider.id}>
								<SidebarProviderLink {...provider} />
							</li>
						);
					})}
				</ul>
			</section> */}
		</div>
	);
}

function SidebarProviderLink(info: ProviderInfo) {
	return (
		<SidebarLink
			label={info.title}
			icon={
				info.hasLogo ? (
					<ProviderLogo id={info.id} width={'18px'} />
				) : (
					<FaCircle className="w-1.5 opacity-30" />
				)
			}
			href={ROUTES.provider(info.id)}
		/>
	);
}
