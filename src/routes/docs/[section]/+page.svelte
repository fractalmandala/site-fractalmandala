<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<section class="docs-landing docs-landing-container">
	<header class="docs-landing-header">
		<p class="eyebrow">Collection / {data.section.posts.length} posts</p>
		<h1>{data.section.title}</h1>
		<p>{data.section.description}</p>
	</header>

	<div class="card-grid docs-card-grid">
		{#each data.section.posts as post (post.slug)}
			<a class="card docs-card" href={resolve(`/docs/${data.section.slug}/${post.slug}`)}>
				<div class="docs-card-kicker">
					{post.tags.length ? post.tags.slice(0, 2).join(' · ') : 'Document'}
				</div>
				<h2>{post.title}</h2>
				<p>{post.summary || 'Read this document in the collection.'}</p>
				<span class="docs-card-link">Read post <span aria-hidden="true">→</span></span>
			</a>
		{/each}
	</div>
</section>
