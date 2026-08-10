<!-- src/lib/components/Navbar.svelte -->
<script>
  // Svelte 5 / SvelteKit ready navigation
</script>

<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/exercises">Exercises</a></li>
      <li><a href="/lessons">Lessons</a></li>
      <li><a href="/guides">Guides</a></li>
      <li><a href="/search">Search</a></li>
    </ul>
  </nav>
</header>

<style>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
  }

  nav a:hover {
    text-decoration: underline;
  }
</style>