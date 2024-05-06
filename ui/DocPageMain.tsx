import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {
	TableOfContents,
	TocLink,
} from '~/app/(docs)/providers/[slug]/TableOfContents';

interface Props {
	children?: ReactNode;
	className?: string;
	toc?: TocLink[];
}

export function DocPageMain({ children, className, toc }: Props) {
	return (
		<div className="relative flex flex-row gap-16">
			<div className={twMerge('w-full lg:max-w-[770px]', className)}>
				{children}
			</div>
			{toc && toc.length > 0 && (
				<nav className="hidden xl:block w-[200px]">
					<div className="fixed">
						<TableOfContents links={toc} />
					</div>
				</nav>
			)}
		</div>
	);
}
