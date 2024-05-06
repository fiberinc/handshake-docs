import { SerializeOptions } from 'next-mdx-remote/dist/types';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { addImageCaption } from './add-image-caption';
import { ContentHeading, extractToc } from './extract-toc';

export const makeSerializeOptions = (
	titles: ContentHeading[] = []
): SerializeOptions => ({
	scope: {},
	// Remark is for parsing Markdown, rehype is for HTML.
	mdxOptions: {
		remarkPlugins: [
			// Plugin list at https://github.com/remarkjs/remark
			// [remarkMdxInjectSnippets, snippetTreeMap],
			// Needed for tables etc. https://mdxjs.com/guides/gfm/
			// withRemoveJavascript,
			// withFrames,
			// withTableOfContents,
			// withSmartypants,
			// withRemoveImports,
			// imageBasePathRewrite,
			// @ts-ignore
			addImageCaption,
			remarkGfm,
			// @ts-ignore fuck you
			[extractToc, { titles }],
		],
		rehypePlugins: [
			// FELIPE: this was causing components in lines by themselves to be removed. WTF!
			// withRemoveUnknownJsx,
			// withCodeBlocks,
			// [
			// 	withSyntaxHighlighting,
			// 	{
			// 		ignoreMissing: true, // Ignore errors when no language is found
			// 	},
			// ],
			// withListRoles,
			// withApiComponents,
			// withRawComponents,
			// withLayouts,
			// withZoomImages,
			[
				// https://rehype-pretty.pages.dev/#theme
				// @ts-ignore
				rehypePrettyCode,
				{
					// https://rehype-pretty.pages.dev/#keepbackground
					keepBackground: false,
					// https://textmate-grammars-themes.netlify.app/?theme=min-light&grammar=javascript
					theme: 'min-dark',
				},
			],
			// Add an id= to headings.
			// rehypeSlug,
			// Add an anchor link to headings.
			[rehypeAutolinkHeadings, { behavior: 'wrap' }],
		],
		format: 'mdx',
		useDynamicImport: true,
	},
	parseFrontmatter: true,
});
