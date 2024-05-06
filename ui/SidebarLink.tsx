'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from '~/ui/Text';

interface SidebarLinkProps {
	icon: ReactNode;
	label: string;
	href: string;
}

export function SidebarLink({ icon, label, href }: SidebarLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link href={href}>
			<div
				className={twMerge(
					'flex flex-row items-center justify-start gap-3 p-2 h-[40px] group w-full',
					isActive && 'bg-red'
				)}
			>
				<div className="w-[20px] flex justify-center shrink-0">{icon}</div>
				<div className="overflow-hidden">
					<Text className="transition group-hover:text-contrast overflow-hidden whitespace-nowrap text-ellipsis">
						{label}
					</Text>
				</div>
			</div>
		</Link>
	);
}
