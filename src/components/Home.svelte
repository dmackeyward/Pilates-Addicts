Apply
<!-- src/Home.svelte -->
<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import CardList from './components/CardList.svelte';
  import { articles, fetchArticles } from '../stores';
</script>

<Header />
<main>
  <h1>Home</h1>
  <CardList articles={$articles} />
</main>
<Footer />
