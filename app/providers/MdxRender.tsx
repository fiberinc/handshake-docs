'use client';

import styled from '@emotion/styled';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export const MARKDOWN_COMPONENTS = {
	DocsLink(props: ComponentProps<'a'>) {
		return <a {...props}>Link to the documentation &rarr;</a>;
	},
	Callout({ children }: ComponentProps<'div'> & { variant: 'info' }) {
		return (
			<div className={twMerge('rounded-sm border p-4 text-[.95rem]')}>
				{children}
			</div>
		);
	},
	// CodeBlock({chidren}: ComponentProps<'a'>) {
	//   return <codeblock>{children}</codeblock>
	// },
};

export function MdxRender<TScope, TFrontmatter>(
	props: MDXRemoteProps<TScope, TFrontmatter>
) {
	return (
		<div
			className={twMerge(
				'markdown', // see markdown.css
				'block', // collapse margins
				'prose dark:prose-invert' // activate Tailwind Typography
			)}
		>
			<MDXRemote {...props} components={MARKDOWN_COMPONENTS} />
		</div>
	);
}
