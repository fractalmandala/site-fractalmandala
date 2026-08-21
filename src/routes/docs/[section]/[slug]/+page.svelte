<script lang="ts">
	import { resolve } from '$app/paths';
	import { getDocumentComponent, tagSlug } from '$lib/docs';

	let { data } = $props();
	let Content = $derived(getDocumentComponent(data.doc.path));
</script>

<article class="docs-article">
	<header class="docs-article-header">
		<a class="docs-breadcrumb" href={resolve(`/docs/${data.doc.section}`)}
			>{data.doc.section.replaceAll('-', ' ')}</a
		>
		<h1>{data.doc.title}</h1>
		{#if data.doc.description}
			<p class="docs-article-description">{data.doc.description}</p>
		{/if}
		{#if data.doc.tags.length}
			<div class="docs-tags" aria-label="Tags">
				{#each data.doc.tags as tag (tag)}
					<a class="badge" data-doc-tag href={resolve(`/docs/tags/${tagSlug(tag)}`)}>{tag}</a>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose docs-prose">
		{#if Content}
			<Content />
		{:else}
			<p>Unable to render this document.</p>
		{/if}
	</div>
</article>
