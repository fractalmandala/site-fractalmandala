import type { PageLoad } from './$types';
import { docsSections } from '$lib/docs';
import { DEFAULT_DESCRIPTION, SITE_NAME, type SeoData } from '$lib/seo';

export const load: PageLoad = () => {
	const latestSection = docsSections.find((section) => section.slug === 'latest');

	return {
		latestPosts: latestSection?.posts.slice(0, 10) ?? [],
		sections: docsSections,
		seo: {
			title: SITE_NAME,
			description: DEFAULT_DESCRIPTION,
			path: '/',
			type: 'website',
			schema: 'WebSite'
		} satisfies SeoData
	};
};
