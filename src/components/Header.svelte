<!-- src/components/Header.svelte -->
<script>
  import { navigate } from 'svelte-routing';
</script>

<header>
  <nav>
    <ul>
      <li><a href="/" on:click={event => navigate('/')}>Home</a></li>
      <li><a href="/search" on:click={event => navigate('/search')}>Search</a></li>
    </ul>
  </nav>
  <input type="text" placeholder="Search..." />
</header>

<style>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  
  nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }
</style>