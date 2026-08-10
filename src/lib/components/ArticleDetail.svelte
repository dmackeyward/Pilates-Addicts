
<!-- src/ArticleDetail.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ArticleDetail from '$lib/components/ArticleDetail.svelte';
  import { article, fetchArticle } from '$lib/stores.js';
</script>

<Header />
<main>
  <h1>Article Detail</h1>
  <ArticleDetail article={$article} />
</main>
<Footer />