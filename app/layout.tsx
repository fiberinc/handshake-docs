import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import { constructMetadata } from '~/lib/construct-metadata';
import '~/styles/globals.css';
import { DarkModeScript } from '~/ui/dark-mode';

export const metadata = constructMetadata();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤝</text></svg>"
				/>
			</head>
			<body className="bg-background text-base text-default m-auto selection:bg-fuchsia-300 selection:text-fuchsia-900 lg:min-h-screen">
				<Toaster />
				<>{children}</>
				<Analytics />
				<DarkModeScript />
			</body>
		</html>
	);
}
