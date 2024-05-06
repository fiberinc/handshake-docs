export function Footer() {
	return (
		<footer className="bg-foreground border-t">
			<div className="text-mono text-md m-auto flex flex-row flex-wrap justify-between gap-10 px-3 py-10 font-medium md:px-5 lg:px-8">
				<div>
					A project by{' '}
					<a href="https://fiber.dev" className="underline">
						Fiber
					</a>
				</div>
				<a
					href="https://twitter.com/fiber_dev"
					className="hover:text-link"
					target="_blank"
				>
					@FIBER_dev
				</a>
				{/* <div>🫱🏻‍🫲🏽</div>
				<div>© 2024 Portalform Inc.</div> */}
				<a
					href={'https://github.com/fiberinc/handshake-docs'}
					className="hover:text-link"
					target="_blank"
				>
					Docs Source
				</a>
			</div>
		</footer>
	);
}
