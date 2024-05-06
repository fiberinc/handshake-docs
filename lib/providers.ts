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
	setup: string | null;
	troubleshoot: string | null;
	configuration: string;
	usage: string;
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
		configuration: base.configuration || makeProviderUsage(base),
		troubleshoot: base.troubleshoot,
		setup: base.setup,
		usage: base.usage,
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
			docsUrl: base.docsUrl,
			configuration: base.configuration || makeProviderUsage(base),
			troubleshoot: base.troubleshoot,
			setup: base.setup,
			usage: base.usage,
			summary: base.summary,
		};
	});
}
