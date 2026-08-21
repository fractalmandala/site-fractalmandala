<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="home-docs docs-landing">
	<header class="docs-landing-header">
		<p class="eyebrow">Fractal Maṇḍala</p>
		<h1>A living library of ideas</h1>
		<p>
			Research, essays, and working notes on civilization, consciousness, history, and technology.
		</p>
		<a class="button" href={resolve('/docs')}>Explore the documentation</a>
	</header>

	<section class="home-docs-section" aria-labelledby="latest-posts-title">
		<header class="home-section-heading">
			<p class="eyebrow">Latest</p>
			<h2 id="latest-posts-title">Latest posts</h2>
		</header>

		<div class="card-grid docs-card-grid">
			{#each data.latestPosts as post (post.slug)}
				<a class="card docs-card" href={resolve(`/docs/${post.section}/${post.slug}`)}>
					<div class="docs-card-kicker">
						{post.tags.length ? post.tags.slice(0, 2).join(' · ') : 'Latest post'}
					</div>
					<h2>{post.title}</h2>
					<p>{post.description || post.summary}</p>
					<span class="docs-card-link">Read post <span aria-hidden="true">→</span></span>
				</a>
			{/each}
		</div>
	</section>

	<section class="home-docs-section" aria-labelledby="collections-title">
		<header class="home-section-heading">
			<p class="eyebrow">Library</p>
			<h2 id="collections-title">Browse collections</h2>
		</header>

		<div class="card-grid docs-card-grid">
			{#each data.sections as section (section.slug)}
				<a class="card docs-card" href={resolve(`/docs/${section.slug}`)}>
					<div class="docs-card-kicker">{section.posts.length} posts</div>
					<h2>{section.title}</h2>
					<p>{section.description}</p>
					<span class="docs-card-link">Browse collection <span aria-hidden="true">→</span></span>
				</a>
			{/each}
		</div>
	</section>
</section>
