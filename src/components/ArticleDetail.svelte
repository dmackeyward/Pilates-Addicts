
<!-- src/ArticleDetail.svelte -->
<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import ArticleDetail from './components/ArticleDetail.svelte';
  import { article, fetchArticle } from '../stores';
</script>

<Header />
<main>
  <h1>Article Detail</h1>
  <ArticleDetail article={$article} />
</main>
<Footer />