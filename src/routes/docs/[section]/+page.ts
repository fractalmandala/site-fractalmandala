import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSection } from '$lib/docs';
import { SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = ({ params }) => {
	const section = getSection(params.section);
	if (!section) error(404, 'Collection not found');

	return {
		kind: 'section',
		section,
		seo: {
			title: `${section.title} · ${SITE_NAME} Docs`,
			description: section.description,
			path: `/docs/${section.slug}/`,
			type: 'website',
			schema: 'CollectionPage',
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Docs', path: '/docs/' }
			]
		} satisfies SeoData
	};
};
