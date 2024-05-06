import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '~/lib/construct-metadata';
import { getProvider, getProviders } from '~/lib/providers';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';
import { Main } from './Main';
import { TableOfContents } from './TableOfContents';

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
		<div className="relative flex flex-row gap-16">
			<div className="w-full lg:max-w-[770px]">
				<Main provider={provider} />
			</div>
			<nav className="hidden xl:block w-[200px]">
				<div className="fixed">
					<TableOfContents
						links={
							[
								{ slug: 'usage', title: 'Usage' },
								provider.troubleshoot && {
									slug: 'troubleshoot',
									title: 'Troubleshoot',
								},
								{ slug: 'tutorial', title: 'Step-by-step guide' },
							].filter(Boolean) as any[]
						}
					/>
				</div>
			</nav>
		</div>
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
