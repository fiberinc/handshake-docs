import { serialize } from 'next-mdx-remote/serialize';
import { DocPageHeader } from '~/ui/DocPageHeader';
import { DocPageMain } from '~/ui/DocPageMain';
import { MdxRender } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';

const CONTENT = `

Handshake is a bla bla bla

### Features:

- **Type-safe**. Handshake is written in TypeScript and all providers have type definitions.


---

# Reference

### \`HandshakeOptions\`

More stuff

---

# Frequently asked questions

## Can I merge Handshake into my existing app?

You're very welcome to try. We designed Handshake to be a standalone application, but you can try to copy-paste its code into your existing Next.js app. Keep in mind that this will make upgrades more difficult.


## Can you host Handshake for me?

Handshake was designed with self-hosting in mind. The team at Fiber can host.

`;

export default async function Page() {
	return (
		<DocPageMain>
			<DocPageHeader
				pretitle="Getting started"
				title={'Handshake docs'}
				// subtitle={`LearnHandshake uses Next.js to handle OAuth`}
			/>

			<div className="pt-10 border-t-2" />

			<MdxRender {...await serialize(CONTENT, makeSerializeOptions())} />
		</DocPageMain>
	);
}
