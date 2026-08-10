<!-- src/routes/lessons/+page.svelte -->
<script>
  // Lesson plans overview page
</script>

<svelte:head>
  <title>Lesson Plans | Pilates Addicts</title>
</svelte:head>

<div class="lessons-page">
  <h1>Lesson Plans & Class Flows</h1>
  <p class="subtitle">Structured teaching templates for private sessions and group reformer classes.</p>

  <div class="sections-grid">
    <div class="category-box">
      <h2>Private Sessions</h2>
      <ul>
        <li><a href="/lessons/foundations-private">Foundations Private</a></li>
        <li><a href="/lessons/intermediate-private">Intermediate Private</a></li>
        <li><a href="/lessons/advanced-private">Advanced Private</a></li>
      </ul>
    </div>

    <div class="category-box">
      <h2>Group Classes</h2>
      <ul>
        <li><a href="/lessons/beginner-group">Beginner Group</a></li>
        <li><a href="/lessons/full-body-group">Full-Body Group</a></li>
        <li><a href="/lessons/athletic-group">Athletic Group</a></li>
      </ul>
    </div>
  </div>
</div>

<style>
  .lessons-page {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  h1 {
    color: #222;
    margin-bottom: 0.25rem;
  }
  .subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
  .sections-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  .category-box {
    background: #fafafa;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 1.5rem;
  }
  .category-box h2 {
    font-size: 1.2rem;
    color: #333;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ddd;
    padding-bottom: 0.5rem;
  }
  .category-box ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .category-box li {
    margin-bottom: 0.75rem;
  }
  .category-box a {
    color: #0066cc;
    text-decoration: none;
    font-weight: 500;
  }
  .category-box a:hover {
    text-decoration: underline;
  }
</style>