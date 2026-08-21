import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getDocument } from '$lib/docs';

export const load: PageLoad = ({ params }) => {
	const doc = getDocument(params.section, params.slug);
	if (!doc) error(404, 'Document not found');

	return {
		kind: 'article',
		doc
	};
};
