<script lang="ts">
	import { page } from '$app/state';
	import {
		absoluteAssetUrl,
		absoluteUrl,
		cleanDescription,
		DEFAULT_DESCRIPTION,
		DEFAULT_SEO,
		ogImagePath,
		routePath,
		SITE_NAME,
		type SeoData
	} from '$lib/seo';

	let {
		title = DEFAULT_SEO.title,
		description = DEFAULT_DESCRIPTION,
		path = '/',
		type = 'website',
		schema = 'WebSite',
		section,
		tags = [],
		publishedTime,
		modifiedTime,
		noindex = false,
		breadcrumbs = []
	}: SeoData = $props();

	let siteUrl = $derived((page.data as { siteUrl?: string }).siteUrl || page.url.origin);
	let canonicalPath = $derived(routePath(path || page.url.pathname));
	let canonicalUrl = $derived(absoluteUrl(siteUrl, canonicalPath));
	let imageUrl = $derived(absoluteAssetUrl(siteUrl, ogImagePath(canonicalPath)));
	let metaDescription = $derived(cleanDescription(description || DEFAULT_DESCRIPTION));
	let breadcrumbItems = $derived(
		[...breadcrumbs, { name: title, path: canonicalPath }].filter(
			(item, index, items) => items.findIndex((candidate) => candidate.path === item.path) === index
		)
	);

	let jsonLd = $derived(
		JSON.stringify(
			[
				{
					'@context': 'https://schema.org',
					'@type': schema,
					'@id': canonicalUrl,
					url: canonicalUrl,
					name: title,
					description: metaDescription,
					isPartOf: {
						'@type': 'WebSite',
						name: SITE_NAME,
						url: absoluteUrl(siteUrl, '/')
					}
				},
				...(schema === 'Article'
					? [
							{
								'@context': 'https://schema.org',
								'@type': 'Article',
								'@id': `${canonicalUrl}#article`,
								headline: title,
								description: metaDescription,
								mainEntityOfPage: canonicalUrl,
								articleSection: section,
								keywords: tags.length ? tags.join(', ') : undefined,
								datePublished: publishedTime,
								dateModified: modifiedTime || publishedTime,
								author: { '@type': 'Organization', name: SITE_NAME },
								publisher: { '@type': 'Organization', name: SITE_NAME },
								image: imageUrl
							}
						]
					: []),
				...(breadcrumbItems.length > 1
					? [
							{
								'@context': 'https://schema.org',
								'@type': 'BreadcrumbList',
								itemListElement: breadcrumbItems.map((item, index) => ({
									'@type': 'ListItem',
									position: index + 1,
									name: item.name,
									item: absoluteUrl(siteUrl, item.path)
								}))
							}
						]
					: [])
			].map((value) => JSON.parse(JSON.stringify(value)))
		)
			.replace(/</g, '\\u003c')
			.replace(/>/g, '\\u003e')
			.replace(/&/g, '\\u0026')
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={metaDescription} />
	<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={title} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={title} />

	{#if type === 'article'}
		{#if section}<meta property="article:section" content={section} />{/if}
		{#if publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
		{#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}<\\/script>`}
</svelte:head>
