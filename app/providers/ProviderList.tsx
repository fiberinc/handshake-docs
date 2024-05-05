import { getProvidersWithDocs } from '~/lib/providers';
import { ProviderItem } from './ProviderItem';

export async function ProviderList() {
	const infos = await getProvidersWithDocs();

	const els = infos.map((info) => {
		return <ProviderItem key={info.id} {...info} />;
	});

	return <>{els}</>;
}
