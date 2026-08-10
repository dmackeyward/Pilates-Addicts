<script lang="ts">
    let { data } = $props();
</script>

<main class="p-8 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Exercise Library</h1>

    {#if data.exercises.length === 0}
        <p class="text-gray-500">No exercises found in the database yet.</p>
    {:else}
        <div class="grid gap-6 md:grid-cols-2">
            {#each data.exercises as exercise}
                <a 
                    href="/exercises/{exercise.slug}" 
                    class="block border rounded-lg p-5 shadow-sm bg-white hover:border-blue-500 transition"
                >
                    <h2 class="text-xl font-semibold text-blue-600 mb-1">{exercise.name}</h2>
                    
                    {#if exercise.springSettings}
                        <p class="text-xs text-gray-500 mb-3">
                            Springs: <span class="font-medium text-gray-700">{exercise.springSettings}</span>
                        </p>
                    {/if}
                    
                    {#if exercise.description}
                        <p class="text-gray-700 text-sm line-clamp-2 mb-4">{exercise.description}</p>
                    {/if}

                    <div class="text-xs text-gray-500">
                        <span>{exercise.exerciseMuscles.length} targeted muscles</span> • 
                        <span>{exercise.cues.length} cues</span>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</main>