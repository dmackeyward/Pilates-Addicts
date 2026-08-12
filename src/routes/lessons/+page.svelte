<script lang="ts">
  let { data } = $props();

  let searchQuery = $state('');
  let selectedDifficulty = $state('All');

  let filteredLessons = $derived(
    data.lessons.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    })
  );
</script>

<svelte:head>
  <title>Lesson Plans | Pilates Addicts</title>
</svelte:head>

<div class="lessons-page">
  <div class="header-section">
    <div class="title-group">
      <h1>Lesson Plans</h1>
      <p class="subtitle">Curated sequence flows and session templates</p>
    </div>
    <div class="filter-group">
      <input
        type="text"
        placeholder="Search plans..."
        bind:value={searchQuery}
        class="filter-input"
      />
      <select bind:value={selectedDifficulty} class="filter-select">
        <option value="All">All Difficulties</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  </div>

  {#if filteredLessons.length === 0}
    <p class="empty">No lesson plans found matching your filters.</p>
  {:else}
    <div class="lessons-grid">
      {#each filteredLessons as lesson (lesson.id)}
        <a href={`/lessons/${lesson.slug}`} class="lesson-card">
          <div>
            <div class="card-header">
              <span class="category-tag">{lesson.difficulty}</span>
              <span class="duration">{lesson.durationMinutes} mins</span>
            </div>
            <h3>{lesson.title}</h3>
            {#if lesson.description}
              <p>{lesson.description}</p>
            {/if}
          </div>
          <span class="meta-info">{lesson.lessonExercises.length} Exercises in Flow →</span>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .lessons-page {
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
  .lessons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .lesson-card {
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
  .lesson-card:hover {
    border-color: #999;
    box-shadow: 0 3px 8px rgba(0,0,0,0.04);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .lesson-card h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.1rem;
  }
  .lesson-card p {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
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
  .duration {
    font-size: 0.8rem;
    color: #888;
  }
  .meta-info {
    font-size: 0.85rem;
    color: #444;
    font-weight: 600;
    margin-top: 0.5rem;
  }
  .empty {
    color: #666;
    font-style: italic;
  }
</style>