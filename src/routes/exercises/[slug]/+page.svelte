<!-- src/routes/exercises/[slug]/+page.svelte -->
<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.exercise.title} | Pilates Addicts</title>
</svelte:head>

<article class="exercise-detail">
  <a href="/exercises" class="back-link">← Back to Library</a>
  
  <header>
    <h1>{data.exercise.title}</h1>
    <span class="badge">{data.exercise.category}</span>
  </header>

  <section class="description">
    <h2>Purpose</h2>
    <p>{data.exercise.description}</p>
  </section>
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
  .description { margin-top: 2rem; }
</style>