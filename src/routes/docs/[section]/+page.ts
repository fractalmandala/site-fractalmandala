import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSection } from '$lib/docs';

export const load: PageLoad = ({ params }) => {
	const section = getSection(params.section);
	if (!section) error(404, 'Collection not found');

	return {
		kind: 'section',
		section
	};
};
