<script lang="ts">
  let { data } = $props();

  let searchQuery = $state('');
  let selectedCategory = $state('All');

  let categories = $derived([
    'All',
    ...new Set(data.guides.map((g) => g.category))
  ]);

  let filteredGuides = $derived(
    data.guides.filter((guide) => {
      const matchesSearch =
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  );
</script>

<svelte:head>
  <title>Teaching & Clinical Guides | Pilates Addicts</title>
</svelte:head>

<div class="guides-page">
  <div class="header-section">
    <div class="title-group">
      <h1>Teaching & Clinical Guides</h1>
      <p class="subtitle">Pathology protocols, equipment guides, and teaching techniques</p>
    </div>
    <div class="filter-group">
      <input
        type="text"
        placeholder="Search guides..."
        bind:value={searchQuery}
        class="filter-input"
      />
      <select bind:value={selectedCategory} class="filter-select">
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if filteredGuides.length === 0}
    <p class="empty">No guides found matching your filters.</p>
  {:else}
    <div class="guides-grid">
      {#each filteredGuides as guide (guide.id)}
        <a href={`/guides/${guide.slug}`} class="guide-card">
          <div>
            <span class="category-tag">{guide.category}</span>
            <h3>{guide.title}</h3>
            {#if guide.description}
              <p>{guide.description}</p>
            {/if}
          </div>
          {#if guide.guideExercises && guide.guideExercises.length > 0}
            <span class="meta-info">Linked Exercises: {guide.guideExercises.length}</span>
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .guides-page {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .title-group h1 {
    color: #222;
    margin: 0 0 0.25rem 0;
  }
  .subtitle {
    margin: 0;
    color: #666;
    font-size: 0.95rem;
  }
  .filter-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .filter-input,
  .filter-select {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    color: #333;
  }
  .filter-input {
    width: 220px;
  }
  .guides-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .guide-card {
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
  .guide-card:hover {
    border-color: #999;
    box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  }
  .guide-card h3 {
    margin: 0.5rem 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }
  .guide-card p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
  .category-tag {
    display: inline-block;
    font-size: 0.75rem;
    background: #eee;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: #555;
    text-transform: uppercase;
    font-weight: 600;
  }
  .meta-info {
    font-size: 0.8rem;
    color: #888;
    margin-top: 0.5rem;
  }
  .empty {
    color: #666;
    font-style: italic;
  }
</style>