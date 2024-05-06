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
			<div className="flex flex-row -h-[100vh] gap-10 justify-start  items-start">
				<aside className="w-[260px] bottom-16 __shrink-0 h-full grow-0 flex ">
					<div className="block max-h-[calc(100vh_-_var(--header-height))] z-10 overflow-scroll fixed">
						<div className="p-7 pb-0">
							<Sidebar />
						</div>
					</div>
				</aside>
				<div className="pb-16 p-7 flex-1 overflow-hidden lg:pr-10 w-full black">
					{children}
				</div>
			</div>
			<div className="z-20">
				<Footer />
			</div>
		</div>
	);
}
