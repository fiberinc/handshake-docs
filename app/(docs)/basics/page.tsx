import { serialize } from 'next-mdx-remote/serialize';
import { MdxRender } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';

export default async function Page() {
	const serialized = await serialize(
		`
# Welcome to Handshake docs

Handshake is a bla bla bla

### Features:

- **Type-safe**. Handshake is written in TypeScript and all providers have type definitions.

`,
		makeSerializeOptions()
	);

	return (
		<div>
			<MdxRender {...serialized} />
		</div>
	);
}
