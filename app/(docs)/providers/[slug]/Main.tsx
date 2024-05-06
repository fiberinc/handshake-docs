import { serialize } from 'next-mdx-remote/serialize';
import { Provider } from '~/lib/providers';
import { MdxRender } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';
import { Header } from './Header';
import { TableOfContents } from './TableOfContents';
import Markdown from 'react-markdown';
import Link from 'next/link';

interface Props {
	provider: Provider;
}

function Divider() {
	return <hr className="border-b-2 opacity-40" />;
}

export async function Main({ provider }: Props) {
	return (
		<div className="">
			<div className="flex flex-col gap-10 w-full">
				<Header provider={provider} />

				<Divider />

				<section className="prose block markdown dark:prose-invert">
					<h1 id="usage">
						<Link href="#usage">Usage</Link>
					</h1>

					<p>
						To use {provider.title}, configure your <code>options.ts</code> like
						so:
					</p>
					<MdxRender
						{...await serialize(provider.usage || '', makeSerializeOptions())}
					/>
				</section>

				{provider.troubleshoot && (
					<>
						<Divider />
						<section className="prose block markdown dark:prose-invert">
							<h1 id="troubleshoot">
								<Link href="#troubleshoot">Troubleshooting</Link>
							</h1>

							<p>Common problems to keep in mind:</p>
							<MdxRender
								{...await serialize(
									provider.troubleshoot || '',
									makeSerializeOptions()
								)}
							/>
						</section>
					</>
				)}

				<Divider />
				<section className="prose block markdown dark:prose-invert">
					<h1 id="tutorial">
						<Link href="#tutorial">Step-by-step guide</Link>
					</h1>
					<h2>Step 1: Create your Notion app</h2>
					<Markdown>{`
You will need a Notion app

[Visit the Notion docs](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up) for the complete picture.

![](/images/docs/notion/auth-docs.png)
`}</Markdown>

					<h2>Step 2: Setup Handshake</h2>
					<p>Configure</p>
					<MdxRender
						{...await serialize(provider.usage || '', makeSerializeOptions())}
					/>
					<h2>Step 3: Deploy to Vercel</h2>
					<Markdown>{`
Use the [Vercel CLI](https://vercel.com/docs/cli) to deploy:

\`\`\`bash
my-handshake $ vercel deploy --prod
Vercel CLI 33.5.2
⠏ Deploying felipap/my-handshake
🔍  Inspect: https://vercel.com/felipap/my-handshake/CgEBwu93GdmUbqyyUxqtSw [12s]
✅  Production: https://my-handshake-b6vwdktl7-fiber.vercel.app [12s]
⠇ Building
\`\`\`
`}</Markdown>

					<h2>Step 4: Send users!</h2>
					<Markdown>{`
Your instance should now be ready to use.

`}</Markdown>
				</section>
			</div>
			<div id="abc" />
		</div>
	);
}
