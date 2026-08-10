Apply
<!-- src/Home.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CardList from '$lib/components/CardList.svelte';
  import { articles, fetchArticles } from '../stores';
</script>

<Header />
<main>
  <h1>Home</h1>
  <CardList articles={$articles} />
</main>
<Footer />
