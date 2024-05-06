import { Provider } from '~/lib/providers';
import { ProviderLogo } from '~/ui';
import { Text } from '~/ui/Text';

interface Props {
	provider: Provider;
}

export function Header({ provider }: Props) {
	return (
		<>
			<header className=" flex flex-col gap-6">
				<Text variant="pretitle">OAuth Providers</Text>
				<div className="flex flex-row gap-4 items-center">
					{provider.hasLogo && (
						<ProviderLogo id={provider.id} className="w-[35px]" />
					)}
					<Text variant="h1">{provider.title}</Text>
				</div>
				<div className="flex flex-col gap-1">
					<Text variant="subtitle">
						Obtain access tokens from {provider.title} with Handshake
					</Text>
				</div>
			</header>
			<header className="hidden flex flex-col gap-6">
				<Text variant="pretitle">OAuth Providers</Text>
				{provider.hasLogo && (
					<ProviderLogo id={provider.id} className="w-[40px]" />
				)}
				<div className="flex flex-col gap-1">
					<Text variant="h1">{provider.title} OAuth with Handshake</Text>
					<Text variant="s2">
						Learn how to set up Handshake to obtain access tokens from{' '}
						{provider.title}.
					</Text>
				</div>
			</header>
		</>
	);
}
