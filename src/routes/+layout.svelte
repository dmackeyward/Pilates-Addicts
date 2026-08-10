<!-- src/routes/+layout.svelte -->
<script>
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<main>
  <slot /> <!-- Or children() if using pure Svelte 5 snippet syntax -->
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
</style>