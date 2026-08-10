<!-- src/Search.svelte -->
<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import CardList from './components/CardList.svelte';
  import { searchResults, searchArticles } from '../stores';

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