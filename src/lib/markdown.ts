type MarkdownNode = {
	type?: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: MarkdownNode[];
};

type RemarkNode = MarkdownNode & {
	type?: string;
};

const textFromNode = (node: MarkdownNode): string =>
	node.value ?? node.children?.map(textFromNode).join('') ?? '';

const headingId = (value: string) =>
	value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-') || 'section';

export const addHeadingIds = () => (tree: MarkdownNode) => {
	const counts = new Map<string, number>();

	const visit = (node: MarkdownNode) => {
		if (node.type === 'element' && /^h[23]$/.test(node.tagName ?? '')) {
			const baseId = headingId(textFromNode(node));
			const count = counts.get(baseId) ?? 0;
			counts.set(baseId, count + 1);
			node.properties = {
				...node.properties,
				id: count === 0 ? baseId : `${baseId}-${count + 1}`
			};
		}

		node.children?.forEach(visit);
	};

	visit(tree);
};

const escapeUnsafeText = (value: string) =>
	value
		.replaceAll('{', '&#123;')
		.replaceAll('}', '&#125;')
		.replace(/<(?=[^a-zA-Z/!?])/g, '&lt;');

const escapeUnsafeHtml = (value: string) => value.replace(/<(?=[^a-zA-Z/!?])/g, '&lt;');

export const escapeLegacyMarkdown = () => (tree: RemarkNode) => {
	const visit = (node: RemarkNode) => {
		if (node.type === 'text' && node.value) node.value = escapeUnsafeText(node.value);
		if (node.type === 'html' && node.value) node.value = escapeUnsafeHtml(node.value);
		node.children?.forEach(visit);
	};

	visit(tree);
};

const legacyHtmlDocuments = new Set([
	'v30-comparativestudiesofcollapse.md',
	'v71-richardmilescarthagemustbedestroyedtheriseandfallofanancient.md',
	'v72-commentarytraditionsandtheevolutionofpremodernreligiousandph.md',
	'v78-thepowerconfigurationsofthecentralcivilizationworldsystemint.md',
	'v80-contemporarycontextsofconfucianism.md',
	'v83-stthomasaquinasandthethirdhellenizationperiod.md',
	'v91-niccollongobardoandtheearlymodernencounterofeuropewithchina.md'
]);

export const sanitizeLegacyMarkdown = {
	markup: ({ content, filename }: { content: string; filename?: string }) => {
		const fileName = filename?.split(/[\\/]/).at(-1);
		if (!fileName || !legacyHtmlDocuments.has(fileName)) return;

		return {
			code: content.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
		};
	}
};

/**
 * mdsvex currently emits Svelte 4 module-script syntax for frontmatter.
 * Normalize the generated component before Svelte 5 compiles it so every
 * document keeps its metadata without producing a deprecation warning.
 */
export const modernizeMDSvexModuleScript = {
	markup: ({ content, filename }: { content: string; filename?: string }) => {
		if (!filename?.endsWith('.md') && !filename?.endsWith('.svx')) return;

		const code = content.replaceAll('<script context="module">', '<script module>');
		if (code === content) return;

		return { code };
	}
};
