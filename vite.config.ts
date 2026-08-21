import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), sveltekitOG()]
});
