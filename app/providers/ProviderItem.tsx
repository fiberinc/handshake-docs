// import { Code } from 'bright'

import { Text } from '~/ui/Text';
import Link from 'next/link';
import { ProviderInfo } from '~/lib/providers';
import { MdxRender } from './MdxRender';

export function ProviderItem(info: ProviderInfo) {
	return (
		<div key={info.id} id={info.id}>
			<div>
				<Link
					href={`/providers/#${info.id}`}
					className="inline-block w-fit gap-3"
				>
					<div className="group relative flex flex-row h-[50px] w-fit cursor-pointer items-center gap-3">
						<div className="absolute left-[-35px] text-[24px] font-bold opacity-10 transition group-hover:opacity-40">
							#
						</div>
						{info.hasLogo && (
							<div className="flex-inline h-[35px] w-[35px] items-center justify-center rounded-lg">
								<img src={`/images/logos/${info.id}.svg`} alt={`source logo`} />
							</div>
						)}
						<Text
							variant="h2"
							className="text-contrast text-page-header font-medium"
						>
							{info.title}
						</Text>
					</div>
				</Link>
			</div>
			<br />

			<MdxRender {...info.serialized} />
		</div>
	);
}
