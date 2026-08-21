import { readdir, readFile, rm } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { createIndex, close } from 'pagefind';

const docsRoot = join(process.cwd(), 'src', 'docs');
const outputPath = join(process.cwd(), 'static', 'pagefind');

const walk = async (directory) => {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const entryPath = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(entryPath)));
		else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) files.push(entryPath);
	}

	return files;
};

const parseFrontmatter = (source) => {
	const block = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/i)?.[1];
	const metadata = {};
	if (!block) return metadata;

	for (const line of block.split('\n')) {
		const field = line.match(/^([a-zA-Z][\w-]*):\s*(.*)$/);
		if (!field) continue;
		const value = field[2].trim().replace(/^['"]|['"]$/g, '');
		metadata[field[1]] = value;
	}

	return metadata;
};

const stripMarkdown = (source) =>
	source
		.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/i, '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/^\s*#{1,6}\s*/gm, '')
		.replace(/[>*_`~]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const files = await walk(docsRoot);
const { index, errors } = await createIndex({ forceLanguage: 'en' });
if (!index) throw new Error(errors.join('\n') || 'Pagefind failed to create an index');

try {
	await rm(outputPath, { recursive: true, force: true });

	for (const filePath of files) {
		const relativePath = relative(docsRoot, filePath).split(sep).join('/');
		if (/^(?:[^/]+)\/(?:index|contents)\.md$/i.test(relativePath)) continue;

		const [section, ...slugParts] = relativePath.replace(/\.md$/i, '').split('/');
		const slug = slugParts.join('/');
		if (!section || !slug) continue;

		const source = await readFile(filePath, 'utf8');
		const metadata = parseFrontmatter(source);
		const title = metadata.title || slug.split('/').at(-1).replace(/-/g, ' ');
		const description = metadata.description || '';
		const content = `${title}\n${description}\n${stripMarkdown(source)}`;

		await index.addCustomRecord({
			url: `/docs/${section}/${slug}/`,
			content,
			language: 'en',
			meta: {
				title,
				section,
				description
			}
		});
	}

	await index.writeFiles({ outputPath });
	console.log(`Pagefind indexed ${files.length} Markdown files into ${outputPath}`);
} finally {
	await close();
}
