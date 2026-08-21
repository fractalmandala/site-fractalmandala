import { createOgImage } from '$lib/og';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '$lib/seo';

export const prerender = true;

export const GET = () =>
	createOgImage({
		title: `Documentation · ${SITE_NAME}`,
		description: DEFAULT_DESCRIPTION,
		kicker: 'Documentation'
	});
