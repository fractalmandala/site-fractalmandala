import type { Component } from 'svelte';

export type DocHeading = {
	level: 2 | 3;
	title: string;
	id: string;
};

export type DocSummary = {
	section: string;
	slug: string;
	path: string;
	title: string;
	description: string;
	tags: string[];
	summary: string;
	date?: string;
};

export type DocData = DocSummary & {
	source: string;
	headings: DocHeading[];
};

export type DocsSection = {
	slug: string;
	title: string;
	description: string;
	posts: DocSummary[];
};

export type DocTag = {
	slug: string;
	label: string;
	count: number;
	posts: DocSummary[];
};

type MarkdownModule = {
	default: Component;
	metadata?: Record<string, unknown>;
};

const markdownModules = import.meta.glob('/src/docs/**/*.md', {
	eager: true
}) as Record<string, MarkdownModule>;

const markdownSources = import.meta.glob('/src/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const pathToRoute = (filePath: string) =>
	filePath.replace(/^.*\/src\/docs\//, '').replace(/\.md$/i, '');

const titleFromSlug = (slug: string) =>
	slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

const stringValue = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const tagsValue = (value: unknown) => {
	if (!Array.isArray(value)) return [];

	return value
		.filter((tag): tag is string => typeof tag === 'string')
		.map((tag) => tag.trim())
		.filter(Boolean);
};

export const tagSlug = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-') || 'tag';

const frontmatterValue = (value: string) => value.trim().replace(/^['"]|['"]$/g, '');

const metadataFromSource = (source: string) => {
	const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/i)?.[1];
	if (!frontmatter) return {};

	const metadata: Record<string, unknown> = {};
	let activeList: string | null = null;

	for (const line of frontmatter.split('\n')) {
		const listItem = line.match(/^\s+-\s+(.*)$/);
		if (listItem && activeList) {
			const current = Array.isArray(metadata[activeList])
				? (metadata[activeList] as unknown[])
				: [];
			metadata[activeList] = [...current, frontmatterValue(listItem[1])];
			continue;
		}

		const field = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
		if (!field) continue;

		const [, key, value] = field;
		if (value) {
			metadata[key] = frontmatterValue(value);
			activeList = null;
		} else {
			metadata[key] = [];
			activeList = key;
		}
	}

	return metadata;
};

const sourceWithoutFrontmatter = (source: string) =>
	source.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '').trim();

const inlineText = (value: string) =>
	value
		.replace(/!?(\[[^\]]*\])\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, '')
		.replace(/[`*_~]/g, '')
		.trim();

const slugifyHeading = (value: string) =>
	inlineText(value)
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-') || 'section';

const headingsFromSource = (source: string): DocHeading[] => {
	const counts = new Map<string, number>();
	const headings: DocHeading[] = [];

	for (const line of sourceWithoutFrontmatter(source).split('\n')) {
		const match = line.match(/^\s{0,3}(#{2,3})\s+(.+?)\s*#*\s*$/);
		if (!match) continue;

		const level = match[1].length as 2 | 3;
		const title = inlineText(match[2]);
		const baseId = slugifyHeading(title);
		const count = counts.get(baseId) ?? 0;
		counts.set(baseId, count + 1);

		headings.push({
			level,
			title,
			id: count === 0 ? baseId : `${baseId}-${count + 1}`
		});
	}

	return headings;
};

const summaryFromSource = (source: string, description: string) => {
	if (description) return description;

	const paragraph = sourceWithoutFrontmatter(source)
		.split(/\n\s*\n/)
		.map((block) => block.replace(/\s+/g, ' ').trim())
		.find((block) => block && !block.startsWith('#') && !block.startsWith('```'));

	return paragraph ? inlineText(paragraph).slice(0, 180) : '';
};

const isIndexFile = (filePath: string) => /\/(index|contents)\.md$/i.test(filePath);

const metadataFor = (filePath: string) => metadataFromSource(markdownSources[filePath] ?? '');

const summaryFor = (filePath: string): DocSummary | null => {
	const route = pathToRoute(filePath);
	const [section, ...slugParts] = route.split('/');
	const slug = slugParts.join('/');
	if (!section || !slug || isIndexFile(filePath)) return null;

	const metadata = metadataFor(filePath);
	const source = markdownSources[filePath] ?? '';
	const title = stringValue(metadata.title) || titleFromSlug(slug.split('/').at(-1) ?? slug);
	const description = stringValue(metadata.description);

	return {
		section,
		slug,
		path: filePath,
		title,
		description,
		tags: tagsValue(metadata.tags),
		summary: summaryFromSource(source, description),
		date: stringValue(metadata.date) || undefined
	};
};

const summaries = Object.keys(markdownSources)
	.map(summaryFor)
	.filter((summary): summary is DocSummary => summary !== null);

const indexForSection = (section: string) =>
	Object.keys(markdownSources).find((filePath) => {
		const route = pathToRoute(filePath);
		return route === `${section}/INDEX`;
	});

const sectionSlugs = [...new Set(summaries.map((summary) => summary.section))];

export const docsSections: DocsSection[] = sectionSlugs
	.map((slug) => {
		const indexPath = indexForSection(slug);
		const metadata = indexPath ? metadataFor(indexPath) : {};
		const posts = summaries
			.filter((summary) => summary.section === slug)
			.sort((a, b) => a.title.localeCompare(b.title));

		return {
			slug,
			title: stringValue(metadata.title) || titleFromSlug(slug),
			description:
				stringValue(metadata.description) || `${posts.length} documents in this collection.`,
			posts
		};
	})
	.sort((a, b) => a.title.localeCompare(b.title));

const tagEntries = new Map<string, { label: string; posts: DocSummary[] }>();

for (const section of docsSections) {
	for (const post of section.posts) {
		const seen = new Set<string>();
		for (const label of post.tags) {
			const slug = tagSlug(label);
			if (seen.has(slug)) continue;
			seen.add(slug);

			const entry = tagEntries.get(slug);
			if (entry) {
				entry.posts.push(post);
			} else {
				tagEntries.set(slug, { label, posts: [post] });
			}
		}
	}
}

export const docsTags: DocTag[] = [...tagEntries.entries()]
	.map(([slug, entry]) => ({
		slug,
		label: entry.label,
		count: entry.posts.length,
		posts: entry.posts.sort((a, b) => a.title.localeCompare(b.title))
	}))
	.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

const summaryByRoute = new Map(
	summaries.map((summary) => [`${summary.section}/${summary.slug}`, summary])
);

export const getSection = (slug: string) => docsSections.find((section) => section.slug === slug);

export const getTag = (slug: string) => docsTags.find((tag) => tag.slug === slug);

export const getDocument = (section: string, slug: string): DocData | null => {
	const summary = summaryByRoute.get(`${section}/${slug}`);
	if (!summary) return null;

	const source = markdownSources[summary.path] ?? '';
	return {
		...summary,
		source,
		headings: headingsFromSource(source)
	};
};

export const getDocumentComponent = (path: string) => markdownModules[path]?.default ?? null;
