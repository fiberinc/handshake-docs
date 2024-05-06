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


# Step-by-step guid

## Step 1: Create your Notion app
You will need a Notion app

[Visit the Notion docs](https://developers.notion.com/docs/authorization#public-integration-auth-flow-set-up) for the complete picture.

![](/images/docs/notion/auth-docs.png)

## Step 2: Setup Handshake
	Configure


## Step 3: Deploy to Vercel

Use the [Vercel CLI](https://vercel.com/docs/cli) to deploy:

\`\`\`bash
my-handshake $ vercel deploy --prod
Vercel CLI 33.5.2
⠏ Deploying felipap/my-handshake
🔍  Inspect: https://vercel.com/felipap/my-handshake/CgEBwu93GdmUbqyyUxqtSw [12s]
✅  Production: https://my-handshake-b6vwdktl7-fiber.vercel.app [12s]
⠇ Building
\`\`\`

## Step 4: Send users

Your instance should now be ready to use.


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
