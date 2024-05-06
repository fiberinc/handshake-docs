import { Provider } from '~/lib/providers';
import { providerLogoExistsFor } from '~/ui';
import { DocPageHeader } from '~/ui/DocPageHeader';
import { ProviderLogo } from '~/ui/ProviderLogo';
import { Text } from '~/ui/Text';

interface Props {
	provider: Provider;
}

export function Header({ provider }: Props) {
	return (
		<>
			<DocPageHeader
				pretitle="OAuth Providers"
				titleIcon={<ProviderLogo id={provider.id} className="w-[35px]" />}
				title={provider.title}
				subtitle={`Obtain access tokens to ${provider.title} accounts with Handshake.`}
			/>
			<header className="hidden flex flex-col gap-6">
				<Text variant="pretitle">OAuth Providers</Text>
				<ProviderLogo id={provider.id} className="w-[40px]" />
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
