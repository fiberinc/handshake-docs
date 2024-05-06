import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '~/lib/construct-metadata';
import { getProvider, getProviders } from '~/lib/providers';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';
import { Main } from './Main';
import { TableOfContents } from './TableOfContents';
import { DocPageMain } from '~/ui/DocPageMain';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const provider = await getProvider(params.slug);

	if (!provider) {
		throw Error(`Can't fetch metadata for post ${params.slug}`);
	}

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []
	return constructMetadata({
		// title: `${post.title} – Handshake Blog`,
		title: `Implement ${provider.title} OAuth in 5 minutes`,
		description: `How to handle ${provider.title} OAuth in 5 minutes.`,

		// description: post.subtitle,
		// image: post.imageUrl,
	});
}

export default async function Page({ params }: Props) {
	const provider = await getProvider(params.slug, makeSerializeOptions());
	if (!provider) {
		return notFound();
	}

	return (
		<DocPageMain
			toc={
				[
					{ slug: 'configuration', title: 'Configuration' },
					{ slug: 'usage', title: 'Usage' },
					provider.setup && {
						slug: 'setup',
						title: 'Provider setup',
					},
					provider.troubleshoot && {
						slug: 'troubleshoot',
						title: 'Troubleshoot',
					},
				].filter(Boolean) as any[]
			}
		>
			<Main provider={provider} />
		</DocPageMain>
	);
}

// There are no posts other than the ones we specify.
export const dynamicParams = false;

export const generateStaticParams = async (): Promise<Props['params'][]> => {
	const providers = await getProviders();

	return providers.map((post) => ({
		slug: post.id,
	}));
};
