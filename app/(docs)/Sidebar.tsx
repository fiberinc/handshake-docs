import { BookmarkIcon, HomeIcon, TriangleUpIcon } from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';
import { FaCircle } from 'react-icons/fa';
import { Provider, getProviders } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { ProviderLogo } from '~/ui';
import { SidebarLink } from '~/ui/SidebarLink';
import { Text } from '~/ui/Text';

export async function Sidebar() {
	const providers = await getProviders();

	return (
		<div className="flex flex-col gap-8 max-w-full">
			<section className="flex flex-col">
				<Text className="font-normal mb-3 text-contrast">Basics</Text>
				<SidebarLinkList>
					<SidebarLink
						href={ROUTES.basics}
						icon={<HomeIcon className="w-4" />}
						label="Getting started"
					/>
					<SidebarLink
						href={ROUTES.reference}
						icon={<BookmarkIcon className="w-4" />}
						label="Reference"
					/>
				</SidebarLinkList>
			</section>
			<section className="flex flex-col">
				<Text className="font-normal mb-3 text-contrast">Frameworks</Text>
				<SidebarLinkList>
					<SidebarLink
						href={ROUTES.framework.next}
						icon={<img src="/images/next.svg" width={50} alt="Next.js logo" />}
						label="Next.js"
					/>
				</SidebarLinkList>
			</section>
			<section className="flex flex-col">
				<Text className="font-normal mb-3 text-contrast">Providers</Text>
				<SidebarLinkList>
					{providers.map((provider) => {
						return (
							<li key={provider.id}>
								<SidebarProviderLink {...provider} />
							</li>
						);
					})}
				</SidebarLinkList>
			</section>
		</div>
	);
}

function SidebarProviderLink(info: Provider) {
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

function SidebarLinkList({ children }: PropsWithChildren) {
	return <ul className="flex flex-col gap-0">{children}</ul>;
}
