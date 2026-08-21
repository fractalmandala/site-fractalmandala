import type { PageLoad } from './$types';
import { DEFAULT_DESCRIPTION, SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = () => ({
	seo: {
		title: SITE_NAME,
		description: DEFAULT_DESCRIPTION,
		path: '/',
		type: 'website',
		schema: 'WebSite'
	} satisfies SeoData
});
