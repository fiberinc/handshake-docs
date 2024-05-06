import { getProviders } from '~/lib/providers';
import { SidebarInner } from './inner';

export async function Sidebar() {
	const providers = await getProviders();

	return <SidebarInner providers={providers} />;
}
