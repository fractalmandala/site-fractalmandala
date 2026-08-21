import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { getSection, docsSections } from '$lib/docs';
import { createOgImage } from '$lib/og';
import { SITE_NAME } from '$lib/seo';

export const prerender = true;

export const entries: EntryGenerator = () =>
	docsSections.map((section) => ({ section: section.slug }));

export const GET: RequestHandler = ({ params }) => {
	const section = getSection(params.section);
	if (!section) error(404, 'Collection not found');

	return createOgImage({
		title: `${section.title} · ${SITE_NAME} Docs`,
		description: section.description,
		kicker: 'Collection',
		tags: [section.posts.length + ' posts']
	});
};
