import type { RequestHandler } from './$types';
import { docsSections, docsTags } from '$lib/docs';

const xmlEscape = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: RequestHandler = ({ url }) => {
	const pages = [
		'/',
		'/docs/',
		'/docs/tags/',
		...docsTags.map((tag) => `/docs/tags/${tag.slug}/`),
		...docsSections.flatMap((section) => [
			`/docs/${section.slug}/`,
			...section.posts.map((post) => `/docs/${section.slug}/${post.slug}/`)
		])
	];

	const body = pages
		.map((path) => `\t<url><loc>${xmlEscape(new URL(path, url.origin).toString())}</loc></url>`)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600'
			}
		}
	);
};
