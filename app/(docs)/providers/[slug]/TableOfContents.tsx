import Link from 'next/link';
import { Text } from '~/ui/Text';

export interface TocLink {
	title: string;
	slug: string;
}

interface Props {
	links: TocLink[];
}

export function TableOfContents({ links }: Props) {
	return (
		<div className="flex flex-col gap-1.5">
			<Text className="font-medium text-contrast uppercase text-xs">
				On this page
			</Text>
			<ul>
				{links.map(({ title, slug }) => (
					<li key={slug}>
						<Link
							href={`#${slug}`}
							className="h-[33px] flex flex-row items-center"
						>
							<Text className="text-sm transition hover:text-contrast">
								{title}
							</Text>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
