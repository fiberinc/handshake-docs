import { SerializeOptions } from 'next-mdx-remote/dist/types';
import providers from '../providers.json';

export type ProviderInput = any;

export interface Provider {
	id: string;
	objectName: string;
	title: string;
	website: string | null;
	summary: string | any;
	docsUrl: string;
	troubleshoot: string | null;
	usage: string;
	hasLogo?: boolean;
}

function makeProviderUsage(provider: ProviderInput): string {
	return `
\`\`\`ts title="app/options.ts"
import { ${provider.objectName}, HandshakeOptions } from "handshake";

const config: HandshakeOptions = {
  handlers: [
    ${provider.objectName}({
      clientId: string,
      clientSecret: string,${provider.takesSubdomainArg ? '\n      subdomain: string,' : ''}
    });
  ],
}

// ...
\`\`\`

${provider.isFromNextAuth ? 'Adapted from [next-auth](https://github.com/nextauthjs/next-auth).' : ''}`;
}

export async function getProvider(
	id: string,
	options: SerializeOptions = { parseFrontmatter: true }
): Promise<Provider | null> {
	const base = providers.find((f) => f.id === id);
	if (!base) {
		return null;
	}
	return {
		id: base.id,
		objectName: base.objectName,
		title: base.title,
		docsUrl: base.docsUrl,
		website: base.website,
		hasLogo: !PROVIDERS_WITHOUT_LOGOS.includes(base.id),
		usage: base.usage || makeProviderUsage(base),
		troubleshoot: base.troubleshoot,
		summary: base.summary,
		// serialized: await getProviderDocs(base, options),
	};
}

export async function getProviders(): Promise<Provider[]> {
	const filteredProviders =
		process.env.NODE_ENV === 'development'
			? providers.slice(0, 400)
			: providers;

	return filteredProviders.map((base): Provider => {
		return {
			...base,
			id: base.id,
			objectName: base.objectName,
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
