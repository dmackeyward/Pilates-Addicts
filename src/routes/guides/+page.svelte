<script lang="ts">
	let { data } = $props();

	let searchQuery = $state('');
	let selectedCategory = $state('All');

	let categories = $derived([
		'All',
		...new Set(data.guides.map((g) => g.category))
	]);

	let filteredGuides = $derived(
		data.guides.filter((guide) => {
			const matchesSearch =
				guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				guide.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || guide.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	);
</script>

<div class="max-w-6xl mx-auto p-6 space-y-6">
	<header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Teaching & Clinical Guides</h1>
			<p class="text-slate-500">Pathology protocols, equipment guides, and teaching techniques</p>
		</div>
		<div class="flex flex-wrap gap-3">
			<input
				type="text"
				placeholder="Search guides..."
				bind:value={searchQuery}
				class="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
			<select
				bind:value={selectedCategory}
				class="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
			>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
	</header>

	<div class="grid md:grid-cols-2 gap-6">
		{#each filteredGuides as guide (guide.id)}
			<a
				href="/guides/{guide.slug}"
				class="block p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 transition-all"
			>
				<span class="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
					{guide.category}
				</span>
				<h2 class="text-xl font-bold text-slate-900 mb-2">{guide.title}</h2>
				<p class="text-slate-600 text-sm mb-4">{guide.description}</p>
				{#if guide.guideExercises.length > 0}
					<div class="text-xs text-slate-400">
						Linked Exercises: {guide.guideExercises.length}
					</div>
				{/if}
			</a>
		{:else}
			<p class="text-slate-500 col-span-full text-center py-12">No guides found.</p>
		{/each}
	</div>
</div>