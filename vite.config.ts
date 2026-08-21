import { mdsvex } from 'mdsvex';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { addHeadingIds, escapeLegacyMarkdown, sanitizeLegacyMarkdown } from './src/lib/markdown.ts';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [
				vitePreprocess(),
				sanitizeLegacyMarkdown,
				mdsvex({
					extensions: ['.svx', '.md'],
					remarkPlugins: [escapeLegacyMarkdown],
					rehypePlugins: [addHeadingIds]
				})
			],
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			extensions: ['.svelte', '.svx', '.md']
		}),
		sveltekitOG()
	]
});
