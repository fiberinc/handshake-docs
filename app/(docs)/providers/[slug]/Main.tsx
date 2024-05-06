import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { Provider } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';
import { MdxRenderInline } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';
import { Header } from './Header';

interface Props {
	provider: Provider;
}

function Divider() {
	return <hr className="border-b-2 opacity-40" />;
}

export async function Main({ provider }: Props) {
	return (
		<div className="">
			<Header provider={provider} />
			<div className="flex flex-col gap-10 w-full">
				<Divider />

				<section className="prose block markdown dark:prose-invert">
					<h1 id="configuration">
						<Link href="#configuration" className="text-inherit">
							Configuration
						</Link>
					</h1>

					<p>
						To use {provider.title}, add the{' '}
						<code>{provider.objectName}()</code> handler to your{' '}
						<code>app/options.ts</code> file like so:
					</p>
					<MdxRenderInline
						{...await serialize(
							provider.configuration || '',
							makeSerializeOptions()
						)}
					/>
					<p>
						<Link href={ROUTES.reference}>Consult the reference</Link> to learn
						more about <code>HandshakeOptions</code>.
					</p>
				</section>

				<Divider />
				<section className="prose block markdown dark:prose-invert">
					<h1 id="usage">
						<Link href="#usage" className="text-inherit">
							Usage
						</Link>
					</h1>
					<p>With your instance deployed, simply redirect users to:</p>
					<pre>
						<code>
							https://YOUR_HANDSHAKE_INSTANCE_URL/auth/
							<span className="text-green-400">PROVIDER_ID</span>
						</code>
					</pre>
					<p>
						Where <code className="!text-green-400">PROVIDER_ID</code> is either{' '}
						<code>{provider.id}</code> or the value you passed as the optional{' '}
						<code>id</code> argument of the{' '}
						<code>
							{provider.objectName}({})
						</code>{' '}
						factory.
					</p>
					<MdxRenderInline
						{...await serialize(provider.usage || '', makeSerializeOptions())}
					/>
				</section>

				{provider.setup && (
					<>
						<Divider />
						<section className="prose block markdown dark:prose-invert">
							<h1 id="setup">
								<Link href="#setup" className="text-inherit">
									Provider setup
								</Link>
							</h1>

							<MdxRenderInline
								{...await serialize(
									provider.setup || '',
									makeSerializeOptions()
								)}
							/>
						</section>
					</>
				)}

				{provider.troubleshoot && (
					<>
						<Divider />
						<section className="prose block markdown dark:prose-invert">
							<h1 id="troubleshoot">
								<Link href="#troubleshoot" className="text-inherit">
									Troubleshooting
								</Link>
							</h1>

							<p>Common problems to keep in mind:</p>
							<MdxRenderInline
								{...await serialize(
									provider.troubleshoot || '',
									makeSerializeOptions()
								)}
							/>
						</section>
					</>
				)}
			</div>
		</div>
	);
}
