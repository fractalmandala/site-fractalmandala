import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getDocument } from '$lib/docs';
import { SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = ({ params }) => {
	const doc = getDocument(params.section, params.slug);
	if (!doc) error(404, 'Document not found');

	return {
		kind: 'article',
		doc,
		seo: {
			title: `${doc.title} · ${SITE_NAME} Docs`,
			description: doc.description || doc.summary,
			path: `/docs/${doc.section}/${doc.slug}/`,
			type: 'article',
			schema: 'Article',
			section: doc.section,
			tags: doc.tags,
			publishedTime: doc.date,
			breadcrumbs: [
				{ name: 'Home', path: '/' },
				{ name: 'Docs', path: '/docs/' },
				{ name: doc.section.replaceAll('-', ' '), path: `/docs/${doc.section}/` }
			]
		} satisfies SeoData
	};
};
