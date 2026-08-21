<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve as svelteResolve } from '$app/paths';

	type PagefindResult = {
		url: string;
		excerpt?: string;
		meta?: {
			title?: string;
			section?: string;
			description?: string;
		};
	};

	type PagefindModule = {
		search: (query: string) => Promise<{
			results: Array<{ data: () => Promise<PagefindResult> }>;
		}>;
		options?: (options: { excerptLength: number }) => Promise<void>;
	};

	type PagefindWindow = Window & {
		__fractalPagefind?: PagefindModule;
	};

	let searchRoot: HTMLElement | undefined;
	let searchInput: HTMLInputElement | undefined;
	let query = $state('');
	let results = $state<PagefindResult[]>([]);
	let pagefind = $state<PagefindModule | null>(null);
	let isLoading = $state(true);
	let isSearching = $state(false);
	let hasError = $state(false);
	let isOpen = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	const loadPagefind = () =>
		new Promise<PagefindModule>((resolve, reject) => {
			const pagefindWindow = window as PagefindWindow;
			if (pagefindWindow.__fractalPagefind) {
				resolve(pagefindWindow.__fractalPagefind);
				return;
			}

			const handleReady = () => {
				const loaded = pagefindWindow.__fractalPagefind;
				if (loaded) resolve(loaded);
				else reject(new Error('Pagefind bridge loaded without an API'));
			};
			const script = document.createElement('script');
			script.type = 'module';
			script.src = '/pagefind-loader.js';
			script.addEventListener('error', () => {
				window.removeEventListener('fractal-pagefind-ready', handleReady);
				reject(new Error('Unable to load the Pagefind bridge'));
			});
			window.addEventListener('fractal-pagefind-ready', handleReady, { once: true });
			document.head.append(script);
		});

	onMount(async () => {
		try {
			pagefind = await loadPagefind();
			await pagefind.options?.({ excerptLength: 24 });
		} catch {
			hasError = true;
		} finally {
			isLoading = false;
			if (query.trim().length >= 2) void runSearch(query);
		}
	});

	const resolve = svelteResolve as unknown as (path: string) => string;

	const runSearch = async (value: string) => {
		const normalized = value.trim();
		if (!pagefind || normalized.length < 2) {
			results = [];
			isSearching = false;
			return;
		}

		isSearching = true;
		try {
			const response = await pagefind.search(normalized);
			results = await Promise.all(response.results.slice(0, 8).map((result) => result.data()));
		} catch {
			hasError = true;
			results = [];
		} finally {
			isSearching = false;
		}
	};

	const handleInput = (event: Event) => {
		query = (event.currentTarget as HTMLInputElement).value;
		isOpen = true;
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => void runSearch(query), 180);
	};

	const clearSearch = () => {
		query = '';
		results = [];
		isOpen = false;
		searchInput?.focus();
	};

	const handleWindowClick = (event: MouseEvent) => {
		if (searchRoot && event.target instanceof Node && !searchRoot.contains(event.target)) {
			isOpen = false;
		}
	};

	const closeOnEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			isOpen = false;
			searchInput?.blur();
		}
	};
</script>

<svelte:window onclick={handleWindowClick} onkeydown={closeOnEscape} />

<section class="docs-search" bind:this={searchRoot} aria-label="Search documentation">
	<label for="docs-search-input">Search the library</label>
	<div class="docs-search-control">
		<input
			bind:this={searchInput}
			id="docs-search-input"
			class="input"
			type="search"
			placeholder="Search docs"
			value={query}
			onfocus={() => (isOpen = true)}
			oninput={handleInput}
			aria-controls="docs-search-results"
		/>
		{#if query}
			<button
				class="is-icon docs-search-clear"
				type="button"
				aria-label="Clear search"
				onclick={clearSearch}
			>
				×
			</button>
		{/if}
	</div>
	{#if isOpen && query.trim()}
		<div class="docs-search-popover">
			<p id="docs-search-status" class="docs-search-status" aria-live="polite">
				{#if isLoading}
					Loading search…
				{:else if isSearching}
					Searching…
				{:else if hasError}
					Search is unavailable until the Pagefind index is generated.
				{:else if query.trim().length < 2}
					Type at least 2 characters to search.
				{:else}
					{results.length} result{results.length === 1 ? '' : 's'}
				{/if}
			</p>

			{#if results.length}
				<div id="docs-search-results" class="docs-search-results">
					{#each results as result (result.url)}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a
							class="docs-search-result"
							href={resolve(result.url)}
							onclick={() => (isOpen = false)}
						>
							<strong>{result.meta?.title || 'Untitled document'}</strong>
							{#if result.meta?.section}<span>{result.meta.section}</span>{/if}
							{#if result.excerpt}
								<!-- Pagefind generates this excerpt and its mark tags. -->
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								<p>{@html result.excerpt}</p>
							{/if}
						</a>
					{/each}
				</div>
			{:else if !isLoading && !isSearching && !hasError && query.trim().length >= 2}
				<p class="docs-search-empty">No documents matched that search.</p>
			{/if}
		</div>
	{/if}
</section>
