import { createOgImage } from '$lib/og';
import { SITE_NAME } from '$lib/seo';

export const prerender = true;

export const GET = () =>
	createOgImage({
		title: `Tags · ${SITE_NAME} Docs`,
		description: 'Browse the Fractal Maṇḍala library by topic and theme.',
		kicker: 'Documentation topics'
	});
