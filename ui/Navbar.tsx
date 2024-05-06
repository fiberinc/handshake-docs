'use client';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiHandshakeDuotone } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { REPO_URL } from '~/lib/routes';

export function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="bg-foreground/70 relative backdrop-blur-md border-b">
			{/* <div className="absolute left-6 top-[10px] text-[30px]">🫱🏻‍🫲🏽</div> */}
			<div className="m-auto flex h-[var(--header-height)] flex-row items-center justify-between px-3 md:px-5 lg:px-10">
				<Link href="/">
					<h1 className="text-[16px] flex gap-3 items-center">
						<PiHandshakeDuotone className="w-6 h-6 text-contrast" />
						<span className="text-contrast text-lg font-semibold">
							Handshake
						</span>{' '}
						{/* 🫱🏻‍🫲🏽&nbsp;&nbsp; */}
						<span>–</span>
						<span>OAuth made easy</span>
					</h1>
				</Link>
				<div className="flex flex-row gap-10">
					<Link
						href="/providers"
						className={twMerge(
							(pathname.startsWith('/providers') ||
								pathname.startsWith('/frameworks')) &&
								'text-contrast underline-offset-4 underline'
						)}
					>
						Docs
					</Link>
					<a
						href={REPO_URL}
						target="_blank"
						className="text-contrast font-medium flex gap-2 items-center"
					>
						<GitHubLogoIcon className="w-5 h-5" />
						Github
					</a>
				</div>
			</div>
		</nav>
	);
}
