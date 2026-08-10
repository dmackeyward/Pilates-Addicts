<script lang="ts">
    let { data } = $props();
</script>

<main class="p-8 max-w-3xl mx-auto">
    <a href="/exercises" class="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Library</a>

    <h1 class="text-3xl font-bold mb-2">{data.exercise.name}</h1>
    
    {#if data.exercise.name && data.exercise.springSettings}
        <div class="inline-block bg-blue-50 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-6">
            Spring Settings: {data.exercise.springSettings}
        </div>
    {/if}

    {#if data.exercise.description}
        <section class="mb-6">
            <h2 class="text-xl font-semibold mb-2">Overview</h2>
            <p class="text-gray-700">{data.exercise.description}</p>
        </section>
    {/if}

    <div class="grid md:grid-cols-2 gap-6 mb-6">
        {#if data.exercise.setupInstructions}
            <div class="border p-4 rounded-lg bg-gray-50">
                <h3 class="font-semibold text-gray-900 mb-2">Setup</h3>
                <p class="text-sm text-gray-700 whitespace-pre-line">{data.exercise.setupInstructions}</p>
            </div>
        {/if}

        {#if data.exercise.executionInstructions}
            <div class="border p-4 rounded-lg bg-gray-50">
                <h3 class="font-semibold text-gray-900 mb-2">Execution</h3>
                <p class="text-sm text-gray-700 whitespace-pre-line">{data.exercise.executionInstructions}</p>
            </div>
        {/if}
    </div>

    <div class="mb-6">
        <h3 class="font-semibold text-lg mb-2">Target Muscles</h3>
        <div class="flex flex-wrap gap-2">
            {#each data.exercise.exerciseMuscles as em}
                <span class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-md border">
                    {em.muscle.name} <span class="text-xs text-gray-500 capitalize">({em.targetType})</span>
                </span>
            {/each}
        </div>
    </div>

    {#if data.exercise.cues.length > 0}
        <div>
            <h3 class="font-semibold text-lg mb-2">Teaching Cues</h3>
            <ul class="space-y-2">
                {#each data.exercise.cues as cue}
                    <li class="border-l-4 border-blue-500 pl-3 py-1 text-gray-700">
                        <strong class="text-xs uppercase tracking-wide text-blue-600 block">{cue.category}</strong>
                        {cue.cueText}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</main>