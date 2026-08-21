import { error } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';
import { docsTags, getTag } from '$lib/docs';
import { createOgImage } from '$lib/og';
import { SITE_NAME } from '$lib/seo';

export const prerender = true;

export const entries: EntryGenerator = () => docsTags.map((tag) => ({ tag: tag.slug }));

export const GET: RequestHandler = ({ params }) => {
	const tag = getTag(params.tag);
	if (!tag) error(404, 'Tag not found');

	return createOgImage({
		title: `${tag.label} · ${SITE_NAME} Docs`,
		description: `Posts tagged ${tag.label} in the Fractal Maṇḍala library.`,
		kicker: 'Documentation topic',
		tags: [tag.label, `${tag.count} posts`]
	});
};
