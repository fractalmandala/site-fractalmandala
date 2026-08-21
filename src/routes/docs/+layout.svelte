<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { closeDocsDrawer, docsDrawer } from '$lib/docs-drawer.svelte';
	import type { DocData } from '$lib/docs';

	let { data, children } = $props();

	let openSection = $state<string | null>(null);
	let currentDoc = $derived((page.data as { doc?: DocData }).doc);
	let isArticle = $derived(page.data.kind === 'article');

	$effect(() => {
		if (!isArticle) closeDocsDrawer();
	});

	const toggleSection = (section: string) => {
		openSection = openSection === section ? null : section;
	};
</script>

<svelte:head>
	<meta
		name="description"
		content={currentDoc?.description || 'A living library of essays, research, and notes.'}
	/>
</svelte:head>

<svelte:window onkeydown={(event) => event.key === 'Escape' && closeDocsDrawer()} />

<div
	class="docs"
	data-page-type={isArticle ? 'article' : 'landing'}
	data-drawer-open={isArticle && docsDrawer.open}
>
	<nav id="docs-navigation" class="docs-nav" aria-label="Documentation navigation">
		<div class="docs-nav-header">
			<a class="docs-nav-home" href={resolve('/docs')} onclick={closeDocsDrawer}>Docs</a>
			<span class="docs-nav-count">{data.sections.length} collections</span>
		</div>

		<div class="navtree">
			{#each data.sections as section (section.slug)}
				<section class="navtree-group" data-open={openSection === section.slug}>
					<button
						class="navtree-title docs-nav-trigger"
						type="button"
						aria-expanded={openSection === section.slug}
						onclick={() => toggleSection(section.slug)}
					>
						<span>{section.title}</span>
						<span class="docs-nav-chevron" aria-hidden="true">⌄</span>
					</button>

					{#if openSection === section.slug}
						<div class="navtree-sub">
							<a
								class="navtree-link docs-section-link"
								href={resolve(`/docs/${section.slug}`)}
								onclick={closeDocsDrawer}>Overview</a
							>
							{#each section.posts as post (post.slug)}
								<a
									class="navtree-link"
									href={resolve(`/docs/${section.slug}/${post.slug}`)}
									onclick={closeDocsDrawer}
									aria-current={currentDoc?.slug === post.slug &&
									currentDoc.section === section.slug
										? 'page'
										: undefined}>{post.title}</a
								>
							{/each}
						</div>
					{/if}
				</section>
			{/each}
		</div>
	</nav>

	<button
		class="docs-backdrop"
		type="button"
		aria-label="Close documentation navigation"
		onclick={closeDocsDrawer}
	></button>

	<main class="docs-main">
		{#if isArticle && currentDoc}
			<details class="docs-mobile-toc">
				<summary>On this page <span aria-hidden="true">⌄</span></summary>
				<ul class="toc-list">
					{#each currentDoc.headings as heading (heading.id)}
						<li data-depth={heading.level}>
							<a class="toc-link" href={`#${heading.id}`}>{heading.title}</a>
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{@render children()}
	</main>

	{#if isArticle && currentDoc}
		<aside class="docs-toc" aria-label="On this page">
			<div class="toc">
				<p class="toc-title">On this page</p>
				<ul class="toc-list">
					{#each currentDoc.headings as heading (heading.id)}
						<li>
							<a class="toc-link" data-depth={heading.level} href={`#${heading.id}`}
								>{heading.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</aside>
	{/if}
</div>
