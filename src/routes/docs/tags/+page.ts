import type { PageLoad } from './$types';
import { docsTags } from '$lib/docs';
import { SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = () => ({
	kind: 'tags',
	tags: docsTags,
	seo: {
		title: `Tags · ${SITE_NAME} Docs`,
		description: 'Browse the Fractal Maṇḍala library by topic and theme.',
		path: '/docs/tags/',
		type: 'website',
		schema: 'CollectionPage',
		breadcrumbs: [
			{ name: 'Home', path: '/' },
			{ name: 'Docs', path: '/docs/' }
		]
	} satisfies SeoData
});
