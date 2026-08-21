export type SeoType = 'website' | 'article';
export type SeoSchema = 'WebSite' | 'CollectionPage' | 'Article';

export type SeoBreadcrumb = {
	name: string;
	path: string;
};

export type SeoData = {
	title: string;
	description: string;
	path: string;
	type?: SeoType;
	schema?: SeoSchema;
	section?: string;
	tags?: string[];
	publishedTime?: string;
	modifiedTime?: string;
	noindex?: boolean;
	breadcrumbs?: SeoBreadcrumb[];
};

export const SITE_NAME = 'Fractal Maṇḍala';
export const DEFAULT_DESCRIPTION =
	'A living library of research, essays, and working notes on civilization, consciousness, history, and technology.';

export const DEFAULT_SEO: SeoData = {
	title: SITE_NAME,
	description: DEFAULT_DESCRIPTION,
	path: '/',
	type: 'website',
	schema: 'WebSite'
};

export const routePath = (path: string) => {
	if (!path || path === '/') return '/';
	const normalized = `/${path.replace(/^\/+|\/+$/g, '')}`;
	return `${normalized}/`;
};

export const absoluteUrl = (origin: string, path: string) =>
	new URL(routePath(path), origin).toString();

export const absoluteAssetUrl = (origin: string, path: string) => {
	const normalized = `/${path.replace(/^\/+|\/+$/g, '')}`;
	return new URL(normalized, origin).toString();
};

export const ogImagePath = (path: string) => {
	const normalized = routePath(path);
	return normalized === '/' ? '/og.png' : `${normalized}og.png`;
};

export const cleanDescription = (value: string) => value.replace(/\s+/g, ' ').trim().slice(0, 160);
