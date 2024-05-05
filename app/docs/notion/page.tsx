import Markdown from 'react-markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRender } from '~/app/providers/MdxRender';
import { getProviderWithDocs } from '~/lib/providers';
import { ProviderLogo } from '~/ui';
import { Text } from '~/ui/Text';

export const metadata: Metadata = {
	title: 'Implement Notion OAuth in 5 minutes',
	description: 'How to handle Notion OAuth in 5 minutes.',
};

const FAQ: [string, string][] = [
	['What is OAuth?', ''],
	['How can Handshake help?', ''],
];

export default async function Page() {
	const info = await getProviderWithDocs('notion');
	if (!info) {
		return notFound();
	}

	return (
		<div className="flex flex-col gap-10 w-full">
			<header className="flex flex-col gap-6">
				{info.hasLogo && <ProviderLogo id={info.id} className="w-[40px]" />}
				<div className="flex flex-col gap-2">
					<Text variant="h1">Notion OAuth with Handshake</Text>
					<Text variant="s2">
						Learn how to set up Handshake to handle Notion OAuth.
					</Text>
				</div>
			</header>
			<hr />
			<main className="prose block markdown dark:prose-invert">
				<Markdown>{`

`}</Markdown>

				<h2>Step 1: Create your Notion app</h2>
				<Markdown>{`
You will need a Notion app

[Visit the Notion docs](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up) for the complete picture.

![](/images/docs/notion/auth-docs.png)
`}</Markdown>

				<h2>Step 2: Setup Handshake</h2>
				<p>Configure</p>
				<MdxRender {...info.serialized} />
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
			</main>
			<section>
				<Text variant="h2">Frequently Asked Questions</Text>
				<ul className="flex flex-col gap-4">
					{FAQ.map(([question, answer]) => (
						<li key={question}>
							<Text variant="h3">{question}</Text>
							<Text variant="body">{answer}</Text>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
