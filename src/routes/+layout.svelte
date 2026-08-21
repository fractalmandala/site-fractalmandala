<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import CloseIcon from '$lib/icons/close.svelte';
	import MenuIcon from '$lib/icons/menu.svelte';
	import { docsDrawer, toggleDocsDrawer } from '$lib/docs-drawer.svelte';
	import '$lib/styles/index.sass';
	import 'fractalthemer/styles.css';
	import { AuraBackground, ThemePicker, themeState } from 'fractalthemer';

	let { children } = $props();
	let isDocsArticle = $derived(
		page.url.pathname.startsWith('/docs/') && (page.data as { kind?: string }).kind === 'article'
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AuraBackground />

<div class="app-shell">
	<header class="app-header">
		<a
			class="site-brand"
			href={resolve('/')}
			data-theme-mode={themeState.isDark ? 'dark' : 'light'}
		>
			<img class="logomotif" src="/images/logomotif.png" alt="Fractal Mandala" />
			<img class="logotype logotype-light" src="/images/logotype-black.png" alt="Fractal Mandala" />
			<img class="logotype logotype-dark" src="/images/logotype-white.png" alt="Fractal Mandala" />
		</a>

		<div class="header-actions">
			{#if isDocsArticle}
				<button
					class="is-icon docs-menu-button"
					type="button"
					aria-label={docsDrawer.open
						? 'Close documentation navigation'
						: 'Open documentation navigation'}
					aria-controls="docs-navigation"
					aria-expanded={docsDrawer.open}
					onclick={toggleDocsDrawer}
				>
					{#if docsDrawer.open}
						<CloseIcon />
					{:else}
						<MenuIcon />
					{/if}
				</button>
			{/if}
			<ThemePicker />
		</div>
	</header>

	<main class="app-main">
		{@render children()}
	</main>
</div>
