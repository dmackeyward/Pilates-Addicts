<script lang="ts">
	let { data } = $props();

	let searchQuery = $state('');
	let selectedDifficulty = $state('All');

	let filteredLessons = $derived(
		data.lessons.filter((lesson) => {
			const matchesSearch =
				lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesDifficulty =
				selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty;
			return matchesSearch && matchesDifficulty;
		})
	);
</script>

<div class="max-w-6xl mx-auto p-6 space-y-6">
	<header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Lesson Plans</h1>
			<p class="text-slate-500">Curated sequence flows and session templates</p>
		</div>
		<div class="flex flex-wrap gap-3">
			<input
				type="text"
				placeholder="Search plans..."
				bind:value={searchQuery}
				class="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
			/>
			<select
				bind:value={selectedDifficulty}
				class="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
			>
				<option value="All">All Difficulties</option>
				<option value="Beginner">Beginner</option>
				<option value="Intermediate">Intermediate</option>
				<option value="Advanced">Advanced</option>
			</select>
		</div>
	</header>

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredLessons as lesson (lesson.id)}
			<a
				href="/lessons/{lesson.slug}"
				class="block p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-emerald-500 transition-all hover:shadow-md"
			>
				<div class="flex justify-between items-start mb-3">
					<span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
						{lesson.difficulty}
					</span>
					<span class="text-xs font-medium text-slate-400">{lesson.durationMinutes} mins</span>
				</div>
				<h2 class="text-xl font-bold mb-2 text-slate-900">{lesson.title}</h2>
				<p class="text-slate-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>
				<div class="text-xs text-emerald-600 font-semibold">
					{lesson.lessonExercises.length} Exercises in Flow →
				</div>
			</a>
		{:else}
			<p class="text-slate-500 col-span-full text-center py-12">No lesson plans found.</p>
		{/each}
	</div>
</div>