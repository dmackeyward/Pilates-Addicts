<!-- src/Search.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CardList from '$lib/components/CardList.svelte';
  import { searchResults, searchArticles } from '$lib/stores';

  // Declare the query variable so you can bind to it
  let query = '';

  function handleSearch() {
    searchArticles(query);
  }
</script>

<Header />
  <main>
    <h1>Search</h1>
  <input type="text" bind:value={query} on:input={handleSearch} />
  <CardList articles={$searchResults} />
</main>
<Footer />