import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) =>
	new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', url.origin)}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
