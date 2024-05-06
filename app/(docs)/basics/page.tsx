import { Metadata } from 'next';
import {
	PageFromMdxAt,
	getRelativePath,
	makeMetadataFromMdxAt,
} from '~/ui/PageFromMdxAt';

const CONTENT_PATH = getRelativePath(__dirname) + '/content.mdx';

export async function generateMetadata(): Promise<Metadata> {
	return await makeMetadataFromMdxAt(CONTENT_PATH);
}

export default async function Page() {
	return <PageFromMdxAt path={CONTENT_PATH} />;
}
