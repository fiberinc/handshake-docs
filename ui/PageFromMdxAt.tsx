import assert from 'assert';
import { readFileSync } from 'fs';
import { Metadata } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { constructMetadata } from '~/lib/construct-metadata';
import { DocPageHeader } from '~/ui/DocPageHeader';
import { DocPageMain } from '~/ui/DocPageMain';
import { MdxRender } from '~/ui/mdx/MdxRender';
import { makeSerializeOptions } from '~/ui/mdx/serialize-options';

export function getRelativePath(absDirname: string) {
	return absDirname.split('.next/server')[1];
}

export async function makeMetadataFromMdxAt(path: string): Promise<Metadata> {
	const contents = readFileSync(process.cwd() + path, 'utf-8').toString();
	const serialized = await serialize(contents, { parseFrontmatter: true });

	const { title, subtitle } = serialized.frontmatter;
	assert(title, 'title');

	return constructMetadata({
		title: title as string | undefined,
		description: subtitle as string | undefined,
	});
}

export async function PageFromMdxAt({ path }: { path: string }) {
	const contents = readFileSync(process.cwd() + path, 'utf-8').toString();
	const serialized = await serialize(contents, makeSerializeOptions());
	const { title, subtitle, pretitle } = serialized.frontmatter;
	assert(title, 'title');

	return (
		<DocPageMain>
			<DocPageHeader
				title={title as string}
				subtitle={subtitle as string | undefined}
				pretitle={pretitle as string | undefined}
			/>

			<div className="pt-10 border-t-2" />

			<MdxRender {...serialized} />
		</DocPageMain>
	);
}
