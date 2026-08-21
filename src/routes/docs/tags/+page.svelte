<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	let sortMode = $state<'count' | 'alpha'>('count');
	let sortedTags = $derived(
		[...data.tags].sort((a, b) =>
			sortMode === 'count'
				? b.count - a.count || a.label.localeCompare(b.label)
				: a.label.localeCompare(b.label)
		)
	);
</script>

<section class="docs-landing docs-landing-container docs-tags-page">
	<header class="docs-landing-header">
		<p class="eyebrow">Documentation / Topics</p>
		<div class="docs-landing-title-row">
			<h1>Tags</h1>
			<button
				class="button sm ghost docs-sort-toggle"
				type="button"
				aria-pressed={sortMode === 'alpha'}
				onclick={() => (sortMode = sortMode === 'count' ? 'alpha' : 'count')}
			>
				{sortMode === 'count' ? 'Sort A–Z' : 'Sort by posts'}
			</button>
		</div>
		<p>Browse every topic in the library, ordered by the number of posts.</p>
	</header>

	<div class="card-grid docs-card-grid docs-tag-grid">
		{#each sortedTags as tag (tag.slug)}
			<a class="card docs-tag-card" href={resolve(`/docs/tags/${tag.slug}`)}>
				<strong>{tag.label}</strong>
				<span>{tag.count} post{tag.count === 1 ? '' : 's'}</span>
			</a>
		{/each}
	</div>
</section>
