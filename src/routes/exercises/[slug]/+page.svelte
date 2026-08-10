<!-- src/routes/exercises/[slug]/+page.svelte -->
<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.exercise.name} | Pilates Addicts</title>
</svelte:head>

<article class="exercise-detail">
  <a href="/exercises" class="back-link">← Back to Library</a>
  
  <header>
    <h1>{data.exercise.name}</h1>
    <!-- If your query also joins categories or displays body region -->
    <span class="badge">{data.exercise.spring_settings || 'Reformer'}</span>
  </header>

  <section class="description">
    <h2>Purpose</h2>
    <p>{data.exercise.description}</p>
  </section>

  {#if data.exercise.setup_instructions}
    <section class="instructions">
      <h2>Setup Instructions</h2>
      <p>{data.exercise.setup_instructions}</p>
    </section>
  {/if}

  {#if data.exercise.execution_instructions}
    <section class="instructions">
      <h2>Execution</h2>
      <p>{data.exercise.execution_instructions}</p>
    </section>
  {/if}
</article>

<style>
  .exercise-detail {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #666;
    text-decoration: none;
  }
  h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .badge {
    background: #eee;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
  }
  .description, .instructions { margin-top: 2rem; }
</style>