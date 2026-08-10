<!-- src/routes/exercises/+page.svelte -->
<script>
  let { data } = $props();
  
  let searchTerm = $state('');

  // Svelte 5 derived state to filter exercises dynamically as you type
  let filteredExercises = $derived(
    data.exercises.filter(ex => 
      ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ex.description && ex.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );
</script>

<svelte:head>
  <title>Exercise Library | Pilates Addicts</title>
</svelte:head>

<div class="exercise-page">
  <div class="header-section">
    <h1>Exercise Library</h1>
    <input 
      type="text" 
      placeholder="Filter exercises by name..." 
      bind:value={searchTerm}
      class="filter-input"
    />
  </div>

  {#if filteredExercises.length === 0}
    <p class="empty">No exercises found matching your filter.</p>
  {:else}
    <div class="exercise-grid">
      {#each filteredExercises as exercise (exercise.id)}
        <a href={`/exercises/${exercise.slug}`} class="exercise-card">
          <h3>{exercise.title}</h3>
          {#if exercise.description}
            <p>{exercise.description}</p>
          {/if}
          <span class="category-tag">{exercise.category || 'Reformer'}</span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .exercise-page {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  h1 {
    color: #222;
    margin: 0;
  }
  .filter-input {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 250px;
  }
  .exercise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .exercise-card {
    background: #fff;
    border: 1px solid #e1e1e1;
    padding: 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .exercise-card:hover {
    border-color: #999;
    box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  }
  .exercise-card h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }
  .exercise-card p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
    .category-tag {
        align-self: flex-start;
        font-size: 0.75rem;
        background: #eee;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        color: #555; /* Fixed from #55I */
        text-transform: uppercase;
        font-weight: 600;
    }
  .empty {
    color: #666;
    font-style: italic;
  }
</style>