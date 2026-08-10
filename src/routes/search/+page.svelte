<!-- src/routes/search/+page.svelte -->
<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>Search Repertoire | Pilates Addicts</title>
</svelte:head>

<div class="search-page">
  <h1>Search Repertoire & Guides</h1>
  
  <form method="GET" action="/search" class="search-form">
    <input 
      type="text" 
      name="q" 
      value={data.query} 
      placeholder="Type to search exercises, cues, or principles..." 
      class="search-input"
    />
    <button type="submit" class="search-button">Search</button>
  </form>

  <div class="results-container">
    {#if data.query.trim() === ''}
      <p class="hint">Type a keyword above to search your database...</p>
    {:else if data.searchResults.length === 0}
      <p class="no-results">No results found for "<strong>{data.query}</strong>"</p>
    {:else}
      <p class="results-count">Found {data.searchResults.length} result(s) for "{data.query}":</p>
      <div class="results-grid">
        {#each data.searchResults as exercise (exercise.id)}
          <a href={`/exercises/${exercise.slug}`} class="result-card">
            <h3>{exercise.name || exercise.title}</h3>
            {#if exercise.description}
              <p>{exercise.description}</p>
            {/if}
            <span class="category-tag">{exercise.category || 'Reformer'}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .search-page {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  h1 {
    color: #222;
    margin-bottom: 1.5rem;
  }
  .search-form {
    display: flex;
    gap: 0.5rem;
  }
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
  }
  .search-input:focus {
    border-color: #666;
  }
  .search-button {
    padding: 0.75rem 1.5rem;
    background: #333;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }
  .search-button:hover {
    background: #444;
  }
  .results-container {
    margin-top: 2rem;
  }
  .hint, .no-results {
    color: #666;
    font-style: italic;
  }
  .results-count {
    font-weight: 500;
    margin-bottom: 1rem;
    color: #444;
  }
  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .result-card {
    background: #fff;
    border: 1px solid #e1e1e1;
    padding: 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .result-card:hover {
    border-color: #999;
    box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  }
  .result-card h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }
  .result-card p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
  }
  .category-tag {
    font-size: 0.75rem;
    background: #eee;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: #555;
    text-transform: uppercase;
    font-weight: 600;
  }
</style>