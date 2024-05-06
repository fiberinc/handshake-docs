import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { getProviders } from '~/lib/providers';
import { ROUTES } from '~/lib/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const headersList = headers();
	const domain = headersList.get('host') as string;

	return [
		{
			url: `https://${domain}`,
			lastModified: new Date(),
		},
		{
			url: `https://${domain}${ROUTES.basics}`,
			lastModified: new Date(),
		},
		{
			url: `https://${domain}${ROUTES.reference}`,
			lastModified: new Date(),
		},
		{
			url: `https://${domain}${ROUTES.framework.next}`,
			lastModified: new Date(),
		},
		{
			url: `https://${domain}/changelog`,
			lastModified: new Date(),
		},
		...(await getProviders()).map((f) => ({
			url: `https://${domain}${ROUTES.provider(f.id)}`,
			lastModified: new Date(),
		})),
	];
}
