<script>
  let { data } = $props();
  let { exercise } = $derived(data);
</script>

<svelte:head>
  <title>{exercise.name} | Pilates Addicts</title>
</svelte:head>

<div class="detail-container">
  <a href="/exercises" class="back-link">← Back to Library</a>

  <header class="exercise-header">
    <h1>{exercise.name}</h1>
    
    <div class="pills-row">
      {#each exercise.categories as cat}
        <span class="pill category">{cat.category.name}</span>
      {/each}

      {#each exercise.props as p}
        <span class="pill prop">📦 {p.prop.name}</span>
      {/each}
    </div>
  </header>

  {#if exercise.contraindications.length > 0}
    <div class="alert-box">
      <h3>⚠️ Clinical Contraindications</h3>
      <ul>
        {#each exercise.contraindications as alert}
          <li><strong>{alert.condition}:</strong> {alert.notes}</li>
        {/each}
      </ul>
    </div>
  {/if}

  <!-- APPARATUS SETUP GRID -->
  <section class="section">
    <h2>Apparatus Setup</h2>
    <div class="setup-grid">
      <div class="setup-card">
        <span class="label">Spring Tension</span>
        <span class="value">{exercise.springSettings || 'Default'}</span>
      </div>
      <div class="setup-card">
        <span class="label">Footbar Position</span>
        <span class="value">{exercise.footbarPosition || 'N/A'}</span>
      </div>
      <div class="setup-card">
        <span class="label">Gear Bar</span>
        <span class="value">{exercise.gearBar || 'Normal'}</span>
      </div>
      <div class="setup-card">
        <span class="label">Stopper</span>
        <span class="value">{exercise.stopperPosition || 'Normal'}</span>
      </div>
      <div class="setup-card">
        <span class="label">Headrest</span>
        <span class="value">{exercise.headrestPosition || 'Up'}</span>
      </div>
    </div>
  </section>

<!-- ANATOMY TARGETS -->
  {#if exercise.exerciseMuscles && exercise.exerciseMuscles.length > 0}
    <section class="section">
      <h2>Target Muscles</h2>
      <div class="muscle-group">
        {#each exercise.exerciseMuscles as m}
          <span class="muscle-chip {m.targetType.toLowerCase()}">
            {m.muscle.name} ({m.targetType})
          </span>
        {/each}
      </div>
    </section>
  {/if}

  <!-- INSTRUCTIONS -->
  <section class="section grid-2">
    {#if exercise.setupInstructions}
      <div>
        <h2>Setup Instructions</h2>
        <p class="body-text">{exercise.setupInstructions}</p>
      </div>
    {/if}

    {#if exercise.executionInstructions}
      <div>
        <h2>Execution Instructions</h2>
        <p class="body-text">{exercise.executionInstructions}</p>
      </div>
    {/if}
  </section>

  <!-- TEACHING CUES -->
  {#if exercise.cues.length > 0}
    <section class="section">
      <h2>Teaching Cues</h2>
      <div class="cues-grid">
        {#each exercise.cues as cue}
          <div class="cue-card">
            <span class="cue-category">{cue.category}</span>
            <p>"{cue.cueText}"</p>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- MODIFICATIONS -->
  {#if exercise.modifications.length > 0}
    <section class="section">
      <h2>Modifications & Progressions</h2>
      <div class="mod-list">
        {#each exercise.modifications as mod}
          <div class="mod-card {mod.modificationType.toLowerCase()}">
            <h4>{mod.title} ({mod.modificationType})</h4>
            <p>{mod.description}</p>
          </div>
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
  .exercise-header h1 {
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
  .pill.category { background: #e0e7ff; color: #3730a3; }
  .pill.prop { background: #fef3c7; color: #92400e; }

  .alert-box {
    background: #fff1f2;
    border-left: 4px solid #e11d48;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 2rem;
  }
  .alert-box h3 { margin: 0 0 0.5rem 0; color: #9f1239; font-size: 1rem; }
  .alert-box ul { margin: 0; padding-left: 1.25rem; color: #881337; }

  .section { margin-bottom: 2.5rem; }
  .section h2 { font-size: 1.3rem; border-bottom: 2px solid #eee; padding-bottom: 0.4rem; color: #222; }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }

  .setup-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }
  .setup-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
  }
  .setup-card .label { font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase; }
  .setup-card .value { font-size: 0.95rem; font-weight: 600; color: #0f172a; margin-top: 0.2rem; }

  .muscle-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .muscle-chip {
    padding: 0.3rem 0.75rem;
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  .muscle-chip.primary { background: #dcfce7; color: #166534; }
  .muscle-chip.secondary { background: #f1f5f9; color: #475569; }

  .body-text { line-height: 1.6; color: #334155; }

  .cues-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
  .cue-card {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 1rem;
    border-radius: 8px;
  }
  .cue-category { font-size: 0.7rem; font-weight: 700; color: #15803d; text-transform: uppercase; }
  .cue-card p { margin: 0.4rem 0 0 0; color: #166534; font-style: italic; font-size: 0.95rem; }

  .mod-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .mod-card { padding: 1rem; border-radius: 8px; border: 1px solid #eee; }
  .mod-card.regression { background: #eff6ff; border-color: #bfdbfe; }
  .mod-card.progression { background: #faf5ff; border-color: #e9d5ff; }
  .mod-card h4 { margin: 0 0 0.3rem 0; font-size: 0.95rem; }
  .mod-card p { margin: 0; color: #475569; font-size: 0.9rem; }
</style>