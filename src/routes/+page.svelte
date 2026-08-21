<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="home-docs docs-landing docs-landing-container">
	<section class="home-docs-section" aria-labelledby="latest-posts-title">
		<header class="home-section-heading">
			<p class="eyebrow">Latest</p>
		</header>

		<div class="card-grid docs-card-grid">
			{#each data.latestPosts as post (post.slug)}
				<a class="card docs-card" href={resolve(`/docs/${post.section}/${post.slug}`)}>
					<div class="box">
					<h2>{post.title}</h2>
					<p>{post.description || post.summary}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section class="home-docs-section" aria-labelledby="collections-title">
		<header class="home-section-heading">
			<p class="eyebrow">Library</p>
		</header>

		<div class="card-grid docs-card-grid">
			{#each data.sections as section (section.slug)}
				<a class="card docs-card" href={resolve(`/docs/${section.slug}`)}>
					<div class="box">
					<div class="docs-card-kicker">{section.posts.length} posts</div>
					<h2>{section.title}</h2>
					<p>{section.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</section>
