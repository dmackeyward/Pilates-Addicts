<script lang="ts">
  let { data } = $props();
  let guide = $derived(data.guide);
</script>

<svelte:head>
  <title>{guide.title} | Pilates Addicts</title>
</svelte:head>

<div class="detail-container">
  <a href="/guides" class="back-link">← Back to Guides</a>

  <header class="guide-header">
    <h1>{guide.title}</h1>
    
    <div class="pills-row">
      <span class="pill category">{guide.category}</span>
      {#if guide.guideExercises}
        <span class="pill count">📋 {guide.guideExercises.length} Related Exercises</span>
      {/if}
    </div>
  </header>

  <!-- OVERVIEW / DESCRIPTION -->
  {#if guide.description}
    <section class="section">
      <p class="guide-description">{guide.description}</p>
    </section>
  {/if}

  <!-- MAIN GUIDE CONTENT -->
  <section class="section">
    <div class="content-box body-text">
      {guide.content}
    </div>
  </section>

  <!-- RELEVANT EXERCISES GRID -->
  {#if guide.guideExercises && guide.guideExercises.length > 0}
    <section class="section">
      <h2>Relevant Exercises</h2>
      <div class="exercises-grid">
        {#each guide.guideExercises as ge (ge.exerciseId)}
          <a href="/exercises/{ge.exercise.slug}" class="exercise-card">
            <div class="exercise-card-content">
              <span class="exercise-title">{ge.exercise.title || ge.exercise.name}</span>
              <span class="view-link">View Exercise →</span>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .detail-container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .back-link {
    display: inline-block;
    margin-bottom: 1rem;
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
  }
  .guide-header h1 {
    margin: 0 0 0.75rem 0;
    font-size: 2.2rem;
    color: #111;
  }
  .pills-row {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  .pill {
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem;
    border-radius: 20px;
    font-weight: 600;
  }
  .pill.category { background: #d1fae5; color: #065f46; }
  .pill.count { background: #f1f5f9; color: #475569; }

  .section { margin-bottom: 2.5rem; }
  .section h2 { font-size: 1.3rem; border-bottom: 2px solid #eee; padding-bottom: 0.4rem; color: #222; }
  
  .guide-description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #475569;
    margin: 0;
  }

  .content-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    white-space: pre-line;
  }
  .body-text { line-height: 1.6; color: #334155; }

  .exercises-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  .exercise-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .exercise-card:hover {
    border-color: #10b981;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  .exercise-card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .exercise-title {
    font-weight: 600;
    color: #0f172a;
  }
  .view-link {
    font-size: 0.85rem;
    color: #059669;
    font-weight: 500;
  }
</style>