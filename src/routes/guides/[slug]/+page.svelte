<script lang="ts">
	let { data } = $props();
	let guide = $derived(data.guide);
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
	<div>
		<a href="/guides" class="text-sm font-medium text-emerald-600 hover:underline">← Back to Guides</a>
		<div class="mt-4">
			<span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
				{guide.category}
			</span>
			<h1 class="text-3xl font-bold text-slate-900 mt-2">{guide.title}</h1>
			<p class="text-slate-600 mt-2 leading-relaxed">{guide.description}</p>
		</div>
	</div>

	<div class="p-6 bg-white border border-slate-200 rounded-xl shadow-sm prose max-w-none">
		<div class="whitespace-pre-line text-slate-800">
			{guide.content}
		</div>
	</div>

	{#if guide.guideExercises.length > 0}
		<div class="space-y-4">
			<h2 class="text-xl font-bold text-slate-900">Relevant Exercises</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				{#each guide.guideExercises as ge (ge.exerciseId)}
					<a
						href="/exercises/{ge.exercise.slug}"
						class="p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-emerald-500 transition-all block"
					>
						<p class="font-semibold text-slate-900">{ge.exercise.title}</p>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>