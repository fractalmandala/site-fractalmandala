import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import {
	addHeadingIds,
	escapeLegacyMarkdown,
	modernizeMDSvexModuleScript,
	sanitizeLegacyMarkdown
} from './src/lib/markdown.ts';

const legacyDocsWarningCodes = new Set([
	'a11y_img_redundant_alt',
	'a11y_missing_attribute',
	'a11y_missing_content',
	'element_implicitly_closed',
	'script_context_deprecated'
]);

const onwarn = (warning, defaultHandler) => {
	if (warning.filename?.includes('src/docs/') && legacyDocsWarningCodes.has(warning.code)) return;

	defaultHandler(warning);
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sanitizeLegacyMarkdown,
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [escapeLegacyMarkdown],
			rehypePlugins: [addHeadingIds]
		}),
		modernizeMDSvexModuleScript
	],
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in Svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	onwarn,
	extensions: ['.svelte', '.svx', '.md'],
	kit: {
		adapter: adapter()
	}
};

export default config;
