import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import { Provider } from '~/lib/providers';
import { REPO_URL, ROUTES } from '~/lib/routes';
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
					<p>With your instance deployed, redirect users to:</p>
					<pre>
						<code>
							https://YOUR_HANDSHAKE_INSTANCE_URL/auth/
							<span className="text-green-400">HANDLER_ID</span>/redirect
						</code>
					</pre>
					<p>
						Where <code className="!text-green-400">HANDLER_ID</code> is either{' '}
						<code>{provider.id}</code> or the value passed to the optional{' '}
						<code>id</code> argument of the{' '}
						<code>
							{provider.objectName}({})
						</code>{' '}
						factory. (See <Link href="#options">Options</Link> below.)
					</p>
					<p>
						Handshake will take each user through the {provider.title} OAuth
						flow and before sending them back to you, at the URL specified by
						the <code>callback_uri</code> query parameter.
					</p>
					<MdxRenderInline
						{...await serialize(
							provider.docs.redirect || '',
							makeSerializeOptions()
						)}
					/>
				</section>

				<Divider />
				<section className="prose block markdown dark:prose-invert">
					<h1 id="options">
						<Link href="#options" className="text-inherit">
							Options
						</Link>
					</h1>

					<p>
						Modify your <code>app/options.ts</code> file to include the{' '}
						<code>{provider.objectName}()</code> handler like so:
					</p>
					<MdxRenderInline
						{...await serialize(
							provider.docs.options || '',
							makeSerializeOptions()
						)}
					/>
					<p>
						<Link href={ROUTES.reference}>Consult the reference</Link> to learn
						about <code>HandshakeOptions</code>.
					</p>
				</section>

				{provider.docs.provider && (
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
									provider.docs.provider || '',
									makeSerializeOptions()
								)}
							/>
						</section>
					</>
				)}

				<>
					<Divider />
					<section className="prose block markdown dark:prose-invert">
						<h1 id="troubleshooting">
							<Link href="#troubleshooting" className="text-inherit">
								Troubleshooting
							</Link>
						</h1>

						{provider.docs.troubleshoot && (
							<>
								<MdxRenderInline
									{...await serialize(
										provider.docs.troubleshoot || '',
										makeSerializeOptions()
									)}
								/>
								<Divider />
							</>
						)}

						<p>
							Facing an issue{' '}
							{provider.docs.troubleshoot
								? 'not included here'
								: `making ${provider.title} work`}
							?{' '}
							<a href={REPO_URL + '/issues'} target="_blank">
								Open an issue on GitHub
							</a>{' '}
							to get help.
						</p>
					</section>
				</>
			</div>
		</div>
	);
}
