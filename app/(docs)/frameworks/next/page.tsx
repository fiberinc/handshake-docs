import { serialize } from 'next-mdx-remote/serialize';
import { REPO_URL } from '~/lib/routes';
import { DocPageHeader } from '~/ui/DocPageHeader';
import { DocPageMain } from '~/ui/DocPageMain';
import { MdxRender } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';

const CONTENT = `
Handshake is an open-source [Next.js](https://nextjs.org) app that handles OAuth flows with over 200 APIs. Our latest version uses Next 14 with the new [app router](https://nextjs.org/docs/app).

## Does Handshake work with other frameworks?

Not at the moment, but we are hoping to support more frameworks in the future. If this is something you will like to contribute, please open a [pull request in our repo](${REPO_URL}/pulls).

As always, you can email our team at [team@fiber.dev](mailto:team@fiber.dev) with any questions or suggestions.

## Can Handshake be deployed outside of Vercel?

Yes, you can deploy Handshake on any platform that supports Next.js. We recommend [Vercel](https://vercel.com/) for the best experience, but you can also deploy on platforms like Netlify, AWS, or Google Cloud. If you choose to go that route, we highly recommend [SST](https://sst.dev/).

`;

export default async function Page() {
	return (
		<DocPageMain>
			<DocPageHeader
				pretitle="Frameworks"
				titleIcon={<img src="/images/next.svg" width={50} alt="Next.js logo" />}
				title={'Deploy with Next.js'}
				subtitle={`Handshake uses Next.js to handle OAuth`}
			/>

			<div className="pt-10 border-t-2" />
			<MdxRender {...await serialize(CONTENT, makeSerializeOptions())} />
		</DocPageMain>
	);
}
