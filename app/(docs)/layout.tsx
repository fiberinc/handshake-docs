import { PropsWithChildren } from 'react';
import { Footer } from '~/ui/Footer';
import { Navbar } from '~/ui/Navbar';
import { Sidebar } from './Sidebar';

export default async function LayoutSidebar({ children }: PropsWithChildren) {
	return (
		<div className="flex flex-col">
			<div className="fixed w-full z-20">
				<Navbar />
			</div>
			<div className="h-[var(--header-height)] " />
			<div className="flex flex-row gap-16 justify-start p-7 pt-10 items-start">
				<aside className="w-[250px] bottom-16 __shrink-0 h-full grow-0 flex overflow-scroll">
					<div className="block w-full __max-h-[calc(100vh_-_var(--header-height))] z-10">
						<Sidebar />
					</div>
				</aside>
				<div className="flex pb-16 flex-1 overflow-hidden lg:pr-10">
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
}
