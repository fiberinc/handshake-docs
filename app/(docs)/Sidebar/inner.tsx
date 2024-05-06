'use client';

import { BookmarkIcon, HomeIcon } from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';
import { FaCircle } from 'react-icons/fa';
import { Provider } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { providerLogoExistsFor } from '~/ui';
import { ProviderLogo } from '~/ui/ProviderLogo';
import { Text } from '~/ui/Text';
import { SidebarLink } from './SidebarLink';
import { useIsDarkMode } from '~/ui/dark-mode';

interface Props {
	providers: Provider[];
}

export function SidebarInner({ providers }: Props) {
	const darkMode = useIsDarkMode();

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
						icon={
							<img
								src={`/images/next${darkMode ? '-white' : ''}.svg`}
								width={50}
								alt="Next.js logo"
							/>
						}
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
				<ProviderLogo
					id={info.id}
					className="w-5 h-5"
					fallback={<FaCircle className="w-1.5 opacity-30" />}
				/>
			}
			href={ROUTES.provider(info.id)}
		/>
	);
}

function SidebarLinkList({ children }: PropsWithChildren) {
	return <ul className="flex flex-col gap-0">{children}</ul>;
}
