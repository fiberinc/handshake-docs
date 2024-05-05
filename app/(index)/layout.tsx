import { constructMetadata } from '~/lib/construct-metadata';
import '~/styles/globals.css';
import { Footer } from '~/ui/Footer';
import { Navbar } from '~/ui/Navbar';

export const metadata = constructMetadata();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-16">
			<Navbar />
			<div className="m-auto w-full flex-1 justify-start px-3 md:px-5  lg:w-[900px] lg:px-0">
				{children}
			</div>
			<Footer />
		</div>
	);
}
