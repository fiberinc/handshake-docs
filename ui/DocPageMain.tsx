import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
	children?: ReactNode;
	className?: string;
}

export function DocPageMain({ children, className }: Props) {
	return (
		<div className={twMerge('w-full lg:max-w-[770px]', className)}>
			{children}
		</div>
	);
}
