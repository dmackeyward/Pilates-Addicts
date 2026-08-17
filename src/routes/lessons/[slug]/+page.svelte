<script lang="ts">
  let { data } = $props();
  let lesson = $derived(data.lesson);
</script>

<svelte:head>
  <title>{lesson.title} | Pilates Addicts</title>
</svelte:head>

<div class="detail-container">
  <a href="/lessons" class="back-link">← Back to Lessons</a>

  <header class="lesson-header">
    <h1>{lesson.title}</h1>
    
    <div class="pills-row">
      <span class="pill difficulty">{lesson.difficulty}</span>
      <span class="pill duration">⏱️ {lesson.durationMinutes} mins</span>
      <span class="pill count">📋 {lesson.lessonExercises.length} Exercises</span>
    </div>
  </header>

  <!-- LESSON OVERVIEW -->
  {#if lesson.description}
    <section class="section">
      <h2>Plan Overview</h2>
      <p class="body-text">{lesson.description}</p>
    </section>
  {/if}

  <!-- SEQUENCE FLOW -->
  <section class="section">
    <h2>Sequence Flow</h2>
    <div class="sequence-list">
      {#each lesson.lessonExercises as le, idx (le.exerciseId)}
        <div class="sequence-card">
          <div class="card-top">
            <div class="step-badge">{idx + 1}</div>
            <div class="exercise-info">
              <a href="/exercises/{le.exercise.slug}" class="exercise-title">
                {le.exercise.name}
              </a>
              <div class="execution-params">
                {#if le.repetitions}
                  <span class="param"><strong>Reps:</strong> {le.repetitions}</span>
                {/if}
                {#if le.tempo}
                  <span class="param"><strong>Tempo:</strong> {le.tempo}</span>
                {/if}
              </div>
            </div>
          </div>

          <!-- APPARATUS SETTINGS BADGES -->
          {#if le.exercise.apparatusSettings && le.exercise.apparatusSettings.length > 0}
            {@const settings = le.exercise.apparatusSettings[0]}
            <div class="setup-badges">
              {#if settings.springSettings}
                <span class="setup-badge spring">⚙️ Springs: {settings.springSettings}</span>
              {/if}
              {#if settings.footbarPosition}
                <span class="setup-badge">Footbar: {settings.footbarPosition}</span>
              {/if}
              {#if settings.gearBar}
                <span class="setup-badge">Gear: {settings.gearBar}</span>
              {/if}
              {#if settings.headrestPosition}
                <span class="setup-badge">Headrest: {settings.headrestPosition}</span>
              {/if}
            </div>
          {/if}

          <!-- CLINICAL CONTRAINDICATIONS -->
          {#if le.exercise.contraindications && le.exercise.contraindications.length > 0}
            <div class="inline-alert">
              <strong>⚠️ Caution:</strong> 
              {le.exercise.contraindications.map(c => `${c.condition} (${c.notes || 'Modify'})`).join('; ')}
            </div>
          {/if}

          <!-- CUES PREVIEW -->
          {#if le.exercise.cues && le.exercise.cues.length > 0}
            <div class="cues-preview">
              <span class="cue-label">Focus Cue:</span>
              <p>"{le.exercise.cues[0].cueText}"</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </section>
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
  .lesson-header h1 {
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
  .pill.difficulty { background: #e0e7ff; color: #3730a3; }
  .pill.duration { background: #fef3c7; color: #92400e; }
  .pill.count { background: #f1f5f9; color: #475569; }

  .section { margin-bottom: 2.5rem; }
  .section h2 { font-size: 1.3rem; border-bottom: 2px solid #eee; padding-bottom: 0.4rem; color: #222; }
  .body-text { line-height: 1.6; color: #334155; margin: 0.5rem 0 0 0; }

  .sequence-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
  .sequence-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 1.25rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-top { display: flex; align-items: flex-start; gap: 0.75rem; }
  .step-badge {
    background: #10b981;
    color: #ffffff;
    font-weight: 700;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .exercise-info { display: flex; flex-direction: column; gap: 0.2rem; }
  .exercise-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
  }
  .exercise-title:hover { color: #059669; }

  .execution-params { display: flex; gap: 1rem; font-size: 0.85rem; color: #475569; }

  .setup-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .setup-badge {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    color: #334155;
  }
  .setup-badge.spring { background: #fffbeb; border-color: #fde68a; color: #92400e; }

  .inline-alert {
    background: #fff1f2;
    border-left: 3px solid #e11d48;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #881337;
  }

  .cues-preview {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
  }
  .cue-label { font-weight: 700; color: #15803d; text-transform: uppercase; font-size: 0.7rem; }
  .cues-preview p { margin: 0.2rem 0 0 0; color: #166534; font-style: italic; }
</style>