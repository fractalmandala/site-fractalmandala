<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<section class="docs-landing">
	<header class="docs-landing-header">
		<p class="eyebrow">Fractal Maṇḍala / Library</p>
		<h1>Documentation</h1>
		<p>Research, essays, and working notes arranged as a living library.</p>
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
