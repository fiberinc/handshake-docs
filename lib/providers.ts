import { SerializeOptions } from 'next-mdx-remote/dist/types';
import { serialize } from 'next-mdx-remote/serialize';
import providers from '../providers.json';

export interface ProviderInfo {
	id: string;
	title: string;
	website: string | null;
	serialized?: null | any;
	hasLogo?: boolean;
}

async function getProviderDocs(
	provider: any,
	serializeOptions: SerializeOptions = { parseFrontmatter: true }
): Promise<any> {
	let providerDocs: string = provider.docs ?? '';
	if (!providerDocs) {
		providerDocs = `

Connect to your customers&apos; ${provider.website ? `[${provider.title}](${provider.website})` : provider.title} accounts.

## Usage

Provide the following arguments:

\`\`\`ts title="app/options.ts"
import { ${provider.name}, HandshakeOptions } from "handshake";

const config: HandshakeOptions = {
handlers: [
${provider.name}({
  clientId: string,
  clientSecret: string,${provider.takesSubdomainArg ? '\n      subdomain: string,' : ''}
});
],
}

// ...
\`\`\`

${provider.isFromNextAuth ? 'Adapted from [next-auth](https://github.com/nextauthjs/next-auth).' : ''}`;
	}

	return serialize(providerDocs, serializeOptions);
}

export async function getProviderWithDocs(
	id: string,
	options: SerializeOptions = { parseFrontmatter: true }
): Promise<ProviderInfo | null> {
	const base = providers.find((f) => f.id === id);
	if (!base) {
		return null;
	}
	return {
		id: base.id,
		title: base.title,
		website: base.website,
		hasLogo: !PROVIDERS_WITHOUT_LOGOS.includes(base.id),
		serialized: await getProviderDocs(base, options),
	};
}

export async function getProvidersWithDocs(): Promise<ProviderInfo[]> {
	const filteredProviders =
		process.env.NODE_ENV === 'development' ? providers.slice(0, 20) : providers;

	return await Promise.all(
		filteredProviders.map(async (base): Promise<ProviderInfo> => {
			return {
				id: base.id,
				title: base.title,
				website: base.website,
				hasLogo: !PROVIDERS_WITHOUT_LOGOS.includes(base.id),
				serialized: await getProviderDocs(base),
			};
		})
	);
}

export async function getProviders(): Promise<ProviderInfo[]> {
	const filteredProviders =
		process.env.NODE_ENV === 'development'
			? providers.slice(0, 400)
			: providers;

	return filteredProviders.map((base): ProviderInfo => {
		return {
			id: base.id,
			title: base.title,
			website: base.website,
			hasLogo: !PROVIDERS_WITHOUT_LOGOS.includes(base.id),
		};
	});
}

export const PROVIDERS_WITHOUT_LOGOS =
	'aweber acton acuityscheduling alchemer arcgis assembla authing axosoft bungie clio concur constantcontact crossid delivery deputy echosign ecwid egnyte familysearch freeagent geeklist getbase hellosign huddle idme idonethis infusionsoft jamendo mailup mailru mailxpert mapmyfitness mastodon moxtra nokotime onelogin openstreetmap2 projectplace qq redbooth runkeeper sellsy shoeboxed smartsheet socialpilot socrata stocktwits stormz surveysparrow ticketbud timely traxo tripit united-effects vend verticalresponse viadeo weekdone withings zitadel'.split(
		' '
	);

// REMOVED because they're ugly: viadeo runkeeper zitadel arcgis egnyte
