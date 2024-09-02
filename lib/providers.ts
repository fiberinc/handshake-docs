import { SerializeOptions } from 'next-mdx-remote/dist/types';
import providers from '../providers.json';

export type ProviderInput = any;

export interface Provider {
	id: string;
	objectName: string;
	title: string;
	website: string | null;
	docsUrl: string;
	docs: {
		redirect: string | null;
		options: string | null;
		troubleshoot: string | null;
		provider: string | null;
	};
}

function makeFallbackOptions(provider: ProviderInput): string {
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
	return baseToProvider(base);
}

function baseToProvider(base: (typeof providers)[number]): Provider {
	return {
		...base,
		id: base.id,
		objectName: base.objectName,
		title: base.title,
		website: base.website,
		docsUrl: base.docsUrl,
		// troubleshoot: base.troubleshoot,
		// setup: base.setup,
		// usage: base.usage,
		docs: {
			redirect: base.blockTagsByName.redirect || null,
			options: base.blockTagsByName.options || makeFallbackOptions(base),
			troubleshoot: base.blockTagsByName.troubleshoot || null,
			provider: base.blockTagsByName.providersetup || null,
		},
	};
}

export async function getProviders(): Promise<Provider[]> {
	const filteredProviders =
		process.env.NODE_ENV === 'development'
			? providers.slice(0, 400)
			: providers;

	return filteredProviders.map(baseToProvider);
}
