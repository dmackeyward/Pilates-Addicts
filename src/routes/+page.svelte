<!-- src/routes/+page.svelte -->
<script>
  // Svelte 5 home page dashboard
</script>

<svelte:head>
  <title>Dashboard | Pilates Addicts</title>
</svelte:head>

<div class="home-container">
  <section class="hero">
    <h1>Pilates Addicts Teaching Hub</h1>
    <p>Your comprehensive repository for reformer repertoire, biomechanics, class planning, and teaching cues.</p>
  </section>

  <div class="dashboard-grid">
    <a href="/exercises" class="card">
      <h2>Exercise Library</h2>
      <p>Explore reformer series, setups, targeted muscles, and detailed teaching cues.</p>
    </a>

    <a href="/lessons" class="card">
      <h2>Lesson Plans</h2>
      <p>Structured class flows, private session structures, and group templates.</p>
    </a>

    <a href="/guides" class="card">
      <h2>Guides & Anatomy</h2>
      <p>Neutral spine, core canister mechanics, breathing patterns, and teaching philosophy.</p>
    </a>

    <a href="/search" class="card">
      <h2>Quick Search</h2>
      <p>Instantly find movements, cues, and principles across your database.</p>
    </a>
  </div>
</div>

<style>
  .home-container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }
  .hero h1 {
    font-size: 2.5rem;
    color: #222;
    margin-bottom: 0.5rem;
  }
  .hero p {
    color: #666;
    font-size: 1.1rem;
  }
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }
  .card {
    background: #fdfdfd;
    border: 1px solid #e1e1e1;
    padding: 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border-color: #ccc;
  }
  .card h2 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  .card p {
    color: #666;
    font-size: 0.95rem;
    margin: 0;
  }
</style>