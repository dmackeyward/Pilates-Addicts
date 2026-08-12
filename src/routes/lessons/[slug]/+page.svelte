<script lang="ts">
	let { data } = $props();
	let lesson = $derived(data.lesson);
</script>

<div class="max-w-4xl mx-auto p-6 space-y-8">
	<div>
		<a href="/lessons" class="text-sm font-medium text-emerald-600 hover:underline">← Back to Lessons</a>
		<div class="flex items-center gap-3 mt-4">
			<h1 class="text-3xl font-bold">{lesson.title}</h1>
			<span class="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
				{lesson.difficulty}
			</span>
		</div>
		<p class="text-slate-600 mt-2">{lesson.description}</p>
		<p class="text-xs font-medium text-slate-400 mt-1">Duration: {lesson.durationMinutes} minutes</p>
	</div>

	<div class="space-y-4">
		<h2 class="text-xl font-bold text-slate-900">Sequence Flow</h2>
		<div class="space-y-3">
			{#each lesson.lessonExercises as le, idx (le.exerciseId)}
				<div class="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
					<div class="flex items-center justify-center w-8 h-8 font-bold rounded-full bg-emerald-100 text-emerald-800 text-sm">
						{idx + 1}
					</div>
					<div class="flex-1">
						<a href="/exercises/{le.exercise.slug}" class="font-semibold text-slate-900 hover:text-emerald-600">
							{le.exercise.title}
						</a>
						{#if le.exercise.springSettings}
							<p class="text-xs text-slate-500 mt-0.5">Springs: {le.exercise.springSettings}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>