import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from '~/ui/Text';

interface Props {
	pretitle?: string | ReactNode;
	title: string | ReactNode;
	titleIcon?: ReactNode;
	subtitle?: string | ReactNode;
	className?: string;
}

export function DocPageHeader({
	title,
	subtitle,
	pretitle,
	className,
	titleIcon,
}: Props) {
	return (
		<header className={twMerge('flex flex-col gap-3 mb-10', className)}>
			{pretitle && (
				<Text variant="pretitle" className="mb-2">
					{pretitle}
				</Text>
			)}
			<div className="flex flex-row gap-4 items-center">
				{titleIcon}
				<Text variant="h1">
					{typeof title === 'string' ? <span>{title}</span> : title}
				</Text>
			</div>
			{subtitle && (
				<div className="flex flex-col gap-1">
					<Text variant="s2">
						{typeof subtitle === 'string' ? <span>{subtitle}</span> : subtitle}
					</Text>
				</div>
			)}
		</header>
	);
}
