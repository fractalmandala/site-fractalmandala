<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<section class="docs-landing docs-landing-container docs-tag-page">
	<header class="docs-landing-header">
		<a class="docs-breadcrumb" href={resolve('/docs/tags')}>All tags</a>
		<p class="eyebrow">Topic / {data.tag.count} posts</p>
		<h1>{data.tag.label}</h1>
		<p>Posts filed under {data.tag.label}.</p>
	</header>

	<div class="card-grid docs-card-grid">
		{#each data.tag.posts as post (post.slug)}
			<a class="card docs-card" href={resolve(`/docs/${post.section}/${post.slug}`)}>
				<div class="docs-card-kicker">{post.section.replaceAll('-', ' ')}</div>
				<h2>{post.title}</h2>
				<p>{post.summary || 'Read this document in the collection.'}</p>
				<span class="docs-card-link">Read post <span aria-hidden="true">→</span></span>
			</a>
		{/each}
	</div>
</section>
