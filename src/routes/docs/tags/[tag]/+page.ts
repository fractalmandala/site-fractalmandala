import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getTag } from '$lib/docs';
import { SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = ({ params }) => {
	const tag = getTag(params.tag);
	if (!tag) error(404, 'Tag not found');

	return {
		kind: 'tag',
		tag,
		seo: {
			title: `${tag.label} · ${SITE_NAME} Docs`,
			description: `Posts tagged ${tag.label} in the Fractal Maṇḍala library.`,
			path: `/docs/tags/${tag.slug}/`,
			type: 'website',
			schema: 'CollectionPage',
			tags: [tag.label],
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Docs', path: '/docs/' },
				{ name: 'Tags', path: '/docs/tags/' }
			]
		} satisfies SeoData
	};
};
