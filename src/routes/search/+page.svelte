<!-- src/routes/search/+page.svelte -->
<script>
  let searchQuery = $state('');
</script>

<svelte:head>
  <title>Search | Pilates Addicts</title>
</svelte:head>

<div class="search-page">
  <h1>Search Repertoire & Guides</h1>
  
  <div class="search-bar-container">
    <input 
      type="text" 
      bind:value={searchQuery} 
      placeholder="Type to search exercises, cues, or principles..." 
      class="search-input"
    />
  </div>

  <div class="results-container">
    {#if searchQuery.trim() === ''}
      <p class="hint">Start typing above to search your database...</p>
    {:else}
      <p>Searching for: <strong>{searchQuery}</strong></p>
      <!-- Results will go here once connected to SQLite search -->
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
    color: #333;
    margin-bottom: 1.5rem;
  }
  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    box-sizing: border-box;
  }
  .search-input:focus {
    border-color: #666;
  }
  .results-container {
    margin-top: 2rem;
  }
  .hint {
    color: #666;
    font-style: italic;
  }
</style>