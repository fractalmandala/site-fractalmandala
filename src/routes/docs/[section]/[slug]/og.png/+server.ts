import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { docsSections, getDocument } from '$lib/docs';
import { createOgImage } from '$lib/og';
import { SITE_NAME } from '$lib/seo';

export const prerender = true;

export const entries: EntryGenerator = () =>
	docsSections.flatMap((section) =>
		section.posts.map((post) => ({ section: section.slug, slug: post.slug }))
	);

export const GET: RequestHandler = ({ params }) => {
	const doc = getDocument(params.section, params.slug);
	if (!doc) error(404, 'Document not found');

	return createOgImage({
		title: doc.title,
		description: doc.description || doc.summary,
		kicker: `${doc.section.replaceAll('-', ' ')} · ${SITE_NAME}`,
		tags: doc.tags
	});
};
