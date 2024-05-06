import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
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
					<h1 id="how-it-works">
						<Link href="#how-it-works" className="text-inherit">
							How it works
						</Link>
					</h1>
					<p>With your instance deployed, simply redirect users to:</p>
					<pre>
						<code>
							https://YOUR_HANDSHAKE_INSTANCE_URL/auth/
							<span className="text-green-400">PROVIDER_ID</span>/redirect
						</code>
					</pre>
					<p>
						Where <code className="!text-green-400">PROVIDER_ID</code> is either{' '}
						<code>{provider.id}</code> or the value passed to the optional{' '}
						<code>id</code> argument of the{' '}
						<code>
							{provider.objectName}({})
						</code>{' '}
						factory.
					</p>
					<p>
						Handshake will take the user through the {provider.title} OAuth flow
						and redirect them back to you what the URL you pass to the{' '}
						<code>callback_uri</code> query parameter.
					</p>
					<MdxRenderInline
						{...await serialize(provider.usage || '', makeSerializeOptions())}
					/>
				</section>

				<Divider />
				<section className="prose block markdown dark:prose-invert">
					<h1 id="Usage">
						<Link href="#Usage" className="text-inherit">
							Usage
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

				{provider.setup && (
					<>
						<Divider />
						<section className="prose block markdown dark:prose-invert">
							<h1 id="setup">
								<Link href="#setup" className="text-inherit">
									Configuration
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
